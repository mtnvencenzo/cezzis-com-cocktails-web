describe('Profile center accessibility', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('auth0UserEmail'), Cypress.env('cypressUserPassword'));
    });

    it('navigates to the accessibility account page', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-accessibility"]').click();
        cy.title().should('eq', 'Profile Center - Accessibility Settings');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/accessibility`);
    });

    it('toggle > dark mode > saves correctly', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-accessibility"]').click();
        cy.title().should('eq', 'Profile Center - Accessibility Settings');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/accessibility`);

        let isDarkModeChecked = false;
        cy.get('[data-testid="chkTheme"]').then(($parent) => {
            if ($parent.find('input[type="checkbox"]').first().prop('checked')) {
                isDarkModeChecked = true;
            }
        });

        cy.get('[data-testid="chkTheme"]').click();

        cy.get('[data-testid="btnSubmitAccessibility"]')
            .click()
            .then(() => {
                // assert
                cy.wait(3000).then(() => {
                    cy.visit('/');
                    cy.get('[data-testid="menu-avatar"]').click();
                    cy.get('[data-testid="l-menu-usersettings"]').click();
                    cy.get('[data-testid="p-settings-accessibility"]').click();

                    let savedValueChecked = false;
                    cy.get('[data-testid="chkTheme"]').then(($parent) => {
                        if ($parent.find('input[type="checkbox"]').first().prop('checked')) {
                            savedValueChecked = true;
                        }

                        expect(savedValueChecked).to.equal(!isDarkModeChecked);
                    });
                });
            });
    });
});
