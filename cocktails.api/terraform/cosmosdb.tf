module "cocktails_cosmosdb_account" {
  source              = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/cosmos-db-account"
  resource_group_name = data.azurerm_resource_group.cocktails_resource_group.name
  location            = data.azurerm_resource_group.cocktails_resource_group.location
  geo_location        = data.azurerm_resource_group.cocktails_resource_group.location
  subnet_ids          = [data.azurerm_subnet.container_app_environment_subnet.id]

  tags = local.tags

  sub                     = var.sub
  region                  = var.region
  environment             = var.environment
  domain                  = var.domain
  sequence                = var.sequence
  consistency_level       = "Eventual"
  max_interval_in_seconds = 5
  max_staleness_prefix    = 100
  enable_monitor_alerts   = false
  action_group_id         = ""

  # Setting range of IP addresses that can access the Cosmos DB account from AzureCognitiveSearch.EastUS
  # https://www.microsoft.com/en-us/download/details.aspx?id=56519
  # When not using AzureCognitiveSearch free tier, comment out the ip_range_filter block
  ip_range_filter = [
    "9.169.0.0/17"
  ]

  account_reader_role_assignments = [
    {
      name         = "7435b819-a0b0-4c0d-a180-79ec100f8929" # must be a uuid
      principal_id = data.azurerm_search_service.ai_search_service.identity[0].principal_id
    }
  ]

  providers = {
    azurerm = azurerm
  }
}

module "cocktails_cosmosdb_database" {
  source = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/cosmos-db-sql-db"

  database_name         = var.cocktails_cosmosdb_database_name
  resource_group_name   = data.azurerm_resource_group.cocktails_resource_group.name
  cosmosdb_account_name = module.cocktails_cosmosdb_account.cosmosdb_account_name
  database_throughput   = 400

  database_role_assignments = [
    {
      name               = "24d5c255-8508-4ea2-941e-7044fe5db968" # must be a uuid
      role_definition_id = module.cocktails_cosmosdb_account.cosmosdb_reader_role_id
      principal_id       = module.aca_cocktails_api.managed_identity_principal_id
    },
    {
      name               = "37c0645e-bc81-43cd-9607-2377e2660d2a" # must be a uuid
      role_definition_id = module.cocktails_cosmosdb_account.cosmosdb_contributor_role_id
      principal_id       = module.aca_cocktails_api.managed_identity_principal_id
    },
    {
      name               = "34d5c255-8508-4ea2-941e-7044fe5db968" # must be a uuid
      role_definition_id = module.cocktails_cosmosdb_account.cosmosdb_reader_role_id
      principal_id       = data.azurerm_search_service.ai_search_service.identity[0].principal_id
    }
  ]

  containers = [
    {
      name                  = "accounts-account"
      partition_key_paths   = ["/subjectId"]
      partition_key_version = 1
      indexing_mode         = "consistent"
      indexing_path         = "/*"
      unique_key_paths      = []
    },
    {
      name                  = "cocktails-cocktail"
      partition_key_paths   = ["/id"]
      partition_key_version = 1
      indexing_mode         = "consistent"
      indexing_path         = "/*"
      unique_key_paths      = []
    },
    {
      name                  = "cocktails-ingredient"
      partition_key_paths   = ["/id"]
      partition_key_version = 1
      indexing_mode         = "consistent"
      indexing_path         = "/*"
      unique_key_paths      = []
    }
  ]

  depends_on = [module.cocktails_cosmosdb_account]
}