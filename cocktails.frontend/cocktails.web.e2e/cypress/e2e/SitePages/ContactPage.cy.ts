describe('Contact page', () => {
    beforeEach(() => {
        cy.cookieConsent();
    });

    it('anonymous and navigate successfully to the contact page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="footer-contact"]')
            .click()
            .then(() => {
                cy.title().should('eq', 'Contact Cezzis.com');
                cy.contains('Send us your cocktail recipe!');
            });
    });
});
