export const setJsonLd = (ld: string) => {
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());

    const jsonLd = document.createElement('script');
    jsonLd.setAttribute('type', 'application/ld+json');
    jsonLd.textContent = ld;
    document.head.append(jsonLd);
};

export const setMetaItemProp = (content: string) => {
    document.querySelectorAll('meta[itemProp="name"]').forEach((el) => el.remove());

    const metaName = document.createElement('meta');
    metaName.setAttribute('itemProp', 'name');
    metaName.setAttribute('content', content);
    document.head.append(metaName);
};
