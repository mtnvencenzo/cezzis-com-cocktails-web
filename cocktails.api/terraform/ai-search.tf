module "ai_search_cosmos_index" {
  source                      = "./ai_search_index"
  ai_search_service_host_name = "srch-${var.sub}-${var.region}-${var.global_environment}-${var.global_domain}-${var.sequence}"
  ai_search_service_key       = data.azurerm_search_service.ai_search_service.primary_key
}