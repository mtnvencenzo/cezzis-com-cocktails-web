import { defineConfig } from 'cypress';
import fs from 'fs';

export default defineConfig({
    e2e: {
        chromeWebSecurity: false,
        baseUrl: 'https://localhost:4001',
        userAgent: 'Cypress user-agent',
        testIsolation: false,
        experimentalStudio: true,
        experimentalInteractiveRunEvents: true,
        experimentalOriginDependencies: true,
        experimentalModifyObstructiveThirdPartyCode: true,
        setupNodeEvents(on, config) {
            on('before:run', async () => {
                console.log('Cypress run started');
                console.log('Seeding test account');

                const response = await fetch(`${config.env.cocktailsApiBaseUrl}/api/v1/accounts/test/profile`, {
                    method: 'PUT',
                    headers: {
                        'X-Key': `${config.env.cypressApiKey}`
                    }
                });

                if (response.status !== 204) {
                    throw new Error(`---Failed ${response.status}, test account is not setup.  Some tests might fail.`);
                }

                console.log('---Success, test account is setup.');
            });
            on('after:spec', (_, results) => {
                if (results && results.video && results.stats.failures === 0 && fs.existsSync(results.video)) {
                    fs.unlinkSync(results.video);
                }
            });
            on('task', {
                log(message) {
                    console.log(`[LOG] ${message}`);
                    return null;
                },
                logError(message) {
                    console.error(`[ERROR] ${message}`);
                    return null;
                }
            });

            return config;
        }
    },
    env: {
        auth0Url: 'https://login.cezzis.com/',
        auth0ClientId: 'HZXyiZxjHgkQqeb6UJxmikCGYpSz5iPb',
        auth0UserObjectId: 'auth0|68d6d6b0a6ae4a44f05ec21f',
        auth0UserEmail: 'rvecchi+cypress@gmail.com',
        cypressUserPassword: '',
        cocktailsApiBaseUrl: 'https://localhost:7176',
        cypressApiKey: ''
    },
    video: true,
    trashAssetsBeforeRuns: true,
    screenshotOnRunFailure: true,
    reporter: 'mocha-multi-reporters',
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    reporterOptions: {
        configFile: 'cypress.reporter.config.json'
    }
});
