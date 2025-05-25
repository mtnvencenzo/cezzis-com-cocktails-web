describe.only('Cocktails list page', () => {
    beforeEach(() => {
        cy.clearAllLocalStorage();
        cy.cookieConsent();
    });

    it('navigates from footer successfully to the cocktails list page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.title().should('eq', "Cezzi's Cocktail Recipes");

        cy.get('[data-testid="footer-cocktail-list"]')
            .click()
            .then(() => {
                cy.title().should('eq', 'Complete Cocktail List');
            });
    });

    it('navigates from menu successfully to the cocktails list page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="menu-hamburger"]')
            .click()
            .then(() => {
                cy.get('[data-testid="m-menu-cocktailslist"]')
                    .click()
                    .then(() => {
                        cy.title().should('eq', 'Complete Cocktail List');
                    });
            });
    });

    it('navigates from the search page no results view successfully to the cocktails list page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.title().should('eq', "Cezzi's Cocktail Recipes");

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
        });

        // open the filters dialog and click another inclusive filter for jsut side car
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Aperol')
                    .click()
                    .then(() => {
                        cy.contains('.MuiChip-labelSmall', 'Sugar')
                            .click()
                            .then(() => {
                                // close the filters dialog
                                cy.get('[data-testid="dialog-filters-close-btn"]').click();
                            });
                    });
            });

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
        });

        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('p').first().should('contain.text', 'No matches found. Try reducing your search filters and search term');
        });

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('{enter}');
        });

        // make sure were still on the search page
        cy.title().should('eq', 'Cocktail Search');

        cy.contains('.MuiTypography-h6', "Hmmm, we didn't find anything for '' using your selected cocktail filters.");

        cy.contains('.inpage-link', 'View the complete list of cocktails here').click();

        cy.title().should('eq', 'Complete Cocktail List');
    });

    it('has correct initial count of cocktail tiles and scrolls for more', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });
        cy.title().should('eq', "Cezzi's Cocktail Recipes");

        cy.get('[data-testid="footer-cocktail-list"]').click();
        cy.title().should('eq', 'Complete Cocktail List');

        expectTileCount(10);
        expectHasTile('absinthe-frappe');

        cy.getLocalStorage('cocktails-list-request-data-group').then((item) => {
            const obj = JSON.parse(item);
            expect(Object.keys(obj.Items)[0]).eq('?skip=0&take=10&inc=searchTiles&inc=descriptiveTitle');
        });

        // get some more (infinite scroller)
        cy.window().scrollTo('bottom');

        expectTileCount(20);

        cy.getLocalStorage('cocktails-list-request-data-group').then((item) => {
            const obj = JSON.parse(item);
            expect(Object.keys(obj.Items)[1]).eq('?skip=10&take=10&inc=searchTiles&inc=descriptiveTitle');
        });
    });

    const expectHasTile = (id: string): void => {
        cy.get(`[data-testid="cocktailtile-${id}"]`)
            .first()
            .within(() => {
                cy.get('a')
                    .should('have.attr', 'href')
                    .then((src) => {
                        expect(src).to.contain(`/cocktails/${id}`);
                    });
            });
    };

    const expectTileCount = (count: number): void => {
        cy.get('.infinite-scroll-component > div').find('a').should('have.length', count);
    };
});
