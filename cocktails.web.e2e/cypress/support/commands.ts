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
                    cy.origin(Cypress.env('auth0Url'), { args: { username, password } }, ({ username, password }) => {
                        cy.get('#username').type(username, { delay: 100 });
                        cy.get('#password').type(password, { delay: 100 });
                        cy.get('button[name="action"]').click();
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
            .invoke('getItem', `@@auth0spajs@@::${Cypress.env('auth0ClientId')}::@@user@@`)
            .should('exist');

        cy.window().its('sessionStorage').invoke('getItem', `@@auth0spajs@@::{Cypress.env('auth0ClientId')}::default::openid offline_access profile email`).should('exist');

        cy.window().its('sessionStorage').invoke('getItem', `account-profile-data-group`).should('exist');
    }
});
