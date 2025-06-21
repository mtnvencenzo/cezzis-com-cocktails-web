describe('About Us page', () => {
    beforeEach(() => {
        cy.cookieConsent();
    });

    it('anonymous and navigate from footer to the about us page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="footer-about-us"]')
            .click()
            .then(() => {
                cy.title().should('eq', 'About Cezzis.com');
                cy.contains('Our aim is to provide quick access to cocktail recipes and ingredients, but we also like to provide fun insights and historical roots for cocktails and variations.');
            });
    });
});
