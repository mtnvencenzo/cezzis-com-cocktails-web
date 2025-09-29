describe('Account page', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
    });

    it('login and successfully navigate from menu to the account page then logout', () => {
        cy.visit('/account');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.scrollTo(0, 0);
        cy.get('[data-testid="menu-avatar"]').should('be.visible');
        cy.get('[data-testid="menu-avatar"]').scrollIntoView();

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-usersettings"]').contains('Profile & settings');
        cy.get('[data-testid="l-menu-usersettings"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        // Now logout
        cy.scrollTo(0, 0);
        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-logout"]').contains('Logout');
        cy.get('[data-testid="l-menu-logout"]').click();

        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.scrollTo(0, 0);
        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-signin"]').contains('Signin');
        cy.get('[data-testid="l-menu-logout"]').should('not.exist');
    });
});
