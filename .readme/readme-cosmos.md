
## Instructions for linux based image
https://learn.microsoft.com/en-us/azure/cosmos-db/emulator-linux


## Download the cosmos db image
``` bash
docker pull mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:vnext-preview
```

## Run the cosmos container
``` bash
docker run --restart=always -d --name cosmos-cocktails -p 8081:8081 -p 1234:1234 mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:vnext-preview --protocol https

docker ps
```

Note that the data explorer runs on the 1234 port http://localhost:1234/

The db runs on 8081

Https is required - see the --protocol https argument.  Note that we are disabling the certificate check in the cosmos setup when running locally though.

```csharp
                optionsBuilder.UseCosmos(
                    connectionString: options.ConnectionString,
                    databaseName: options.DatabaseName,
                    cosmosOptionsAction: options =>
                    {
                        options.ConnectionMode(Microsoft.Azure.Cosmos.ConnectionMode.Gateway);
                        options.LimitToEndpoint(true);
                        options.HttpClientFactory(() =>
                        {
                            HttpMessageHandler httpMessageHandler = new HttpClientHandler()
                            {
                                ServerCertificateCustomValidationCallback = (req, cert, chain, errors) => true
                            };

                            return new HttpClient(httpMessageHandler);
                        });
                    });
```

## Setup the database
- Create a db called **cocktails-db**
- Create container called **accounts-account** *(w/partionkey=/subjectId)*
- Create container called **cocktails-cocktail** *(w/partionKey=/id)*
- Create container called **cocktails-ingredient** *(w/partionKey=/id)*



4. **Cosmos DB Emulator**
   - Pull and run the Cosmos DB emulator:
   ```bash
   docker pull mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator
   docker run --name azure-cosmos-emulator -p 8081:8081 -p 10251:10251 -p 10252:10252 -p 10253:10253 -p 10254:10254 mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator
   ```
   
   - Connection string:
   ```
   AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==;
   ```
   - For detailed configuration and troubleshooting, see the [Cosmos DB Emulator Documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/linux-emulator)


## Random
``` bash
az login
az cosmosdb sql role definition list \
    --resource-group "rg-vec-eus-prd-cocktails-001" \
    --account-name "cosmos-vec-eus-prd-cocktails-001"
```