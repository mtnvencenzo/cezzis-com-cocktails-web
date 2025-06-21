describe('Terms Of Service page', () => {
    beforeEach(() => {
        cy.cookieConsent();
    });

    it('anonymous and navigate successfully to the terms of service page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="footer-terms"]')
            .click()
            .then(() => {
                cy.title().should('eq', 'Terms Of Service - Cezzis.com');
                cy.contains('PLEASE READ THE FOLLOWING TERMS OF SERVICE AGREEMENT CAREFULLY');
                cy.contains('(see the full Privacy Policy at https://www.cezzis.com/privacy-policy)');
                cy.contains('Upon registration, you hereby acknowledge that by using');
                cy.contains('You herein acknowledge that Cezzis may set up any such practices and/or limits regarding the use of our Services');
                cy.contains('Please report any and all violations of this TOS to Cezzis as follows:');
            });
    });
});
