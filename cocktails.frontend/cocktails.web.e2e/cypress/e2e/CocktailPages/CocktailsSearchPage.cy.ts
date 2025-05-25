describe.only('Cocktails search page', () => {
    beforeEach(() => {
        cy.clearAllLocalStorage();
        cy.cookieConsent();
    });

    it('navigates from search box icon click successfully to the cocktails search page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.title().should('eq', "Cezzi's Cocktail Recipes");

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('p');
        });

        cy.get('[data-testid="search-iconbutton"]').click();
        cy.title().should('eq', 'Cocktail Search');
    });

    it('has correct initial count of cocktail tiles and scrolls for more', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });
        cy.title().should('eq', "Cezzi's Cocktail Recipes");

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('a');
        });

        cy.get('[data-testid="search-iconbutton"]').click();
        cy.title().should('eq', 'Cocktail Search');

        expectTileCount(10);
        expectHasTile('absinthe-frappe');

        // get some more (infinite scroller)
        cy.window().scrollTo('bottom');

        expectTileCount(20);
    });

    it('seaches using cocktail filters with previous search type ahead successfully', () => {
        // home page navigation and initial search click
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });
        cy.title().should('eq', "Cezzi's Cocktail Recipes");

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
            cy.get('input').type('ari', { delay: 300 });
            cy.get('input').type('{enter}');
        });

        cy.title().should('eq', 'Cocktail Search');
        // finished navigating to the search page with initial search text

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').should('have.value', 'ari');
        });

        expectTileCount(2);
        expectHasTile('garibaldi');
        expectHasTile('margarita');

        // open the filters dialog and click a filter
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Cointreau').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
            });

        expectTileCount(1);
        expectHasTile('margarita');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
        });

        // should contain margarita with the typed text and filter selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="margarita"]').should('contain.text', 'Margarita');
            cy.get('[data-testid="margarita"]').within(() => {
                cy.get('b').should('contain.text', 'ari');
            });
        });

        // remove a character from the text box
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('{backspace}');
        });

        // now should contain margarita and sidecar with the typed text and filter selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="margarita"]').should('contain.text', 'Margarita');
            cy.get('[data-testid="margarita"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('[data-testid="sidecar"]').should('contain.text', 'SideCar');
            cy.get('[data-testid="sidecar"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        // open the filters dialog and click another inclusive filter for jsut side car
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Sugar').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
            });

        // potentially a bug because when the search filters dialog is closed
        // is forces a screen refresh but doesn't also refresh with the currently typed in text
        cy.contains('.MuiTypography-h6', "Hmmm, we didn't find anything for 'ari' using your selected cocktail filters.");

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
            cy.get('input').type('{enter}');
        });

        // make sure were still on the search page
        cy.title().should('eq', 'Cocktail Search');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
        });

        expectTileCount(1);
        expectHasTile('sidecar');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
        });

        // now should only contain charels dickens punch and sidecar with the typed text and filters selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="sidecar"]').should('contain.text', 'SideCar');
            cy.get('[data-testid="sidecar"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        // open the filters dialog and clear the sugar filter
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Sugar').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
            });

        expectTileCount(2);
        expectHasTile('margarita');
        expectHasTile('sidecar');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
        });

        // now should contain both margarita and sidecar again with the typed text and filter selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="margarita"]').should('contain.text', 'Margarita');
            cy.get('[data-testid="margarita"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('[data-testid="sidecar"]').should('contain.text', 'SideCar');
            cy.get('[data-testid="sidecar"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        // open the filters dialog and reset all filters
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiButtonBase-root', 'Reset All Filters').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
                cy.wait(1000);
            });

        // get some more (infinite scroller)
        cy.window().scrollTo('bottom');

        expectTileCount(11);
        expectHasTile('bloody-mary');
        expectHasTile('margarita');
        expectHasTile('sidecar');
        expectHasTile('vieux-carre');

        cy.window().scrollTo('top');

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
            cy.get('input').should('have.value', 'ar');
        });

        // now should contain bloody mary and others
        cy.log('searching bloody-mary 1st time');

        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="bloody-mary"]').should('contain.text', 'Bloody Mary');
            cy.get('[data-testid="bloody-mary"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('[data-testid="boulevardier"]').should('contain.text', 'Boulevardier');
            cy.get('[data-testid="boulevardier"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });
    });

    it('loads with initial welcome page search and filters successfully', () => {
        // home page navigation and initial search click
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });
        cy.title().should('eq', "Cezzi's Cocktail Recipes");

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('ari', { delay: 300 });
        });

        // open the filters dialog and click a filter
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Cointreau').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
            });

        // navigating via typeing Enter key
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('{enter}');
        });

        cy.title().should('eq', 'Cocktail Search');
        // finished navigating to the search page with initial search text

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').should('have.value', 'ari');
            cy.get('input').focus();
        });

        // should contain margarita with the typed texxt and filter selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="margarita"]').should('contain.text', 'Margarita');
            cy.get('[data-testid="margarita"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        // remove a character from the text box
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('{backspace}');
        });

        // now should contain margarita and sidecar with the typed text and filter selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="margarita"]').should('contain.text', 'Margarita');
            cy.get('[data-testid="margarita"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('[data-testid="sidecar"]').should('contain.text', 'SideCar');
            cy.get('[data-testid="sidecar"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        // open the filters dialog and click another inclusive filter for jsut side car
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Sugar').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
            });

        // now should only contain sidecar with the typed text and filters selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="sidecar"]').should('contain.text', 'SideCar');
            cy.get('[data-testid="sidecar"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        // open the filters dialog and clear the sugar filter
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Sugar').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
            });

        // now should contain both margarita and sidecar again with the typed text and filter selected
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="margarita"]').should('contain.text', 'Margarita');
            cy.get('[data-testid="margarita"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('[data-testid="sidecar"]').should('contain.text', 'SideCar');
            cy.get('[data-testid="sidecar"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        // open the filters dialog and clear the sugar filter
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiButtonBase-root', 'Reset All Filters').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
            });

        // now should contain bloody mary and others
        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('[data-testid="bloody-mary"]').should('contain.text', 'Bloody Mary');
            cy.get('[data-testid="bloody-mary"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('[data-testid="boulevardier"]').should('contain.text', 'Boulevardier');
            cy.get('[data-testid="boulevardier"]').within(() => {
                cy.get('b').should('contain.text', 'ar');
            });
        });
    });

    it('resets filters from no resuts view to see results again and then scrolls for more', () => {
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
                        cy.contains('.MuiChip-labelSmall', 'Sugar').click();
                        cy.get('[data-testid="dialog-filters-close-btn"]').click();
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

        // open the filters dialog and clear the sugar filter
        cy.get('[data-testid="noresults-filters-reset-btn"]').click();

        expectTileCount(10);
        expectHasTile('absinthe-frappe');
        expectHasTile('clover-club');

        // get some more (infinite scroller)
        cy.window().scrollTo('bottom');

        expectTileCount(40);
        expectHasTile('corpse-reviver-no-2'); // first of next
        expectHasTile('last-word'); // last of next
    });

    const expectHasTile = (id: string): void => {
        cy.get(`[data-testid="cocktailsearchtile-${id}"]`)
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
