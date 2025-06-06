# Azure AI Search Integration

## Overview

Azure AI Search (formerly Azure Cognitive Search) is integrated into the Cezzis.com platform to provide powerful search capabilities for cocktail recipes, ingredients, and user content. The service is configured to index data from Azure Cosmos DB, enabling fast and relevant search results across the platform.

## Architecture

### Components
- Azure AI Search Service
- Cosmos DB Integration
- Search Index Configuration
- Data Source Configuration
- Indexer Configuration

### Integration Points
1. **Cosmos DB Connection**
   - Uses Cosmos DB Data Plane role assignments
   - Due to using the Free tier of Azure AI Search, requires direct access from Azure datacenters
   - This is implemented by adding the 0.0.0.0 IP address to Cosmos DB's IP filters in the Terraform configuration
   - Configured with managed identity authentication

2. **Search Index**
   - Custom index schema for cocktail recipes
   - Optimized for text search and filtering
   - Supports complex queries and faceted navigation

## Prerequisites

1. **Azure AI Search Service**
   - Free tier or higher
   - Region matching Cosmos DB deployment
   - Network access configuration

2. **Cosmos DB Configuration**
   - Data Plane role assignments enabled
   - Network access from Azure datacenters
   - Appropriate indexing policy

3. **Network Requirements**
   - For Free tier: Must allow access from Azure datacenters
   - For Standard tier: Can use private endpoints
   - Firewall rules must permit Azure services

## Terraform Configuration

The AI Search integration is managed through Terraform in the following files:

1. **ai-search.tf**
   - Search service configuration
   - Network settings
   - SKU selection

2. **cosmosdb.tf**
   - Data plane role assignments
   - Network access rules
   - Indexing policies

## Best Practices

1. **Security**
   - Use managed identities for authentication
   - Implement least privilege access
   - Regular security audits

2. **Performance**
   - Optimize index schema
   - Configure appropriate indexers
   - Monitor search performance

3. **Cost Management**
   - Start with Free tier for development
   - Monitor usage patterns
   - Scale based on demand

## Troubleshooting

### Common Issues

1. **Indexer Failures**
   - Check Cosmos DB connectivity
   - Verify network access
   - Review indexer logs

2. **Search Performance**
   - Optimize index schema
   - Review query patterns
   - Check resource utilization

3. **Access Issues**
   - Verify role assignments
   - Check network rules
   - Validate managed identity

## Monitoring

1. **Key Metrics**
   - Search latency
   - Query volume
   - Indexer status
   - Error rates

2. **Alerts**
   - Indexer failures
   - High latency
   - Error thresholds

## Resources

- [Azure AI Search Documentation](https://docs.microsoft.com/en-us/azure/search/)
- [Cosmos DB Integration Guide](https://docs.microsoft.com/en-us/azure/search/search-howto-index-cosmosdb)
- [Network Security Best Practices](https://docs.microsoft.com/en-us/azure/search/search-security-overview)
