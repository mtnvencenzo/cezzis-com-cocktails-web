resource "random_uuid" "custom_scope_id" {}

resource "azuread_application" "cocktails_entra_web_app_registration" {
  display_name                   = "appr-${var.sub}-${var.region}-${var.environment}-${var.domain}web-${var.sequence}"
  sign_in_audience               = "AzureADandPersonalMicrosoftAccount"
  fallback_public_client_enabled = true
  identifier_uris                = ["https://${var.tenant_domain_name}/${var.domain}web"]

  api {
    requested_access_token_version = 2
    oauth2_permission_scope {
      admin_consent_description  = "Allows the app to access to cocktails data on behalf of a user."
      admin_consent_display_name = "Access Cezzis.Com"
      enabled                    = true
      id                         = random_uuid.custom_scope_id.result
      type                       = "Admin"
      value                      = "site"
    }
  }

  single_page_application {
    redirect_uris = toset(var.webapp_redirect_uris)
  }

  web {
    logout_url = var.webapp_logout_url

    implicit_grant {
      id_token_issuance_enabled     = true
      access_token_issuance_enabled = true
    }
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes = [
      # This parameter is managed by `azuread_application_identifier_uri`.
      # Details: https://github.com/hashicorp/terraform-provider-azuread/issues/428#issuecomment-1788737766
      identifier_uris,
    ]
  }

  required_resource_access {
    resource_app_id = data.azuread_application_published_app_ids.well_known.result.MicrosoftGraph

    resource_access {
      id   = azuread_service_principal.msgraph.app_role_ids["Application.ReadWrite.All"]
      type = "Role"
    }

    # Terraform datasource of well_known IDs doesn't contain openid and offline_access
    resource_access {
      id   = "37f7f235-527c-4136-accd-4a02d197296e" # openid
      type = "Scope"
    }

    resource_access {
      id   = "7427e0e9-2fba-42fe-b0c0-848c9e6a8182" # offline_access
      type = "Scope"
    }
  }

  // access to scopes available from the cocktails api app registration
  required_resource_access {
    resource_app_id = var.cocktails_api_client_id

    resource_access {
      id   = var.cocktails_api_scope_account_read # read own account
      type = "Scope"
    }

    resource_access {
      id   = var.cocktails_api_scope_account_write # write own account
      type = "Scope"
    }
  }
}

resource "azuread_service_principal" "cocktails_entra_web_app_registration_serviceprincipal" {
  client_id                    = azuread_application.cocktails_entra_web_app_registration.client_id
  app_role_assignment_required = false
  description                  = "Service principal for the ${azuread_application.cocktails_entra_web_app_registration.display_name}"
}

resource "azuread_app_role_assignment" "cocktails_entra_web_app_registration_serviceprincipal_app_rw_all_role_assignment" {
  app_role_id         = azuread_service_principal.msgraph.app_role_ids["Application.ReadWrite.All"]
  principal_object_id = azuread_service_principal.cocktails_entra_web_app_registration_serviceprincipal.object_id
  resource_object_id  = azuread_service_principal.msgraph.object_id
}