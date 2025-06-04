variable "ai_search_service_host_name" {
  type        = string
  description = "The host name for the AI Search service"
}

variable "ai_search_service_key" {
  type        = string
  description = "The primary key for the AI Search service"
}

variable "cosmosdb_account_id" {
  type = string
  description = "The ID of the Cosmos DB account"
}

variable "cosmos_cocktails_database_name" {
  type = string
  description = "The name of the database for the Cosmos DB account"
}

variable "cosmos_cocktails_container_name" {
  type = string
  description = "The name of the container for the Cosmos DB account"
}


variable "tags" {
  type    = map(string)
  default = {}
}


