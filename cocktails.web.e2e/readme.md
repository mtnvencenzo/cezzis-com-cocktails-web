# Cypress E2E Testing

This directory contains end-to-end tests for the Cezzis Cocktails web application using Cypress.

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- B2C credentials (for authentication tests)

## Installation

```bash
# Install dependencies
yarn install
```

## Running Tests

### Run All Tests
```bash
yarn cypress run --env b2cUserPassword=<your-password>
```

### Run Specific Test File
```bash
yarn cypress run --spec 'cypress/e2e/**/ProfileCenter-ProfileImage.cy.ts' --env b2cUserPassword=<your-password>
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
yarn cypress run --browser chrome --env b2cUserPassword=<your-password>

# Run tests in Firefox
yarn cypress run --browser firefox -- --env b2cUserPassword=<your-password>
```

### Run Tests in Headless Mode
```bash
yarn cypress run --headless --env b2cUserPassword=<your-password>
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
| b2cUserPassword | Password for B2C test user | Yes |
| b2cUserEmail | Email for B2C test user | Yes |
| b2cClientId | B2C client ID | Yes |
| b2cTenantId | B2C tenant ID | Yes |

## Test User Account

The tests require a specific B2C test user account with the following details:

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

This test user account should be created in your B2C tenant before running the tests. The tests will modify some of these values during execution but will maintain the basic structure.

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
yarn cypress run --env type=staging,b2cUserPassword=<your-password>
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
   - Verify B2C credentials
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