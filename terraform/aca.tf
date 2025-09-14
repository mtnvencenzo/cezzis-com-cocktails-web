module "aca_cocktails_web" {
  source = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/container-app"
  providers = {
    azurerm = azurerm
  }

  sub                          = var.sub
  region                       = var.region
  environment                  = var.environment
  domain                       = var.domain
  name_discriminator           = "web"
  sequence                     = var.sequence
  tenant_id                    = data.azurerm_client_config.current.tenant_id
  resource_group_name          = data.azurerm_resource_group.cocktails_resource_group.name
  resource_group_location      = data.azurerm_resource_group.cocktails_resource_group.location
  container_app_environment_id = data.azurerm_container_app_environment.cae_shared.id
  ingress_target_port          = "80"
  startup_probe_relative_url   = "/started.txt"

  tags = local.tags

  container_registry = {
    id           = data.azurerm_container_registry.shared_acr.id
    login_server = data.azurerm_container_registry.shared_acr.login_server
  }

  key_vault = {
    id   = data.azurerm_key_vault.cocktails_keyvault.id
    name = data.azurerm_key_vault.cocktails_keyvault.name
  }

  container = {
    name       = "cocktails-web"
    image_name = "cocktailsweb"
    image_tag  = var.image_tag
    cpu        = 0.25
    memory     = "0.5Gi"
  }

  secrets = [
    {
      name                  = "cocktails-apim-subscription-key"
      key_vault_secret_name = "cocktails-api-cezzis-com-subscription-primary-key"
    },
    {
      name                  = "recaptcha-site-key"
      key_vault_secret_name = azurerm_key_vault_secret.cocktails_web_recaptcha_cezzi_site_key.name
    }
  ]

  env_vars = [
    {
      name  = "VITE_NODE_ENV"
      value = var.vite_node_environment
    },
    {
      name  = "VITE_PORT"
      value = "3000"
    },
    {
      name  = "VITE_REDIRECT_URI"
      value = var.b2c_login_redirect_uri
    },
    {
      name  = "VITE_TELEMETRY_KEY"
      value = data.azurerm_key_vault_secret.otel_collector_web_key.value
    },
    {
      name  = "VITE_TELEMETRY_URL"
      value = ""
    },
    {
      name  = "VITE_B2C_TENANT"
      value = var.b2c_tenant_name
    },
    {
      name  = "VITE_B2C_CLIENT_ID"
      value = module.webapp_b2c_tenant.cocktails_web_app_registration_client_id
    },
    {
      name  = "VITE_B2C_POLICY"
      value = var.b2c_signin_policy
    },
    {
      name  = "VITE_B2C_RESET_PASSWORD_POLICY"
      value = var.b2c_resetpassword_policy
    },
    {
      name  = "VITE_RESET_PASSWORD_REDIRECT_URI"
      value = var.b2c_resetpassword_redirect_uri
    },
    {
      name  = "VITE_COCKTAILS_API_URL"
      value = trimsuffix("https://${var.cocktails_api_hostname}/${data.azurerm_api_management_api.cocktails_api_version_v1.path}/${data.azurerm_api_management_api.cocktails_api_version_v1.version}", "/api/${data.azurerm_api_management_api.cocktails_api_version_v1.version}")
    },
    {
      name  = "VITE_COCKTAILS_IMAGE_URL"
      value = "${var.cocktail_images_route_hostname}/cocktails"
    },
    {
      name  = "VITE_LOGIN_SUBDOMAIN"
      value = "${var.login_subdomain}"
    }
  ]

  env_secret_vars = [
    {
      name        = "VITE_RECAPTCHA_SITE_KEY"
      secret_name = "recaptcha-site-key"
    },
    {
      name        = "VITE_COCKTAILS_APIM_SUBSCRIPTION_KEY"
      secret_name = "cocktails-apim-subscription-key"
    }
  ]
}