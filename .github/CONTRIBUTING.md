# 🍸 Contributing to Cezzis Cocktails Web

Thank you for your interest in contributing to the Cezzis Cocktails Web project! We welcome contributions that help improve our cocktail discovery platform.

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Contributing Process](#-contributing-process)
- [Code Standards](#-code-standards)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Getting Help](#-getting-help)

## 🚀 Getting Started

### 🧰 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- Yarn (package manager)
- Docker (for containerized development)
- Git

### 🗂️ Project Structure

```
├── cocktails.web/          # React frontend application
├── cocktails.web.e2e/      # Cypress E2E tests
├── terraform/              # Infrastructure as Code
└── .github/                # GitHub workflows and templates
```

## 💻 Development Setup

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/mtnvencenzo/cezzis-com-cocktails-web.git
   cd cezzis-com-cocktails-web
   ```

2. **Install Dependencies**
   ```bash
   # Frontend dependencies
   cd cocktails.web
   yarn install
   
   # E2E test dependencies
   cd ../cocktails.web.e2e
   yarn install
   ```

3. **Start Development Server**
   ```bash
   cd cocktails.web
   
   # For local development
   yarn loc
   
   # For Cypress testing environment
   yarn cy
   ```

4. **Docker Development (Alternative)**
   ```bash
   cd cocktails.web
   docker build -f Dockerfile -t cocktails-web .
   docker run -p 3000:3000 cocktails-web
   ```

## 🔄 Contributing Process

### 1. 📝 Before You Start

- **Check for existing issues** to avoid duplicate work
- **Create or comment on an issue** to discuss your proposed changes
- **Wait for approval** from maintainers before starting work (required for this repository)

### 2. 🛠️ Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our [code standards](#-code-standards)

3. **Test your changes**
   ```bash
   # Run unit tests
   yarn test
   
   # Run tests with coverage
   yarn coverage
   
   # Run tests with UI
   yarn testui
   
   # Run E2E tests (with Cypress)
   cd ../cocktails.web.e2e
   yarn cypress run
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new cocktail search functionality"
   ```
   
   Use [conventional commit format](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

### 3. 📬 Submitting Changes

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Use our [PR template](pull_request_template.md)
   - Fill out all sections completely
   - Link related issues using `Closes #123` or `Fixes #456`
   - Request review from maintainers

## 📏 Code Standards

### 🧩 Frontend (React/TypeScript)

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code formatting is enforced via Prettier
- **File Naming**: Use PascalCase for components, camelCase for utilities
- **Testing**: Write unit tests for new components and utilities

### 🧪 Code Quality

```bash
# Lint your code
yarn lint

# Type checking (via build)
yarn build:prod

# Run tests
yarn test

# Run tests with coverage
yarn coverage

# Bundle analysis
yarn analyze
```

### 🌱 Infrastructure (Terraform)

- **Terraform**: Use Terraform best practices
- **Variables**: Define all variables in `variables.tf`
- **Documentation**: Document all resources and modules
- **State**: Never commit `.tfstate` files

## 🧪 Testing

### 🧪 Unit Tests
```bash
cd cocktails.web
yarn test          # Run tests
yarn coverage      # Run with coverage
yarn testui        # Interactive test UI
```

### 🌐 E2E Tests
```bash
cd cocktails.web.e2e
yarn cypress open  # Interactive mode
yarn cypress run   # Headless mode
```

### 📏 Test Requirements

- **Unit Tests**: All new features must include unit tests
- **E2E Tests**: Critical user flows should have E2E test coverage
- **Coverage**: Maintain minimum 80% code coverage
- **Test Naming**: Use descriptive test names that explain the behavior

## 🆘 Getting Help

### 📡 Communication Channels

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact maintainers directly for sensitive issues

### 📄 Issue Templates

Use our issue templates for:
- [Task Stories](./ISSUE_TEMPLATE/task-template.md)
- [User Stories](./ISSUE_TEMPLATE/user-story-template.md)

### ❓ Common Questions

**Q: How do I run the application locally?**
A: Follow the [Development Setup](#-development-setup) section above. Use `yarn loc` for local development.

**Q: What's the difference between `yarn loc` and `yarn cy`?**
A: `yarn loc` runs the app with local environment settings, while `yarn cy` runs it configured for Cypress testing.

**Q: Can I contribute without approval?**
A: No, all contributors must be approved by maintainers before making changes.

**Q: How do I report a security vulnerability?**
A: Please email the maintainers directly rather than creating a public issue.

## 📜 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (see [LICENSE](../LICENSE)).

---

**Happy Contributing! 🍸**

For any questions about this contributing guide, please open an issue or contact the maintainers.
