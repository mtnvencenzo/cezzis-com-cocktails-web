/// <reference types="cypress" />
import 'cypress-localstorage-commands';

Cypress.Commands.overwrite('log', (log, ...args) => {
    if (Cypress.browser.isHeadless) {
        return cy.task('log', args, { log: false }).then(() => {
            return log(...args);
        });
    } else {
        console.log(...args);
        return log(...args);
    }
});

Cypress.Commands.addAll({
    login: (username: string, password: string) => {
        cy.session(
            username,
            () => {
                cy.visit('/');

                cy.visit('/account').then(() => {
                    cy.origin(Cypress.env('b2cUrl'), { args: { username, password } }, ({ username, password }) => {
                        cy.get('#email').type(username, { delay: 100 });
                        cy.get('#password').type(password, { delay: 100 });
                        cy.get('#next').click();
                    });

                    cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);

                    cy.get('[data-testid="menu-avatar"]')
                        .click()
                        .then(() => {
                            cy.get('[data-testid="l-menu-usersettings"]').scrollIntoView();
                            cy.get('[data-testid="l-menu-usersettings"]').should('be.visible');
                            cy.get('[data-testid="l-menu-usersettings"]').click();
                            cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');
                        });
                });
            },
            {
                validate() {
                    cy.validateSession();
                },
                cacheAcrossSpecs: true
            }
        );
    },
    cookieConsent: () => {
        cy.clearCookie('CookieConsent');

        cy.visit('/');

        cy.get('[id="CybotCookiebotDialogBodyButtonAccept"]').click();
    },
    validateSession: () => {
        cy.window()
            .its('sessionStorage')
            .invoke('getItem', `${Cypress.env('b2cUserObjectId')}-b2c_1_signinsignup_policy.${Cypress.env('b2cTenantId')}-login.cezzis.com-${Cypress.env('b2cTenantId')}`)
            .should('exist');

        cy.window().its('sessionStorage').invoke('getItem', `msal.account.keys`).should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke(
                'getItem',
                `${Cypress.env('b2cUserObjectId')}-b2c_1_signinsignup_policy.${Cypress.env('b2cTenantId')}-login.cezzis.com-idtoken-${Cypress.env('b2cClientId')}-b2c_1_signinsignup_policy---`
            )
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke('getItem', `msal.token.keys.${Cypress.env('b2cClientId')}`)
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke('getItem', `${Cypress.env('b2cUserObjectId')}-b2c_1_signinsignup_policy.${Cypress.env('b2cTenantId')}-login.cezzis.com-refreshtoken-${Cypress.env('b2cClientId')}----`)
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke('getItem', `msal.${Cypress.env('b2cClientId')}.active-account-filters`)
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke(
                'getItem',
                `${Cypress.env('b2cUserObjectId')}-b2c_1_signinsignup_policy.${Cypress.env('b2cTenantId')}-login.cezzis.com-accesstoken-${Cypress.env('b2cClientId')}-b2c_1_signinsignup_policy-https://cezzis.onmicrosoft.com/cocktailsapi/account.read https://cezzis.onmicrosoft.com/cocktailsapi/account.write--`
            )
            .should('exist');

        cy.window().its('sessionStorage').invoke('getItem', `account-profile-data-group`).should('exist');
    }
});
