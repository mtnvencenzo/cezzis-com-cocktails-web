const showCookieBot = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (window.Cookiebot) {
        const element = document.getElementsByClassName('CookiebotWidget-logo');

        if (element && element.length > 0) {
            (element[0] as HTMLButtonElement).click();
        }
    }
};

export default showCookieBot;
