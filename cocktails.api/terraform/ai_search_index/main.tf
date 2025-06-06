module "ai_search_cocktails_index_simple" {
  source = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/ai-search-cosmos-index-simple"

  cosmosdb_account_id   = var.cosmosdb_account_id
  cosmos_database_name  = var.cosmos_database_name
  cosmos_container_name = var.cosmos_container_name

  tags = var.tags

  # https://learn.microsoft.com/en-us/rest/api/searchservice/create-data-source
  cosmos_datasource_json = jsonencode({
    "name" : "ds-cosmos-cocktails",
    "description" : null,
    "type" : "cosmosdb",
    "credentials" : {
      "connectionString" : "ResourceId=${var.cosmosdb_account_id};Database=${var.cosmos_database_name};IdentityAuthType=AccessToken"
    },
    "container" : {
      "name" : var.cosmos_container_name,
      "query" : "SELECT * FROM c WHERE c._ts >= @HighWaterMark ORDER BY c._ts"
    },
    "dataChangeDetectionPolicy" : {
      "@odata.type" : "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy",
      "highWaterMarkColumnName" : "_ts"
    },
    "dataDeletionDetectionPolicy" : null,
    "encryptionKey" : null
  })

  # https://learn.microsoft.com/en-us/rest/api/searchservice/create-indexer
  cosmos_standard_lucene_indexer_json = jsonencode({
    "name" : "idxer-cosmos-cocktails-standard-lucene",
    "description" : null,
    "dataSourceName" : "ds-cosmos-cocktails",
    "skillsetName" : null,
    "targetIndexName" : "idx-cosmos-cocktails-standard-lucene",
    "disabled" : null,
    "schedule": {
      "interval": "P1D",
      "startTime": "2025-06-06T12:23:48.423Z"
    },
    "parameters" : null,
    "fieldMappings" : [],
    "outputFieldMappings" : [],
    "encryptionKey" : null
  })

  # To do https://learn.microsoft.com/en-us/rest/api/searchservice/create-index
  cosmos_standard_lucene_index_json = jsonencode({
    "name" : "idx-cosmos-cocktails-standard-lucene",
    "defaultScoringProfile" : "sp-weighted-profile-1",
    "fields" : [
      {
        "name" : "id",
        "type" : "Edm.String",
        "searchable" : false,
        "filterable" : false,
        "retrievable" : true,
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
        "text" : {
          "weights" : {
            "Title" : 5,
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
    "tokenizers" : [],
    "tokenFilters" : [],
    "charFilters" : [],
    "similarity" : {
      "@odata.type" : "#Microsoft.Azure.Search.BM25Similarity"
    }
  })

  depends_on = [azurerm_role_assignment.cosmos_search_account_reader_role_assignment]
}