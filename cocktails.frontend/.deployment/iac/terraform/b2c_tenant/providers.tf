terraform {
  required_providers {
    azuread = {
      source = "hashicorp/azuread"
    }
  }
}

output "cocktails_web_app_registration_client_id" {
  value = azuread_application.cocktails_web_app_registration.client_id
}

data "azuread_application_published_app_ids" "well_known" {}
