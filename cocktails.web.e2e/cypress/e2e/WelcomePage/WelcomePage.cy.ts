describe('Welcome page', () => {
    beforeEach(() => {
        cy.cookieConsent();
    });

    it('anonymous and navigate successfully to the welcome page', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.title().should('eq', "Cezzi's Cocktail Recipes");
    });

    it('anonymous and seaches type ahead successfully', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
            cy.get('input').focus();
            cy.get('input').type('p');
        });

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
        });

        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('a').first().should('contain.text', 'Pain Killer');
            cy.get('a')
                .first()
                .within(() => {
                    cy.get('b').should('contain.text', 'P');
                });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('a').first().should('contain.text', 'Paloma');
            cy.get('a')
                .first()
                .within(() => {
                    cy.get('b').should('contain.text', 'P');
                });
        });

        cy.get('li#global-search-box-option-2').within(() => {
            cy.get('a').first().should('contain.text', 'Pegu Club');
            cy.get('a')
                .first()
                .within(() => {
                    cy.get('b').should('contain.text', 'P');
                });
        });

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('e');
        });

        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('a').first().should('contain.text', 'Pegu Club');
            cy.get('a')
                .first()
                .within(() => {
                    cy.get('b').should('contain.text', 'Pe');
                });
        });

        cy.get('li#global-search-box-option-1').within(() => {
            cy.get('a').first().should('contain.text', 'Absinthe Frappé');
            cy.get('a')
                .first()
                .within(() => {
                    cy.get('b').should('contain.text', 'Absinthe Frappé');
                });
        });

        cy.get('li#global-search-box-option-2').within(() => {
            cy.get('a').first().should('contain.text', 'Aperol Spritz');
            cy.get('a')
                .first()
                .within(() => {
                    cy.get('b').should('contain.text', 'pe');
                });
        });

        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').type('g');
        });

        cy.get('li#global-search-box-option-0').within(() => {
            cy.get('a').first().should('contain.text', 'Pegu Club');
            cy.get('a')
                .first()
                .within(() => {
                    cy.get('b').should('contain.text', 'Peg');
                });
        });

        cy.get('li#global-search-box-option-1').should('not.exist');
    });

    it('anonymous and navigate successfully to the welcome page via footer search link', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="footer-cocktail-search"]')
            .click()
            .then(() => {
                cy.title().should('eq', "Cezzi's Cocktail Recipes");
                cy.get('[data-testid="search-box"]').within(() => {
                    cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
                });
            });
    });

    it('anonymous and navigate successfully to the welcome page via menu search link', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        cy.get('[data-testid="menu-hamburger"]')
            .click()
            .then(() => {
                cy.get('[data-testid="m-menu-cocktailssearch"]')
                    .click()
                    .then(() => {
                        cy.title().should('eq', "Cezzi's Cocktail Recipes");
                        cy.get('[data-testid="search-box"]').within(() => {
                            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
                        });
                    });
            });
    });

    it('anonymous and searches using cocktail filters with search type ahead successfully', () => {
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Search cocktails...');
        });

        // open the filters dialog and click a filter
        cy.get('[data-testid="cocktail-search-filters-icon"]')
            .click()
            .then(() => {
                cy.contains('.MuiChip-labelSmall', 'Cointreau').click();
                cy.get('[data-testid="dialog-filters-close-btn"]').click();
                cy.wait(1000);
            });

        // type in the text box
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
            cy.get('input').type('ari', { delay: 500 });
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
                cy.wait(1000);
            });

        // close the filters dialog
        cy.get('[data-testid="search-box"]').within(() => {
            cy.get('input').focus();
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
                cy.wait(1000);
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
                cy.wait(1000);
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
});
