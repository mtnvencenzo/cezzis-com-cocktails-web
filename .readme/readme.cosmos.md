az login
az cosmosdb sql role definition list \
    --resource-group "rg-vec-eus-prd-cocktails-001" \
    --account-name "cosmos-vec-eus-prd-cocktails-001"



Cosmos DB Built-in Data Reader
          "Microsoft.DocumentDB/databaseAccounts/readMetadata",
          "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/executeQuery",
          "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/readChangeFeed",
          "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/read"



Cosmos DB Built-in Data Contributor
          "Microsoft.DocumentDB/databaseAccounts/readMetadata",
          "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/*",
          "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/*"