import { randomInt } from '../../support/utils';

describe('Profile center profile image', () => {
    before(() => {
        cy.cookieConsent();
        cy.login(Cypress.env('b2cUserEmail'), Cypress.env('b2cUserPassword'));
    });

    beforeEach(() => {
        cy.validateSession();
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

        let existingImgSrc;
        cy.get('[data-testid="menu-avatar"]').within(() => {
            cy.get('img')
                .invoke('attr', 'src')
                .then((src) => {
                    existingImgSrc = src;
                });
        });

        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-usersettings"]').contains('Profile & settings');
        cy.get('[data-testid="l-menu-usersettings"]').click();

        cy.get('[data-testid="p-settings-profile-image"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/account/profile-center/avatar`);

        cy.title().should('eq', 'Profile Center - Edit Avatar');
        cy.contains('Manage your Cezzis.com profile and security settings across all of your devices.');

        cy.get('[data-testid="btnChooseAccountAvatar"]').click();
        cy.get('input[type=file]').selectFile(`./cypress/fixtures/cypress${randomInt(1, 4)}.jpg`, { force: true });
        cy.wait(1000).then(() => {
            cy.get('[data-testid="btnSaveAvatar"]').click();
        });

        cy.get('[data-testid="menu-avatar"]').scrollIntoView();
        // The main avatar image visible in the app bar
        cy.get('[data-testid="menu-avatar"]').within(() => {
            cy.get('img').should('have.attr', 'src').should('include', 'https://cdn.cezzis.com');
            cy.get('img').should('have.attr', 'src').should('not.equal', existingImgSrc);
        });

        // The menu item when opening the logged in menu
        cy.get('[data-testid="menu-avatar"]').click();
        cy.get('[data-testid="l-menu-myaccount"]').within(() => {
            cy.get('img').should('have.attr', 'src').should('include', 'https://cdn.cezzis.com');
            cy.get('img').should('have.attr', 'src').should('not.equal', existingImgSrc);
        });

        // The editable avatar with camera icon
        cy.get('[data-testid="btnChooseAccountAvatar"]').within(() => {
            cy.get('img').should('have.attr', 'src').should('include', 'https://cdn.cezzis.com');
            cy.get('img').should('have.attr', 'src').should('not.equal', existingImgSrc);
        });
    });
});
