import { randomInt } from '../../support/utils';

describe('Profile center personal details', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
    });

    it('navigates from menu user account to the personal details', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-personal-details"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
    });

    it('profile settings personal details autopopulated and saves correctly', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-usersettings"]').contains('Profile & settings');
        cy.get('[data-testid="l-menu-usersettings"]').click();
        cy.get('[data-testid="p-settings-personal-details"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="txtGivenName"]').should('have.value', 'Cypress');
        cy.get('[data-testid="txtFamilyName"]').invoke('val').should('include', 'User');
        cy.get('[data-testid="txtDisplayName"]').invoke('val').should('include', 'Cypress Dude');
        cy.get('[data-testid="txtAddress"]').invoke('val').should('include', '1234 Forgotten Ln');
        cy.get('[data-testid="txtCity"]').invoke('val').should('include', 'Any Town');
        cy.get('[data-testid="txtRegion"]').should('have.value', 'MS');
        cy.get('[data-testid="txtPostalCode"]').invoke('val').should('include', '3860');
        cy.get('[data-testid="ddlCountry"]').within(() => {
            cy.get("input[type='text']").should('have.value', 'United States');
        });

        const newFamilyName = `User${randomInt()}`;
        const newDisplayName = `Cypress Dude ${randomInt()}`;
        const newAddress = `1234 Forgotten Ln${randomInt()}`;
        const newCity = `Any Town ${randomInt()}`;
        const newPostalCode = `3860${randomInt()}`;

        cy.get('[data-testid="txtGivenName"]').clear().type(`Cypress`);
        cy.get('[data-testid="txtFamilyName"]').clear().type(newFamilyName);
        cy.get('[data-testid="txtDisplayName"]').clear().type(newDisplayName);
        cy.get('[data-testid="txtAddress"]').clear().type(newAddress);
        cy.get('[data-testid="txtCity"]').clear().type(newCity);
        cy.get('[data-testid="txtRegion"]').clear().type('MS');
        cy.get('[data-testid="txtPostalCode"]').clear().type(newPostalCode);

        cy.get('[data-testid="btnSubmitPersonalDetails"]')
            .click()
            .then(() => {
                // This ensures the update as it will render when the session is updated
                cy.get('[data-testid="l-menu-myaccount"]').contains(`Cypress ${newFamilyName}`);

                // assert
                cy.wait(1000).then(() => {
                    cy.visit('/');
                    cy.get('[data-testid="menu-avatar"]').click();
                    cy.get('[data-testid="l-menu-usersettings"]').click();
                    cy.get('[data-testid="p-settings-personal-details"]').click();
                    cy.get('[data-testid="txtGivenName"]').should('have.value', 'Cypress');
                    cy.get('[data-testid="txtFamilyName"]').should('have.value', newFamilyName);
                    cy.get('[data-testid="txtDisplayName"]').should('have.value', newDisplayName);
                    cy.get('[data-testid="txtAddress"]').should('have.value', newAddress);
                    cy.get('[data-testid="txtCity"]').should('have.value', newCity);
                    cy.get('[data-testid="txtRegion"]').should('have.value', 'MS');
                    cy.get('[data-testid="txtPostalCode"]').should('have.value', newPostalCode);
                    cy.get('[data-testid="ddlCountry"]').within(() => {
                        cy.get("input[type='text']").should('have.value', 'United States');
                    });
                });
            });
    });
});
