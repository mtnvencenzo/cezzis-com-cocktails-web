# Cypress E2E Testing

This directory contains end-to-end tests for the Cezzis Cocktails web application using Cypress.

## Prerequisites

- Node.js v18 or higher (matches the main app requirement)
- Yarn (Classic)
- Access to the Auth0 tenant and test user credentials used by the project
- Cocktails web app running locally at `https://localhost:4002` (use `yarn cy` from `cocktails.web`)
- Cocktails API running locally at `https://localhost:7178` (required for test account seeding)

## Installation

```bash
# Install dependencies
yarn install
```

## Running Tests

### Run All Tests
```bash
yarn cypress run --env cypressUserPassword=<your-password>,cypressApiKey=<your-api-key>
```

### Run Specific Test File
```bash
yarn cypress run --spec 'cypress/e2e/**/ProfileCenter-ProfileImage.cy.ts' --env cypressUserPassword=<your-password>,cypressApiKey=<your-api-key>
```

### Run Tests in Interactive Mode
```bash
# Open Cypress Test Runner
yarn cypress open

# Run specific test in interactive mode
yarn cypress open --spec 'cypress/e2e/**/ProfileCenter-ProfileImage.cy.ts'
```

### Run Tests with Specific Browser
```bash
# Run tests in Chrome
yarn cypress run --browser chrome --env cypressUserPassword=<your-password>,cypressApiKey=<your-api-key>

# Run tests in Firefox
yarn cypress run --browser firefox --env cypressUserPassword=<your-password>,cypressApiKey=<your-api-key>
```

### Run Tests in Headless Mode
```bash
yarn cypress run --headless --env cypressUserPassword=<your-password>,cypressApiKey=<your-api-key>
```

## Test Reports

Test reports are generated in the `results` directory after each test run. The reports include:
- Screenshots of failed tests
- Videos of test runs
- Detailed test results

## Environment Variables

The following environment variables are used in the tests:

| Variable | Description | Required |
|----------|-------------|----------|
| cypressUserPassword | Password for the Auth0 test user | Yes |
| auth0UserEmail | Email for the Auth0 test user | Yes |
| auth0ClientId | Auth0 SPA client ID | Yes |
| cocktailsApiBaseUrl | Base URL for the cocktails API used during tests | Yes (defaults to `https://localhost:7178` if not overridden) |
| cypressApiKey | API key used to seed/reset the test account before runs | Yes |

You can provide these values by:

- Passing them inline via the `--env` flag (for example: `yarn cypress run --env cypressUserPassword=...,cypressApiKey=...`)
- Creating a `cypress.env.json` file in this directory with the required keys
- Defining environment variables in your CI pipeline configuration

## Test User Account

The tests require a specific CIAM test user account with the following details:

| Field | Value |
|-------|-------|
| Given Name | Cypress |
| Family Name | User |
| Display Name | Cypress Dude |
| Address | 1234 Forgotten Ln |
| City | Any Town |
| Region | MS |
| Postal Code | 3860 |
| Country | United States |

This test user account is automatically seeded when cypress runs.

## Useful Cypress Commands

### Debugging
```bash
# Show Cypress debug logs
DEBUG=cypress:* yarn cypress run

# Run tests with verbose logging
yarn cypress run --config-file cypress.config.ts --config video=true,trashAssetsBeforeRuns=true
```

### Test Maintenance
```bash
# Lint the test suite
yarn lint

# Clear Cypress cache
yarn cypress cache clear

# Verify Cypress installation
yarn cypress verify
```

### CI/CD Integration
```bash
# Run tests with specific configuration
yarn cypress run --config-file cypress.config.ts --config video=true,trashAssetsBeforeRuns=true

# Run tests with specific environment
yarn cypress run --env type=staging,cypressUserPassword=<your-password>,cypressApiKey=<your-api-key>
```

## Best Practices

1. **Test Organization**
   - Keep test files organized by feature/functionality
   - Use descriptive test names
   - Group related tests using `describe` blocks

2. **Test Data**
   - Use fixtures for test data
   - Clean up test data after tests
   - Use unique identifiers for test data

3. **Assertions**
   - Use specific assertions
   - Chain assertions when possible
   - Handle asynchronous operations properly

4. **Debugging**
   - Use `cy.pause()` for debugging
   - Take screenshots on failure
   - Use `cy.log()` for debugging information

## Troubleshooting

### Common Issues

1. **Test Timeouts**
   - Increase `defaultCommandTimeout` in `cypress.config.ts`
   - Check for slow network requests
   - Verify element selectors

2. **Authentication Issues**
   - Verify CIAM credentials
   - Check token expiration
   - Clear browser cache

3. **Element Not Found**
   - Verify element selectors
   - Check for dynamic content
   - Use proper waiting strategies

## Contributing

1. Follow the existing test structure
2. Add appropriate comments
3. Update this documentation when adding new features
4. Ensure all tests pass before submitting PR

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)