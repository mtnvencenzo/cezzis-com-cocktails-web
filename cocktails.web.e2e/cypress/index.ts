/* eslint-disable @typescript-eslint/no-namespace */
export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, passord: string): Chainable<void>;
            cookieConsent(): Chainable<void>;
            validateSession(): Chainable<void>;
        }
    }
}
