describe('Privacy Policy page', () => {
    beforeEach(() => {
        cy.cookieConsent();
    });

    it('anonymous and navigate successfully to the privacy policy page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="footer-privacy"]')
            .click()
            .then(() => {
                cy.title().should('eq', 'Privacy Policy - Cezzis.com');
                cy.contains("Cezzis (Cezzis) values its users' privacy");
                cy.contains('Cezzis takes precautions to protect your information. When you submit sensitive information');
                cy.contains('If you answered "yes" to the question Does your website comply with the General Data Protection Regulation ("GDPR")?');
                cy.contains('This Privacy Policy presumes that your website is not directed at children under the age of 13 and does not');
            });
    });
});
