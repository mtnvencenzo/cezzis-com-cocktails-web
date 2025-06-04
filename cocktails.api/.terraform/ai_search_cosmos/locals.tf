locals {
  cosmos_cocktails_datasource_json = {
    "name" : "ds-cosmos-cocktails",
    "description" : null,
    "type" : "cosmosdb",
    "subtype" : null,
    "indexerPermissionOptions" : [],
    "credentials" : {
      "connectionString" : "ResourceId=${var.cosmosdb_account_id};Database=${var.cosmos_cocktails_database_name};IdentityAuthType=AccessToken"
    },
    "container" : {
      "name" : var.cosmos_cocktails_container_name,
      "query" : null
    },
    "dataChangeDetectionPolicy" : null,
    "dataDeletionDetectionPolicy" : null,
    "encryptionKey" : null,
    "identity" : null
  }

  cosmos_cocktails_standard_lucene_indexer_json = {
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
  }


  cosmos_cocktails_standard_lucene_index_json = {
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
        "name" : "sp-weghted-profile-1",
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
  }
}