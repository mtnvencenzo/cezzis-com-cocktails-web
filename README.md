# Cezzis.com - Modern Cocktail Recipe Platform

**Visit the live site: [www.cezzis.com](https://www.cezzis.com)**

Cezzis.com is a cutting-edge cocktail recipe website that provides quick, easy-to-follow cocktail recipes for both amateur and professional bartenders. Built entirely on modern cloud-native architecture, this platform showcases the latest in web development, infrastructure-as-code, and Azure cloud services.

## 🍸 About the Platform

Cezzis.com delivers a streamlined, user-friendly experience for discovering and creating cocktails. The platform emphasizes:
- **Quick Access**: Fast, searchable cocktail recipes
- **Modern UX**: Clean, responsive design optimized for all devices  
- **Performance**: Lightning-fast load times with global CDN
- **Scalability**: Cloud-native architecture that scales automatically
- **Security**: Enterprise-grade authentication and data protection

## 🏗️ Technical Excellence

This repository demonstrates modern software engineering practices through:
- **Microservices Architecture**: Containerized services with Azure Container Apps
- **Infrastructure as Code**: Complete Terraform automation
- **CI/CD Pipelines**: Automated testing, building, and deployment
- **Modern Authentication**: Azure B2C integration
- **Content Delivery**: Azure Front Door with global edge locations
- **Monitoring & Observability**: Application Insights and comprehensive logging

## 🏗️ Architecture

The project consists of several key components:

- **ADO Terraform**: Infrastructure foundation and security management
- **Shared Infrastructure**: Common resources and DNS configuration
- **Cocktails API**: Backend services and business logic
- **Cocktails Frontend**: User interface and client-side functionality
- **Cocktails Images**: Image storage and content delivery
- **B2C Integration**: Authentication and user management

## 📋 Deployment Process

### 1. ADO Terraform Setup
- Run the ADO Terraform pipeline to create resource groups and service principals
- This establishes the security foundation for all other deployments

### 2. B2C Tenant Configuration
- Manually configure B2C tenant in target environments
- Follow the [B2C setup guide](Readme-b2c.md)

### 3. Shared Infrastructure
- Deploy shared resources and DNS zone for cezzis.com
- Resources are shared across all environments and the organization

### 4. Cocktails Shared Infrastructure
- Sets up KeyVault for each environment
- Configures container app environment subnet access
- Creates container registry password secrets

### 5. Cocktails API Deployment
- Review and update Terraform environment variable files
- Deploy API and app registration resources
- **Manual Steps Required:**
  - Update Google reCAPTCHA site secret in KeyVault (default: 'na')
  - Configure pipeline warmup stage with correct URL and KeyVault secret
  - Grant Admin Consent in B2C tenant for API permissions
  - Note API client_id and permission scope GUIDs for frontend configuration

### 6. Cocktails Frontend Deployment
- Update Terraform environment variable files
- Deploy frontend application
- **Manual Steps Required:**
  - Update Google reCAPTCHA site key in KeyVault
  - Update Zoho email app password in KeyVault
  - Configure custom domain bindings with managed certificates
  - Grant Admin Consent for B2C app registration
  - Update pipeline `ui-cypress.yml` with B2C client_id

### 7. Cocktails Images Deployment
- Configure image storage and CDN
- Review allowed origins for storage account and Front Door CDN

### 8. Final Configuration
- Register test account on the website
- Update KeyVault with e2e test credentials
- Configure Cypress pipeline parameters:
  ```yaml
  parameters:
    baseUrl: 'https://www.cezzis.com'
    b2cUrl: 'https://cezzis.b2clogin.com/'
    b2cTenantId: 'your-tenant-id'
    b2cClientId: 'your-client-id'
    b2cUserObjectId: 'your-user-object-id'
    b2cUserEmail: 'your-test-email'
    b2cUserPassword: '$(e2e-cypress-user-password)'
  ```

## 🔧 Development Tools

### Git Bash Integration
- Configure Git Bash in Visual Studio Terminal
- Add Git Bash to Visual Studio External Tools

### Authentication Setup
For projects requiring DevOps Artifacts access:
```bash
vsts-npm-auth -config .npmrc
```

## 🌐 Live Website

Visit the live application at: [https://www.cezzis.com](https://www.cezzis.com)

## 📚 Additional Documentation

- [B2C Setup Guide](Readme-b2c.md)
- [Terraform Configuration Guidelines](docs/terraform.md)
- [API Documentation](docs/api.md)
- [Frontend Development Guide](docs/frontend.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions, issues, or contributions, please:
- Open an issue in this repository
- Contact the development team
- Review the documentation in the `/docs` folder

---

Built with ❤️ for cocktail enthusiasts everywhere!