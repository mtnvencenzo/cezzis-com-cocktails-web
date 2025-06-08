terraform {
  required_providers {

    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=4.24.0"
    }

    azuread = {
      source  = "hashicorp/azuread"
      version = "=3.1.0"
    }

    aisearch_rest_api = {
      source  = "Mastercard/restapi"
      version = "=2.0.1"
    }
  }

  backend "azurerm" {}
}

provider "azurerm" {
  features {}
}

provider "azuread" {
  use_oidc      = true
  tenant_id     = var.b2c_tenant_id
  client_id     = var.b2c_terraform_app_registration_client_id
  client_secret = var.b2c_terraform_app_registration_client_secret
}

provider "aisearch_rest_api" {
  uri                  = "https://${var.ai_search_service_host_name}.search.windows.net"
  write_returns_object = true
  debug                = true

  headers = {
    "api-key"      = var.ai_search_service_key,
    "Content-Type" = "application/json"
  }

  create_method  = "POST"
  update_method  = "PUT"
  destroy_method = "DELETE"

  copy_keys = [
    "@odata.context",
    "@odata.etag"
  ]
}