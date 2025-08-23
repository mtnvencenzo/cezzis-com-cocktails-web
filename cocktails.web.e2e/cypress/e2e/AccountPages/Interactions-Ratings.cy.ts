describe('Interactions cocktail ratings', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('b2cUserEmail'), Cypress.env('b2cUserPassword'));
    });

    it('navigates to the cocktail ratings account page', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-my-ratings"]').click();
        cy.title().should('eq', 'Account Cocktail Ratings');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/interactions/cocktail-ratings`);
    });
});
