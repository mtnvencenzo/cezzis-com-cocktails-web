# Cocktails Frontend

## 🛠️ Technology Stack

### Core Framework
- **Framework**: React 19 with TypeScript
- **UI Library**: Material-UI (MUI) v7
- **State Management**: React Hooks and Context API
- **Routing**: React Router v7
- **Build Tool**: Vite v6
- **Package Manager**: Yarn

### UI Components
- **Component Library**: Material-UI (MUI)
- **Icons**: Material Icons
- **Charts**: Recharts
- **Markdown**: React Markdown
- **Image Handling**: React Avatar Editor
- **Infinite Scroll**: React Infinite Scroll Component
- **Notifications**: React Toastify
- **Tooltips**: React Tooltip
- **Country Selection**: Countries List

### Authentication & Security
- **Authentication**: Microsoft Authentication Library (MSAL)
- **Azure Entra External Id**: User authentication and management
- **reCAPTCHA**: Form protection
- **Cookie Management**: Cookiebot integration

### Testing
- **Unit Testing**: Vitest with React Testing Library
- **E2E Testing**: Cypress
- **Test Coverage**: Istanbul
- **Mock Service Worker**: API mocking
- **MSAL Testing**: MSAL React Tester

### Development Tools
- **TypeScript**: Static type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **NSwag**: API client generation (fetch and typescript)
- **Vite Plugins**:
  - ESLint
  - TypeScript paths
  - MKCert (HTTPS)
  - Vendor chunk splitting

## 🎨 Design System

The project follows Atomic Design principles, organizing components into a hierarchical structure:

- **Atoms**: Basic building blocks (buttons, inputs, labels)
- **Molecules**: Simple combinations of atoms (search forms, navigation items)
- **Organisms**: Complex UI components (headers, footers, sidebars)
- **Templates**: Page layouts and structure
- **Pages**: Complete pages with real content

For more information about Atomic Design methodology, see [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/).


## 🏗️ Project Structure

```

cocktails.web/           # Main web application
├── src/
│   ├── api/            # API clients and types
│   ├── assets/         # Static assets
│   ├── atoms/          # Basic UI components
│   ├── components/     # Shared components
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex components
│   ├── pages/          # Page components
│   ├── services/       # Business logic
│   ├── templates/      # Layout templates
│   └── utils/          # Utility functions
│   └── tests/              # Test setup and utilities
cocktails.web.e2e/      # End-to-end tests
terraform/              # terraform for the projects infrastructure
```

## 🚀 Development Setup

1. **Prerequisites**
   - Node.js 23.5.x
   - Yarn package manager
   - .NET Core SDK 9.0 (for API)
   - Azure CLI
   - Dapr CLI

2. **Environment Setup**
   See [Environment Setup Guide](.readme/env-setup.md) for detailed instructions on configuring your development environment.

3. **Local Development**
   ```bash
   # Install dependencies
   yarn install
   
   # Start development server
   yarn loc
   ```

4. **Testing**
   ```bash
   # Run unit tests
   yarn test
   
   # Run unit tests with UI
   yarn testui
   
   # Run E2E tests
   yarn cy
   ```

## 📦 Build & Deployment

```bash
# Build for production
yarn build:prod

# Preview production build
yarn preview
```

## 🔍 Code Quality

- **Linting**: ESLint with Airbnb config
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Testing**: Vitest and Cypress
- **Coverage**: Istanbul reports

## 🔒 Security Features

- Azure Entra External Id authentication
- HTTPS enforcement
- reCAPTCHA integration
- Cookie consent management
- Secure API communication
- XSS protection
- CSRF protection

## 📈 Monitoring

- Application Insights integration
- Error tracking
- Performance monitoring
- User analytics
- Custom event tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🌐 Community & Support

- 🤝 **Contributing Guide** – review expectations and workflow in [CONTRIBUTING.md](./.github/CONTRIBUTING.md)
- 🤗 **Code of Conduct** – help us keep the community welcoming by reading [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- 🆘 **Support Guide** – find help channels in [SUPPORT.md](./.github/SUPPORT.md)
- 🔒 **Security Policy** – report vulnerabilities responsibly via [SECURITY.md](./.github/SECURITY.md)

## 📄 License

This project is proprietary software. All rights reserved. See the full license in [LICENSE](./LICENSE).