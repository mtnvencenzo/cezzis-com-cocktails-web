describe('Cocktails page', () => {
    beforeEach(() => {
        cy.cookieConsent();
    });

    it('anonymous and navigates successfully to a cocktail page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').type('Pegu Club');
        });

        cy.get('[data-testid="pegu-club"]').click();
        cy.title().should('eq', 'Pegu Club Cocktail Recipe');

        const markdown = cy.get('div[class="markdown-container"]');
        markdown.get('h1').should('contain.text', 'The Pegu Club: A Gin-Based Tropical Escape');
        markdown
            .get('p')
            .should(
                'contain.text',
                'The Pegu Club is a gin-based cocktail that transports you to the exotic days of British colonial Burma. Named after the Pegu River, this refreshing drink was the signature libation of the Pegu Club—a social hub for senior government officials, military personnel, and prominent businessmen in Rangoon (now Yangon), Myanmar.'
            );

        markdown
            .get('img[loading="lazy"]')
            .should('have.attr', 'src')
            .then((src) => {
                expect(src).to.contain('https://');
                expect(src).to.contain('traditional-pegu-club-cocktail-main.webp');
            });

        markdown.get('img[loading="lazy"]').should('have.attr', 'alt', 'The Pegu Club: A Gin-Based Tropical Escape').should('have.attr', 'height', '100%').should('have.attr', 'width', '100%');
    });
});
