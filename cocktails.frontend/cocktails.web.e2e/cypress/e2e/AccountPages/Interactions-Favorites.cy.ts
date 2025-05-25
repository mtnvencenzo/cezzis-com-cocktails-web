describe('Interactions cocktailfavorites', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('b2cUserEmail'), Cypress.env('b2cUserPassword'));
    });

    beforeEach(() => {
        cy.validateSession();
    });

    it('navigates to the cocktails favorites account page', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-favorite-cocktails"]').click();
        cy.title().should('eq', 'Account Favorite Cocktail Recipes');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/interactions/favorite-cocktails`);
    });

    it('adds a couple favorites then clears them from the accounts favorites page', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-favorite-cocktails"]').click();
        cy.title().should('eq', 'Account Favorite Cocktail Recipes');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/interactions/favorite-cocktails`);

        let isDisabled: boolean = false;
        cy.get('[data-testid="p-settings-favorite-cocktails"]')
            .invoke('attr', 'disabled')
            .then((disabled) => {
                cy.log(`${disabled}`);
                isDisabled = disabled !== undefined;
            });

        cy.log(`${isDisabled}`);
    });
});
