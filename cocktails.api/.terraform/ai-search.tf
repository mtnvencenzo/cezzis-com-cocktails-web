# resource "azurerm_cosmosdb_sql_role_assignment" "cosmos_account_sql_db_role_assignment" {
#   name                = "64d7c255-8558-4ea2-941e-7044fe5db991" # must be a uuid
#   resource_group_name = data.azurerm_resource_group.cocktails_resource_group.name
#   account_name        = module.cocktails_cosmosdb_account.name
#   role_definition_id  = module.cocktails_cosmosdb_account.cosmosdb_reader_role_id
#   principal_id        = data.azurerm_search_service.ai_search_service.identity[0].principal_id
#   scope               = module.cocktails_cosmosdb_account.id

#   depends_on = [module.cocktails_cosmosdb_account]
# }

resource "azurerm_role_assignment" "cosmos_assearch_account_reader_role_assignment" {
  scope                = module.cocktails_cosmosdb_account.cosmosdb_account_id
  role_definition_name = "Cosmos DB Account Reader Role"
  principal_id         = data.azurerm_search_service.ai_search_service.identity[0].principal_id

  depends_on = [module.cocktails_cosmosdb_account]
}


module "ai_search_cosmos" {
  source = "./ai_search_cosmos"

  ai_search_service_host_name = "srch-${var.sub}-${var.region}-${var.global_environment}-${var.global_domain}-${var.sequence}"
  ai_search_service_key       = data.azurerm_search_service.ai_search_service.primary_key

  cosmosdb_account_id             = module.cocktails_cosmosdb_account.cosmosdb_account_id
  cosmos_cocktails_database_name  = var.cocktails_cosmosdb_database_name
  cosmos_cocktails_container_name = "cocktails-cocktail"

  tags = local.tags
}