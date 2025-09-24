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
                    cy.origin(Cypress.env('ciamUrl'), { args: { username, password } }, ({ username, password }) => {
                        cy.get('#email').type(username, { delay: 100 });
                        cy.get('#password').type(password, { delay: 100 });
                        cy.get('#next').click();
                    });

                    cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);

                    cy.get('[data-testid="menu-avatar"]').scrollIntoView();

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
            .invoke('getItem', `${Cypress.env('ciamUserObjectId')}-sisu-p.${Cypress.env('ciamTenantId')}-login.cezzis.com-${Cypress.env('ciamTenantId')}`)
            .should('exist');

        cy.window().its('sessionStorage').invoke('getItem', `msal.account.keys`).should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke(
                'getItem',
                `${Cypress.env('ciamUserObjectId')}-sisu-p.${Cypress.env('ciamTenantId')}-login.cezzis.com-idtoken-${Cypress.env('ciamClientId')}-sisu-p---`
            )
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke('getItem', `msal.token.keys.${Cypress.env('ciamClientId')}`)
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke('getItem', `${Cypress.env('ciamUserObjectId')}-sisu-p.${Cypress.env('ciamTenantId')}-login.cezzis.com-refreshtoken-${Cypress.env('ciamClientId')}----`)
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke('getItem', `msal.${Cypress.env('ciamClientId')}.active-account-filters`)
            .should('exist');

        cy.window()
            .its('sessionStorage')
            .invoke(
                'getItem',
                `${Cypress.env('ciamUserObjectId')}-sisu-p.${Cypress.env('ciamTenantId')}-login.cezzis.com-accesstoken-${Cypress.env('ciamClientId')}-sisu-p-https://cezzis.onmicrosoft.com/cocktailsapi/account.read https://cezzis.onmicrosoft.com/cocktailsapi/account.write--`
            )
            .should('exist');

        cy.window().its('sessionStorage').invoke('getItem', `account-profile-data-group`).should('exist');
    }
});
