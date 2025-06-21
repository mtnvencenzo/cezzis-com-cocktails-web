export {};

declare global {
    interface Window {
        Cookiebot: {
            renew(): void;
            show(): void;
            hide(): void;
            hasConsent(category: string): boolean;
            // Add other CookieBot functions as needed
        };
    }
}
