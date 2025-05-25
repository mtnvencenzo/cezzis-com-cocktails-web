namespace Cocktails.Api.StartupExtensions;

using Azure.Identity;
using Cocktails.Api.Domain.Config;
using Cocktails.Api.Infrastructure;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

internal static class CosmosExtensions
{
    internal static IServiceCollection AddCosomsContexts(this IServiceCollection services)
    {
        services.AddDbContext<AccountDbContext>((sp, optionsBuilder) =>
        {
            var options = sp.GetRequiredService<IOptions<CosmosDbConfig>>().Value;

            if (!string.IsNullOrWhiteSpace(options.ConnectionString))
            {
                optionsBuilder.UseCosmos(
                    connectionString: options.ConnectionString,
                    databaseName: options.DatabaseName,
                    cosmosOptionsAction: options =>
                    {
                        options.ConnectionMode(Microsoft.Azure.Cosmos.ConnectionMode.Direct);
                        options.MaxRequestsPerTcpConnection(16);
                        options.MaxTcpConnectionsPerEndpoint(32);
                    });
            }
            else
            {
                optionsBuilder.UseCosmos(
                    accountEndpoint: options.AccountEndpoint,
                    tokenCredential: new DefaultAzureCredential(),
                    databaseName: options.DatabaseName,
                    cosmosOptionsAction: options =>
                    {
                        options.ConnectionMode(Microsoft.Azure.Cosmos.ConnectionMode.Direct);
                        options.MaxRequestsPerTcpConnection(16);
                        options.MaxTcpConnectionsPerEndpoint(32);
                    });
            }
        },
        contextLifetime: ServiceLifetime.Scoped,
        optionsLifetime: ServiceLifetime.Singleton);

        services.AddDbContext<CocktailDbContext>((sp, optionsBuilder) =>
        {
            var options = sp.GetRequiredService<IOptions<CosmosDbConfig>>().Value;

            if (!string.IsNullOrWhiteSpace(options.ConnectionString))
            {
                optionsBuilder.UseCosmos(
                    connectionString: options.ConnectionString,
                    databaseName: options.DatabaseName,
                    cosmosOptionsAction: options =>
                    {
                        options.ConnectionMode(Microsoft.Azure.Cosmos.ConnectionMode.Direct);
                        options.MaxRequestsPerTcpConnection(16);
                        options.MaxTcpConnectionsPerEndpoint(32);
                    });
            }
            else
            {
                optionsBuilder.UseCosmos(
                    accountEndpoint: options.AccountEndpoint,
                    tokenCredential: new DefaultAzureCredential(),
                    databaseName: options.DatabaseName,
                    cosmosOptionsAction: options =>
                    {
                        options.ConnectionMode(Microsoft.Azure.Cosmos.ConnectionMode.Direct);
                        options.MaxRequestsPerTcpConnection(16);
                        options.MaxTcpConnectionsPerEndpoint(32);
                    });
            }
        },
        contextLifetime: ServiceLifetime.Scoped,
        optionsLifetime: ServiceLifetime.Singleton);

        return services;
    }
}
