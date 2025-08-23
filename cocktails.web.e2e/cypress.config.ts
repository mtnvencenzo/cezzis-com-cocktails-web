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
        setupNodeEvents(on) {
            on('before:run', async () => {
                console.log('Cypress run started');
                console.log('Seeding test account');
                const response = await fetch('https://localhost:7176/api/v1/accounts/test/profile', {
                    method: 'PUT'
                });

                if (response.status !== 204) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }

                console.log('API call successful. Test environment is set up.');
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
        }
    },
    env: {
        b2cUrl: 'https://login.cezzis.com/',
        b2cTenantId: 'fb512a9c-5b44-41ab-8042-6465769f16c9',
        b2cClientId: '84744194-da27-410f-ae0e-74f5589d4c96',
        b2cUserObjectId: '41598664-1466-4e3e-b28c-dfe9837e462e',
        b2cUserEmail: 'rvecchi+cypress@gmail.com',
        b2cUserPassword: '---'
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
