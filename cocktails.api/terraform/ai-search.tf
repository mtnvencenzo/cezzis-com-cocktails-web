module "ai_search_cosmos_index" {
  source                      = "./ai_search_index"
  ai_search_service_host_name = "srch-${var.sub}-${var.region}-${var.global_environment}-${var.global_domain}-${var.sequence}"
  ai_search_service_key       = data.azurerm_search_service.ai_search_service.primary_key
  cosmosdb_account_id         = module.cocktails_cosmosdb_account.cosmosdb_account_id
  cosmos_database_name        = module.cocktails_cosmosdb_database.database_name
  cosmos_container_name       = "cocktails-cocktail"
  tags                        = local.tags

  providers = {
    restapi = aisearch_rest_api
  }
}