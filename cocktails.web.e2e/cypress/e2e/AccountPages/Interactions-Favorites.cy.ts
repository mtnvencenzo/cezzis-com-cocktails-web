describe('Interactions cocktailfavorites', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
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

    it('adds and removes a favorite', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').type('Pegu Club');
        });

        cy.get('[data-testid="pegu-club"]').click();
        cy.title().should('eq', 'Pegu Club Cocktail Recipe');

        cy.get('[data-testid="fav-pegu-club"]')
            .click()
            .then(() => {
                cy.wait(3000);
                cy.get('[data-testid="fav-pegu-club"]').should('have.css', 'color', 'rgb(191, 46, 46)');
            });

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-favorite-cocktails"]').click();
        cy.title().should('eq', 'Account Favorite Cocktail Recipes');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/interactions/favorite-cocktails`);

        cy.get('[data-testid="cocktailtile-pegu-club"]').should('exist');
        cy.get('[data-testid="fav-pegu-club"]').should('have.css', 'color', 'rgb(191, 46, 46)');

        cy.get('[data-testid="fav-pegu-club"]')
            .click()
            .then(() => {
                cy.get('[data-testid="cocktailtile-pegu-club"]').should('not.exist');
            });
    });

    it('adds and clears all favorites', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').type('bijou');
        });

        cy.get('[data-testid="bijou"]').click();
        cy.title().should('eq', 'Bijou Cocktail Recipe');

        cy.get('[data-testid="fav-bijou"]')
            .click()
            .then(() => {
                cy.wait(3000);
                cy.get('[data-testid="fav-bijou"]').should('have.css', 'color', 'rgb(191, 46, 46)');
            });

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-favorite-cocktails"]').click();
        cy.title().should('eq', 'Account Favorite Cocktail Recipes');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/interactions/favorite-cocktails`);

        cy.get('[data-testid="cocktailtile-bijou"]').should('exist');
        cy.get('[data-testid="fav-bijou"]').should('have.css', 'color', 'rgb(191, 46, 46)');

        cy.get('[data-testid="btnClearCocktailFavorites"]')
            .click()
            .then(() => {
                cy.contains('Clear your cocktail favorites?');
                cy.get('[data-testid="alert-modal-confirm"]')
                    .click()
                    .then(() => {
                        cy.contains("Hmmm, you don't appear to have any selected cocktail favorites.");
                        cy.get('[data-testid="cocktailtile-bijou"]').should('not.exist');
                    });
            });
    });
});
