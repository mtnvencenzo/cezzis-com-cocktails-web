# Cezzis.com Cocktails Frontend

> Part of the broader [Cezzis.com](https://www.cezzis.com) digital experience for discovering and sharing cocktail recipes with a broad community of cocktail enthusiasts and aficionados.

## 🧩 Cezzis.com Project Ecosystem

This frontend works alongside several sibling repositories:

- **cocktails-web** (this repo) – React SPA for the public experience
- [**cocktails-api**](https://github.com/mtnvencenzo/cezzis-com-cocktails-api) – ASP.NET Core backend and REST API consumed by the site and integrations
- [**cocktails-mcp**](https://github.com/mtnvencenzo/cezzis-com-cocktails-mcp) – Model Context Protocol services that expose cocktail data to AI agents
- [**cocktails-common**](https://github.com/mtnvencenzo/cezzis-com-cocktails-common) – Shared libraries and utilities reused across frontends, APIs, and tooling
- [**cocktails-images**](https://github.com/mtnvencenzo/cezzis-com-cocktails-images) *(private)* – Source of curated cocktail imagery and CDN assets
- [**cocktails-shared-infra**](https://github.com/mtnvencenzo/cezzis-com-cocktails-shared-infra) – Terraform compositions specific to the cocktails platform
- [**shared-infrastructure**](https://github.com/mtnvencenzo/shared-infrastructure) – Global Terraform modules that underpin multiple Cezzis.com workloads

![Complete Diagram](./assets/cezzis-com-web-interactions.drawio.svg)

## ☁️ Cloud-Native Footprint (Azure)

Infrastructure is provisioned with Terraform (`/terraform`) and deployed into Azure using shared modules:

- **Azure Container Apps** – Hosts the `cocktails-web` SPA with automatic scaling and HTTPS ingress.
- **Azure Container Apps Environment** – Shared runtime for the web frontend and observability services (e.g., OpenTelemetry collector).
- **Azure Container Registry** – Stores container images published from CI/CD before deployment.
- **Azure API Management** – Fronts the cocktails API; subscription keys are injected into the app via Key Vault secrets.
- **Azure Key Vault** – Manages application secrets (recaptcha keys, API subscription keys, Cypress test credentials).
- **Azure DNS Zone (cezzis.com)** – Provides apex/subdomain records, Google site verification, and Zoho Mail MX entries.
- **Custom Domains & Certificates** – Bound to the container app through Terraform-managed DNS and domain modules.
- **Shared Infrastructure Modules** – All modules are sourced from the reusable Terraform modules repo under `mtnvencenzo` for consistency.

## 🛠️ Technology Stack

### Core Framework
- **Framework**: React 19 with TypeScript
- **UI Library**: Material-UI (MUI) v7 plus the custom `@mtnvencenzo/kelso-component-library`
- **State Management**: React Hooks and Context API
- **Routing**: React Router v7
- **Build Tool**: Vite v7
- **Package Manager**: Yarn

### UI Components
- **Component Library**: Material-UI (MUI) and Kelso component library
- **Icons**: Material Icons
- **Markdown**: React Markdown with rehype-raw
- **Image Handling**: React Avatar Editor and React Image File Resizer
- **Infinite Scroll**: React Infinite Scroll Component
- **Notifications**: React Toastify
- **Tooltips**: React Tooltip
- **Country Selection**: Countries List

### Authentication & Security
- **Authentication**: Auth0 SPA SDK with a custom Auth0 provider wrapper
- **reCAPTCHA**: Form protection
- **Cookie Management**: Cookiebot integration
- **Telemetry**: OpenTelemetry traces and logs exported via OTLP

### Testing
- **Unit Testing**: Vitest with React Testing Library
- **E2E Testing**: Cypress
- **Test Coverage**: Istanbul
- **Mock Service Worker**: API mocking
- **Auth Testing Utilities**: Auth0 React tester harness

### Development Tools
- **TypeScript**: Static type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **NSwag**: API client generation (fetch and typescript)
- **Vite Plugins**:
   - `vite-plugin-eslint`
   - `vite-tsconfig-paths`
   - `vite-plugin-mkcert` (local HTTPS)
   - `vite-plugin-compression`
   - `vite-bundle-visualizer`

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
│   ├── services/       # Business logic and API clients
│   ├── templates/      # Layout templates
│   ├── utils/          # Helpers (auth config, telemetry, cookiebot, etc.)
│   └── auth0Mocks/     # Auth0 testing utilities
├── tests/              # Vitest setup and shared test utilities
cocktails.web.e2e/      # End-to-end tests
terraform/              # terraform for the projects infrastructure
```

## 🚀 Development Setup

1. **Prerequisites**
   - Node.js 18.18 or newer
   - Yarn (Classic)
   - Optional: Docker and Docker Compose (for containerized runs)

2. **Install Dependencies**
   ```bash
   # Frontend
   cd cocktails.web
   yarn install
   
   # Cypress E2E suite
   cd ../cocktails.web.e2e
   yarn install
   ```

3. **Environment Setup**
   - Copy and customize the environment files in `cocktails.web` (for example `.env.loc`, `.env.cypress`).
   - The `env.sh` script generates `public/env-config.js` based on the selected `.env` file.

4. **Local Development**
   ```bash
   cd cocktails.web
   yarn loc           # runs env.sh .env.loc and starts Vite dev server
   ```

5. **Testing**
   ```bash
   # Unit tests
   yarn test          # run from cocktails.web
   yarn testui        # launch Vitest UI
   yarn coverage      # collect coverage

   # E2E tests
   cd ../cocktails.web.e2e
   yarn cypress open  # interactive mode
   yarn cypress run   # headless mode
   ```

   > Tip: from `cocktails.web`, run `yarn cy` to start the app with the Cypress-specific configuration when executing browser tests locally.

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

- Auth0 SPA authentication with secure token handling
- Google reCAPTCHA integration for high-risk forms
- Cookiebot-powered cookie consent management
- HTTPS-friendly local development via vite-plugin-mkcert
- Environment-driven API configuration for secure communication
- Defensive coding patterns to mitigate XSS

## 📈 Monitoring

- OpenTelemetry instrumentation for traces and logs
- OTLP exporters for backend observability pipelines
- Custom spans around key user flows and API interactions
- Client-side logging helpers for diagnosing production issues

## 🌐 Community & Support

- 🤝 **Contributing Guide** – review expectations and workflow in [CONTRIBUTING.md](./.github/CONTRIBUTING.md)  
- 🤗 **Code of Conduct** – help us keep the community welcoming by reading [CODE_OF_CONDUCT.md](./.github/CODE_OF_CONDUCT.md)  
- 🆘 **Support Guide** – find help channels in [SUPPORT.md](./.github/SUPPORT.md)  
- 🔒 **Security Policy** – report vulnerabilities responsibly via [SECURITY.md](./.github/SECURITY.md) 

## 📄 License

This project is proprietary software. All rights reserved. See the full license in [LICENSE](./LICENSE).