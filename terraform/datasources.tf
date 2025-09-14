
data "azurerm_resource_group" "cocktails_resource_group" {
  name = "rg-${var.sub}-${var.region}-${var.environment}-${var.domain}-${var.sequence}"
}

data "azurerm_resource_group" "cocktails_global_resource_group" {
  name = "rg-${var.sub}-${var.region}-${var.global_environment}-${var.domain}-${var.sequence}"
}

data "azurerm_resource_group" "global_shared_resource_group" {
  name = "rg-${var.sub}-${var.region}-${var.global_environment}-shared-${var.sequence}"
}

data "azurerm_container_registry" "shared_acr" {
  name                = "acr${var.sub}${var.region}${var.global_environment}shared${var.sequence}"
  resource_group_name = data.azurerm_resource_group.global_shared_resource_group.name
}

data "azurerm_api_management" "apim_shared" {
  name                = "apim-${var.sub}-${var.region}-${var.global_environment}-shared-${var.sequence}"
  resource_group_name = data.azurerm_resource_group.global_shared_resource_group.name
}

data "azurerm_container_app_environment" "cae_shared" {
  resource_group_name = data.azurerm_resource_group.global_shared_resource_group.name
  name                = "cae-${var.sub}-${var.region}-${var.global_environment}-shared-${var.sequence}"
}

data "azurerm_key_vault" "cocktails_keyvault" {
  name                = "kv-${var.sub}-${var.region}-${var.environment}-${var.shortdomain}-${var.short_sequence}"
  resource_group_name = data.azurerm_resource_group.cocktails_resource_group.name
}

data "azurerm_key_vault" "global_keyvault" {
  name                = "kv-${var.sub}-${var.region}-${var.global_environment}-shared-${var.short_sequence}"
  resource_group_name = data.azurerm_resource_group.global_shared_resource_group.name
}

data "azurerm_key_vault_secret" "otel_collector_web_key" {
  name         = "otel-collector-api-key-cocktails-web"
  key_vault_id = data.azurerm_key_vault.global_keyvault.id
}

data "azurerm_api_management_api" "cocktails_api_version_v1" {
  name                = "${var.environment}-cocktails-api-v1"
  api_management_name = data.azurerm_api_management.apim_shared.name
  resource_group_name = data.azurerm_resource_group.global_shared_resource_group.name
  revision            = "v1"
}

data "azurerm_dns_zone" "cezzis_dns_zone" {
  name                = "cezzis.com"
  resource_group_name = data.azurerm_resource_group.cocktails_global_resource_group.name
}

data "azurerm_container_app" "otel_collector" {
  name                = "aca-${var.sub}-${var.region}-${var.global_environment}-otelcol-${var.sequence}"
  resource_group_name = data.azurerm_resource_group.global_shared_resource_group.name
}

data "azurerm_client_config" "current" {}