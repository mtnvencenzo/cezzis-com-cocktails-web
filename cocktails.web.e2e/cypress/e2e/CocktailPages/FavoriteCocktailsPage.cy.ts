describe('Favorite Cocktails Page', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
    });

    it('navigates to the favorite cocktails page', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-hamburger"]')
            .click()
            .then(() => {
                cy.get('[data-testid="l-menu-myfavorites"]')
                    .click()
                    .then(() => {
                        cy.title().should('eq', 'My Favorite Cocktails');
                    });
            });
    });

    it('favorites a cocktail and views it in the favorite cocktails page then removes it', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-hamburger"]').scrollIntoView();
        cy.get('[data-testid="menu-hamburger"]')
            .click()
            .then(() => {
                cy.get('[data-testid="m-menu-cocktailslist"]')
                    .click()
                    .then(() => {
                        cy.title().should('eq', 'Complete Cocktail List');
                    });
            });

        let isAlreadyFav = false;
        cy.get('[data-testid="fav-aviation"]').then(($el) => {
            if ($el.css('color') === 'rgb(191, 46, 46)') {
                isAlreadyFav = true;
            }
        });

        if (!isAlreadyFav) {
            cy.get('[data-testid="fav-aviation"]').click();
        }

        // need to give time for account to be refreshed
        cy.wait(3000);

        cy.get('[data-testid="menu-hamburger"]').scrollIntoView();
        cy.get('[data-testid="menu-hamburger"]')
            .click()
            .then(() => {
                cy.get('[data-testid="l-menu-myfavorites"]')
                    .click()
                    .then(() => {
                        cy.title().should('eq', 'My Favorite Cocktails');
                        cy.get('[data-testid="cocktailtile-aviation"]').should('exist');
                        cy.get('[data-testid="fav-aviation"]').should('have.css', 'color', 'rgb(191, 46, 46)');
                        cy.get('[data-testid="fav-aviation"]').click();
                        cy.get('[data-testid="cocktailtile-aviation"]').should('not.exist');
                    });
            });
    });
});
