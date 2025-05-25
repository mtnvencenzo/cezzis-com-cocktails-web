describe('Contact page', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('b2cUserEmail'), Cypress.env('b2cUserPassword'));
    });

    beforeEach(() => {
        cy.validateSession();
    });

    it('logs in and fills in cocktail recommendation form and sends it', () => {
        cy.visit('/');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="footer-contact"]')
            .click()
            .then(() => {
                cy.title().should('eq', 'Contact Cezzis.com');
                cy.contains('Send us your cocktail recipe!');
                cy.get('[data-testid="btnSubmitRecommendation"]').should('be.disabled');

                cy.get('[data-testid="txtCocktailName"]').type('Cypress Test Cocktail');
                cy.get('[data-testid="btnSubmitRecommendation"]').should('be.disabled');

                cy.get('[data-testid="txtCocktailIngredients"]').type('Cypress Test Cocktail - Ingredients');
                cy.get('[data-testid="btnSubmitRecommendation"]').should('be.disabled');

                cy.get('[data-testid="txtCocktailDirections"]').type('Cypress Test Cocktail - Directions');
                cy.get('[data-testid="btnSubmitRecommendation"]').should('not.be.disabled');

                cy.get('[data-testid="btnSubmitRecommendation"]', { timeout: 20000 }).click();
                cy.get('[data-testid="txtCocktailName"]').should('not.have.value', '');
            });
    });
});
