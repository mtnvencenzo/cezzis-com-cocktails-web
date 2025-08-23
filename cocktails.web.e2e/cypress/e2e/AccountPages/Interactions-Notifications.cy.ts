describe('Interactions notifications', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('b2cUserEmail'), Cypress.env('b2cUserPassword'));
    });

    it('navigates to the notifications account page', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-notifications"]').click();
        cy.title().should('eq', 'Account Notification Settings');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/interactions/notifications`);
    });

    it('toggle > notify me when new cocktails are added > saves correctly', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-notifications"]').click();
        cy.title().should('eq', 'Account Notification Settings');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/interactions/notifications`);

        let isNotifyNewCocktailsCheck = false;
        cy.get('[data-testid="chkNotifyNewCocktails"]').then(($parent) => {
            if ($parent.find('input[type="checkbox"]').first().prop('checked')) {
                isNotifyNewCocktailsCheck = true;
            }
        });

        cy.get('[data-testid="chkNotifyNewCocktails"]').click();

        cy.get('[data-testid="btnSubmitNotifications"]')
            .click()
            .then(() => {
                // assert
                cy.wait(3000).then(() => {
                    cy.visit('/');
                    cy.get('[data-testid="menu-avatar"]').click();
                    cy.get('[data-testid="l-menu-usersettings"]').click();
                    cy.get('[data-testid="p-settings-notifications"]').click();

                    let savedValueChecked = false;
                    cy.get('[data-testid="chkNotifyNewCocktails"]').then(($parent) => {
                        if ($parent.find('input[type="checkbox"]').first().prop('checked')) {
                            savedValueChecked = true;
                        }

                        expect(savedValueChecked).to.equal(!isNotifyNewCocktailsCheck);
                    });
                });
            });
    });
});
