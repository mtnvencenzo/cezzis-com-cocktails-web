import { randomInt } from '../../support/utils';

describe('Profile center primary email', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
    });

    it('navigates from menu user account to the personal details primary email', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-email"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/change-email`);
    });

    it('profile settings primary email auto populated and saves correctly', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-usersettings"]').contains('Profile & settings');
        cy.get('[data-testid="l-menu-usersettings"]').click();

        cy.get('[data-testid="p-settings-email"]').click();
        cy.title().should('eq', 'Profile Center - Change Email');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/change-email`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="txtLoginEmail"]').should('have.value', 'rvecchi+cypress@gmail.com');
        cy.get('[data-testid="txtEmail"]')
            .invoke('val')
            .should('match', /rvecchi\+cypress\d?@gmail\.com/);

        let prevemail;
        cy.get('[data-testid="txtEmail"]')
            .invoke('val')
            .then((v) => (prevemail = v));

        let newemail = `rvecchi+cypress${randomInt()}@gmail.com`;
        while (newemail === prevemail) {
            newemail = `rvecchi+cypress${randomInt()}@gmail.com`;
        }

        cy.get('[data-testid="txtEmail"]').clear().type(newemail, { delay: 10 });
        cy.get('[data-testid="btnSubmitEmail"]').click();
        cy.wait(3000);

        cy.visit('/');
        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-usersettings"]').click();
        cy.get('[data-testid="p-settings-email"]').click();
        cy.title().should('eq', 'Profile Center - Change Email');

        cy.get('[data-testid="txtEmail"]').should('not.have.value', `${prevemail}`);
        cy.get('[data-testid="txtEmail"]').should('have.value', `${newemail}`);
    });
});
