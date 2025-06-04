# To do https://learn.microsoft.com/en-us/rest/api/searchservice/create-data-source
resource "restapi_object" "cosmos_cocktails_datasource" {
  path         = "/datasources"
  query_string = "api-version=2024-07-01"
  data         = jsonencode(local.cosmos_cocktails_datasource_json)
  id_attribute = "name" # The ID field on the response
}


# To do this: https://learn.microsoft.com/en-us/rest/api/searchservice/preview-api/create-or-update-index
resource "restapi_object" "cosmos_cocktails_standard_lucene_index" {
  path         = "/indexes"
  query_string = "api-version=2024-07-01"
  data         = jsonencode(local.cosmos_cocktails_standard_lucene_index_json)
  id_attribute = "name" # The ID field on the response
  depends_on   = [restapi_object.cosmos_cocktails_datasource]
}

# To do https://learn.microsoft.com/en-us/rest/api/searchservice/create-indexer
resource "restapi_object" "cosmos_cocktails_standard_lucene_indexer" {
  path         = "/indexers"
  query_string = "api-version=2024-07-01"
  data         = jsonencode(local.indexer_json)
  id_attribute = "name" # The ID field on the response
  depends_on   = [restapi_object.cosmos_cocktails_datasource, restapi_object.cosmos_cocktails_standard_lucene_index]
}