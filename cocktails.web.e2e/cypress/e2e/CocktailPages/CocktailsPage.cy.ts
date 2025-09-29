describe('Cocktails page', () => {
    beforeEach(() => {
        cy.cookieConsent();
    });

    it('anonymous user navigates successfully to a cocktail page', () => {
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

    it('anonymous user cannot click rating icon', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').type('Penicillian');
        });

        cy.get('[data-testid="penicillin"]').click();
        cy.title().should('eq', 'Penicillin Cocktail Recipe');

        const markdown = cy.get('div[class="markdown-container"]');
        markdown.get('h1').should('contain.text', 'The Penicillin: The Whiskey Sour and a Shot of Medicine');
        markdown.get('p').should('contain.text', 'The Penicillin was developed by Sam Ross');

        markdown
            .get('img[loading="lazy"]')
            .should('have.attr', 'src')
            .then((src) => {
                expect(src).to.contain('https://');
                expect(src).to.contain('modern-penicillin-cocktail-main.webp');
            });

        cy.contains('Aw snap, login required').should('not.exist');

        cy.get('[data-testid="cocktail-rating-penicillin"]')
            .click()
            .then(() => {
                cy.contains('Aw snap, login required');
            });
    });

    it('anonymous user cannot click share icon', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').type('Penicillian');
        });

        cy.get('[data-testid="penicillin"]').click();
        cy.title().should('eq', 'Penicillin Cocktail Recipe');

        const markdown = cy.get('div[class="markdown-container"]');
        markdown.get('h1').should('contain.text', 'The Penicillin: The Whiskey Sour and a Shot of Medicine');
        markdown.get('p').should('contain.text', 'The Penicillin was developed by Sam Ross');

        markdown
            .get('img[loading="lazy"]')
            .should('have.attr', 'src')
            .then((src) => {
                expect(src).to.contain('https://');
                expect(src).to.contain('modern-penicillin-cocktail-main.webp');
            });

        cy.contains('Aw snap, login required').should('not.exist');

        cy.get('[data-testid="fav-penicillin"]')
            .click()
            .then(() => {
                cy.contains('Aw snap, login required');
            });
    });

    it('anonymous user cannot click favorites icon', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').type('Penicillian');
        });

        cy.get('[data-testid="penicillin"]').click();
        cy.title().should('eq', 'Penicillin Cocktail Recipe');

        const markdown = cy.get('div[class="markdown-container"]');
        markdown.get('h1').should('contain.text', 'The Penicillin: The Whiskey Sour and a Shot of Medicine');
        markdown.get('p').should('contain.text', 'The Penicillin was developed by Sam Ross');

        markdown
            .get('img[loading="lazy"]')
            .should('have.attr', 'src')
            .then((src) => {
                expect(src).to.contain('https://');
                expect(src).to.contain('modern-penicillin-cocktail-main.webp');
            });

        cy.contains('Aw snap, login required').should('not.exist');

        cy.get('[data-testid="shr-penicillin"]')
            .click()
            .then(() => {
                cy.contains('Aw snap, login required');
            });
    });

    it('authenticated user rates a cocktail', () => {
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
        cy.visit('/');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').type('stone fence');
        });

        cy.get('[data-testid="stone-fence"]').click();
        cy.title().should('eq', 'Stone Fence Cocktail Recipe');

        const markdown = cy.get('div[class="markdown-container"]');
        markdown.get('h1').should('contain.text', 'The Stone Fence: A Rustic American Classic');
        markdown.get('p').should('contain.text', 'The Stone Fence is a cocktail that embodies the rugged spirit of early America');

        markdown
            .get('img[loading="lazy"]')
            .should('have.attr', 'src')
            .then((src) => {
                expect(src).to.contain('https://');
                expect(src).to.contain('traditional-stone-fence-cocktail-main.webp');
            });

        cy.get('[data-testid="cocktail-rating-stone-fence"]').click();

        cy.contains('Rate the Stone Fence Cocktail Recipe');
        cy.contains("Help us spread the word about this cocktail recipe. Select your rating below and click the 'Rate Cocktail' button.");

        cy.get('[data-testid="alert-modal-confirm"]').should('be.disabled');

        cy.contains('5 Stars, One of my favorites!').click();

        cy.get('[data-testid="alert-modal-confirm"]').should('not.be.disabled');
        cy.get('[data-testid="alert-modal-confirm"]').click();

        cy.get('[data-testid="rating-indicator-5"]').should('exist');
    });

    it('authenticated user rates a cocktail but can only do it once', () => {
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
        cy.visit('/');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('sazerac');
        });

        cy.get('[data-testid="sazerac"]').click();
        cy.title().should('eq', 'Sazerac Cocktail Recipe');

        cy.get('[data-testid="cocktail-rating-sazerac"]').click();

        cy.contains('Rate the Sazerac Cocktail Recipe');

        cy.get('[data-testid="alert-modal-confirm"]').should('be.disabled');

        cy.contains("4 Stars, Yes bartender, I'll have another round.").click();

        cy.get('[data-testid="alert-modal-confirm"]').should('not.be.disabled');
        cy.get('[data-testid="alert-modal-confirm"]').click();

        cy.get('[data-testid="rating-indicator-4"]').should('exist');

        cy.get('[data-testid="cocktail-rating-sazerac"]').click();

        cy.contains('Rate the Sazerac Cocktail Recipe');

        cy.get('[data-testid="alert-modal-confirm"]').should('not.exist');

        cy.contains('Hmm, it looks like you have already rated this cocktail. Thank you for being an active contributor!').click();

        cy.get('[data-testid="alert-modal-cancel"]').click();

        cy.contains('Rate the Sazerac Cocktail Recipe').should('not.exist');
    });
});
