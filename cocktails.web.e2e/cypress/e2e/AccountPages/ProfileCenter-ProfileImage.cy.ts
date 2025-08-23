import { randomInt } from '../../support/utils';

describe('Profile center profile image', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('b2cUserEmail'), Cypress.env('b2cUserPassword'));
    });

    it('navigates from menu user account to the personal details profile image', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').contains('Cypress User');
        cy.get('[data-testid="l-menu-myaccount"]').click();

        cy.title().should('eq', 'Profile Center - Personal Details');
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/personal-details`);
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="p-settings-profile-image"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/avatar`);
    });

    it('profile settings profile image auto populated and saves correctly', () => {
        cy.visit('/');
        cy.title().should('eq', "Cezzi's Cocktail Recipes");
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        // Store the original image source
        let existingImgSrc;
        cy.get('[data-testid="menu-avatar"]').within(() => {
            cy.get('img')
                .should('be.visible')
                .invoke('attr', 'src')
                .then((src) => {
                    existingImgSrc = src;
                });
        });

        // Navigate to profile settings
        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-usersettings"]').contains('Profile & settings');
        cy.get('[data-testid="l-menu-usersettings"]').click();

        cy.get('[data-testid="p-settings-profile-image"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/avatar`);

        cy.title().should('eq', 'Profile Center - Edit Avatar');
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        // Upload new image
        cy.get('[data-testid="btnChooseAccountAvatar"]').click();
        cy.get('input[type=file]').selectFile(`./cypress/fixtures/cypress${randomInt(1, 4)}.jpg`, { force: true });

        // Wait for image preview to be visible and loaded
        cy.get('[data-testid="btnChooseAccountAvatar"]').within(() => {
            cy.get('img')
                .should('be.visible')
                .should(($img) => {
                    expect($img[0].complete).to.be.true;
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                });
        });

        // Save the new avatar
        cy.get('[data-testid="btnSaveAvatar"]').click();

        // Wait for save operation to complete and verify the new image is loaded
        cy.get('[data-testid="menu-avatar"]').scrollIntoView();

        // Verify main avatar in app bar
        cy.get('[data-testid="menu-avatar"]').within(() => {
            cy.get('img')
                .should('be.visible')
                .should(($img) => {
                    expect($img[0].complete).to.be.true;
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                })
                .invoke('attr', 'src')
                .should('include', '/account-avatars/')
                .should('not.equal', existingImgSrc);
        });

        // Verify menu avatar
        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').within(() => {
            cy.get('img')
                .should('be.visible')
                .should(($img) => {
                    expect($img[0].complete).to.be.true;
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                })
                .invoke('attr', 'src')
                .should('include', '/account-avatars/')
                .should('not.equal', existingImgSrc);
        });

        // Verify editable avatar
        cy.get('[data-testid="btnChooseAccountAvatar"]').within(() => {
            cy.get('img')
                .should('be.visible')
                .should(($img) => {
                    expect($img[0].complete).to.be.true;
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                })
                .invoke('attr', 'src')
                .should('include', '/account-avatars/')
                .should('not.equal', existingImgSrc);
        });
    });
});
