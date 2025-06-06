# Cezzis.com - Modern Cocktail Recipe Platform

**Live Site:** [www.cezzis.com](https://www.cezzis.com)

## 🍸 Platform Overview

Cezzis.com is a modern, cloud-native cocktail recipe platform that provides an intuitive interface for discovering and creating cocktails. The platform is designed with performance, scalability, and user experience at its core, serving both amateur enthusiasts and professional bartenders.

## 📁 Project Structure

| Project | Type | Description | Documentation |
|---------|------|-------------|---------------|
| [Cocktails Frontend](./cocktails.frontend/README.md) | Frontend | Main React application with Material-UI, MSAL auth, and user interface | [README](./cocktails.frontend/README.md) |
| [Cocktails E2E Tests](./cocktails.frontend/cocktails.web.e2e/readme.md) | Testing | Cypress E2E test suite for user flows and integration testing | [README](./cocktails.frontend/cocktails.web.e2e/readme.md) |
| [Cocktails API](./cocktails.api/README.md) | Backend | .NET Core REST API with business logic and data access | [README](./cocktails.api/README.md) |
| [Cocktails Common (Nuget)](./cocktails.common/README.md) | Backend | .NET Core REST Nuget package with common models, interfaces, and utilities used across the Cocktails backend ecosystem | [README](./cocktails.common/README.md) |
| [Shared Infrastructure](./cocktails.sharedinfrastructure/README.md) | Shared | Common azure infrastructure with cross-cutting concerns | [README](./cocktails.sharedinfrastructure/README.md) |

Each project contains detailed documentation and setup instructions in its respective README file.

## 🛠️ Technology Stack Overview

### Frontend
- **Framework**: React.js with TypeScript
- **UI Components**: Material-UI (MUI)
- **State Management**: React Hooks
- **Build Tools**: Vite
- **Web Server**: NGINX
- **Testing**: 
  - Vitest for unit testing
  - Cypress for E2E testing
- **Authentication**: MSAL (Microsoft Authentication Library)

### Backend
- **Framework**: .NET Core 9.0
- **API**: RESTful with OpenAPI
- **API Gateway**: Azure API Management
- **API Documentation**: [Scalar API Documentation](https://api.cezzis.com/prd/cocktails/api-docs/v1/scalar/v1)
- **Database**: Azure Cosmos DB (SQL API)
- **Search**: [Azure AI Search](./.readme/readme-aisearch.md) with Cosmos DB integration
- **Authentication**: 
  - Azure B2C for user authentication
  - Azure App Registrations for API security
  - OAuth 2.0 for authorization framework
  - OpenID Connect for identity layer
- **Messaging**: Dapr with Azure Service Bus
- **Email**: Zoho SMTP
- **Storage**: Azure Blob Storage
- **Monitoring**: Application Insights

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Azure Container Apps
- **CDN**: Azure Front Door
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **Service Mesh**: Dapr
- **Search**: [Azure AI Search](./.readme/readme-aisearch.md) with managed identity and Cosmos DB integration

### Architectural Patterns

The platform follows several modern architectural patterns and practices:

1. **Domain-Driven Design (DDD)**
   - Rich domain model with aggregates (Account, Cocktail, Ingredient)
   - Domain events for cross-aggregate communication
   - Value objects and entities with encapsulated business logic
   - Ubiquitous language reflected in code structure

2. **CQRS (Command Query Responsibility Segregation)**
   - Commands for state-changing operations
   - Queries for read-only operations
   - MediatR for command/query handling
   - Separate command and query models

3. **Repository Pattern**
   - Generic repository interfaces
   - Cosmos DB implementation
   - Unit of Work pattern for transaction management
   - Caching strategies for frequently accessed data

4. **Event-Driven Architecture**
   - Domain events for internal communication
   - Integration events for cross-service communication
   - Dapr pub/sub for event distribution via Azure Service Bus
   - Event handlers for side effects

5. **Dependency Injection**
   - Constructor injection throughout the codebase
   - Interface-based design
   - Service registration in startup
   - Scoped lifetime management

6. **Clean Architecture**
   - Clear separation of concerns
   - Domain layer independence
   - Infrastructure layer for external concerns
   - Application layer for use cases

7. **Validation and Error Handling**
   - FluentValidation for command validation
   - Custom exception types
   - Global error handling
   - Validation pipeline behavior

### Microservices Architecture
The platform is built using a microservices architecture with the following components:

1. **Cocktails API**
   - RESTful API service
   - Business logic and data access
   - Authentication and authorization
   - Event-driven messaging with Dapr and Azure Service Bus
   - Cosmos DB integration

2. **Cocktails Frontend**
   - Single Page Application (SPA)
   - Material-UI components
   - MSAL authentication
   - Responsive design
   - Progressive Web App (PWA) capabilities

3. **Supporting Services**
   - Email service (Zoho SMTP)
   - Image processing and storage
   - User avatar management
   - Rating system

### Infrastructure Components

1. **Data Layer**
   - Azure Cosmos DB for data storage
   - Azure Blob Storage for images
   - Dapr state management

2. **Security Layer**
   - Azure B2C for authentication
   - Key Vault for secrets management
   - SSL/TLS encryption
   - DDoS protection via Front Door

3. **Messaging Layer**
   - Dapr pub/sub via Azure Service Bus
   - Azure Service Bus
   - Event-driven architecture

4. **Monitoring & Observability**
   - Application Insights
   - OpenTelemetry integration
   - Performance monitoring
   - Error tracking

## 🚀 Deployment Architecture

The platform follows a multi-environment deployment strategy:

1. **Development**: For active development and testing
2. **Staging**: Pre-production environment
3. **Production**: Live environment with high availability

Each environment is provisioned using Terraform and follows infrastructure-as-code principles.

## 🔒 Security Features

- Azure B2C for enterprise-grade authentication
- Azure App Registrations for API security
- OAuth 2.0 authorization framework
- OpenID Connect for identity layer
- HTTPS everywhere with managed certificates
- Key Vault for secrets management
- Network security groups and firewalls
- DDoS protection through Azure Front Door

## 📈 Scalability

- Container-based deployment for horizontal scaling
- Global CDN for content delivery
- Cosmos DB for scalable data storage
- Dapr for service mesh capabilities
- Event-driven architecture for loose coupling

## 🛠️ Development Setup

1. **Prerequisites**
   - Node.js
   - Yarn package manager
   - .NET Core SDK 9.0
   - Docker
   - Azure CLI
   - Terraform
   - Dapr CLI
   - Local Docker images:
     - Azurite (Azure Storage Emulator)
     - Redis (for local pubsub via Dapr)
     - Cosmos (Cosmos Emulator)

2. **Setup Instructions**
   - Follow the detailed [Environment Setup Guide](./.readme/env-setup.md) for complete installation and configuration instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for cocktail enthusiasts everywhere!