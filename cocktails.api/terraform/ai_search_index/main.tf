resource "azurerm_role_assignment" "cosmos_search_account_reader_role_assignment" {
  scope                = var.cosmosdb_account_id
  role_definition_name = "Cosmos DB Account Reader Role"
  principal_id         = var.search_service_principal_id
}

module "ai_search_cocktails_index_simple" {
  source = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/ai-search-cosmos-index-simple"

  cosmosdb_account_id   = var.cosmosdb_account_id
  cosmos_database_name  = var.cosmos_database_name
  cosmos_container_name = var.cosmos_container_name

  cosmos_datasource_json = jsonencode({
    "name" : "ds-cosmos-cocktails",
    "description" : null,
    "type" : "cosmosdb",
    "subtype" : null,
    "indexerPermissionOptions" : [],
    "credentials" : {
      "connectionString" : "ResourceId=${var.cosmosdb_account_id};Database=${var.cosmos_database_name};IdentityAuthType=AccessToken"
    },
    "container" : {
      "name" : var.cosmos_container_name,
      "query" : null
    },
    "dataChangeDetectionPolicy" : null,
    "dataDeletionDetectionPolicy" : null,
    "encryptionKey" : null,
    "identity" : null
  })

  cosmos_standard_lucene_indexer_json = jsonencode({
    "name" : "idxer-cosmos-cocktails-standard-lucene",
    "description" : null,
    "dataSourceName" : "ds-cosmos-cocktails",
    "skillsetName" : null,
    "targetIndexName" : "idx-cosmos-cocktails-standard-lucene",
    "disabled" : null,
    "schedule" : null,
    "parameters" : null,
    "fieldMappings" : [],
    "outputFieldMappings" : [],
    "cache" : null,
    "encryptionKey" : null
  })

  cosmos_standard_lucene_index_json = jsonencode({
    "name" : "idx-cosmos-cocktails-standard-lucene",
    "defaultScoringProfile" : "sp-weghted-profile-1",
    "fields" : [
      {
        "name" : "id",
        "type" : "Edm.String",
        "searchable" : false,
        "filterable" : false,
        "retrievable" : true,
        "stored" : true,
        "sortable" : false,
        "facetable" : false,
        "key" : true,
        "synonymMaps" : []
      },
      {
        "name" : "Content",
        "type" : "Edm.String",
        "searchable" : true,
        "filterable" : false,
        "retrievable" : false,
        "stored" : true,
        "sortable" : false,
        "facetable" : false,
        "key" : false,
        "analyzer" : "standard.lucene",
        "synonymMaps" : []
      },
      {
        "name" : "Title",
        "type" : "Edm.String",
        "searchable" : true,
        "filterable" : false,
        "retrievable" : true,
        "stored" : true,
        "sortable" : false,
        "facetable" : false,
        "key" : false,
        "analyzer" : "standard.lucene",
        "synonymMaps" : []
      },
      {
        "name" : "IsIba",
        "type" : "Edm.Boolean",
        "searchable" : false,
        "filterable" : false,
        "retrievable" : true,
        "stored" : true,
        "sortable" : false,
        "facetable" : false,
        "key" : false,
        "synonymMaps" : []
      },
      {
        "name" : "eras",
        "type" : "Collection(Edm.String)",
        "searchable" : true,
        "filterable" : false,
        "retrievable" : false,
        "stored" : true,
        "sortable" : false,
        "facetable" : false,
        "key" : false,
        "analyzer" : "standard.lucene",
        "synonymMaps" : []
      },
      {
        "name" : "Description",
        "type" : "Edm.String",
        "searchable" : true,
        "filterable" : false,
        "retrievable" : true,
        "stored" : true,
        "sortable" : false,
        "facetable" : false,
        "key" : false,
        "analyzer" : "standard.lucene",
        "synonymMaps" : []
      },
      {
        "name" : "DescriptiveTitle",
        "type" : "Edm.String",
        "searchable" : true,
        "filterable" : false,
        "retrievable" : true,
        "stored" : true,
        "sortable" : false,
        "facetable" : false,
        "key" : false,
        "analyzer" : "standard.lucene",
        "synonymMaps" : []
      },
      {
        "name" : "Ingredients",
        "type" : "Collection(Edm.ComplexType)",
        "fields" : [
          {
            "name" : "Name",
            "type" : "Edm.String",
            "searchable" : true,
            "filterable" : false,
            "retrievable" : true,
            "stored" : true,
            "sortable" : false,
            "facetable" : false,
            "key" : false,
            "analyzer" : "standard.lucene",
            "synonymMaps" : []
          },
          {
            "name" : "Units",
            "type" : "Edm.Double",
            "searchable" : false,
            "filterable" : false,
            "retrievable" : true,
            "stored" : true,
            "sortable" : false,
            "facetable" : false,
            "key" : false,
            "synonymMaps" : []
          },
          {
            "name" : "UoM",
            "type" : "Edm.String",
            "searchable" : false,
            "filterable" : false,
            "retrievable" : true,
            "stored" : true,
            "sortable" : false,
            "facetable" : false,
            "key" : false,
            "synonymMaps" : []
          }
        ]
      }
    ],
    "scoringProfiles" : [
      {
        "name" : "sp-weighted-profile-1",
        "functionAggregation" : "sum",
        "text" : {
          "weights" : {
            "Title" : 4,
            "Description" : 2,
            "DescriptiveTitle" : 1
          }
        },
        "functions" : []
      }
    ],
    "suggesters" : [
      {
        "name" : "ac-suggestor-1",
        "searchMode" : "analyzingInfixMatching",
        "sourceFields" : [
          "Title",
          "Description",
          "DescriptiveTitle",
          "Ingredients/Name"
        ]
      }
    ],
    "analyzers" : [],
    "normalizers" : [],
    "tokenizers" : [],
    "tokenFilters" : [],
    "charFilters" : [],
    "similarity" : {
      "@odata.type" : "#Microsoft.Azure.Search.BM25Similarity"
    }
  })

  depends_on = [azurerm_role_assignment.cosmos_search_account_reader_role_assignment]
}