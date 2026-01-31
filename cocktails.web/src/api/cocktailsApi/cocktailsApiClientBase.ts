/* tslint:disable */
/* eslint-disable */
import { getWindowEnv } from '../../utils/envConfig';
import logger from '../../services/Logger';
import { getAccessToken } from '../../utils/authConfig';

export class CocktailsApiClientBase {

    private requiredScopes: string[] = [];

    public setRequiredScopes = (scopes: string[]) => {
        this.requiredScopes = scopes;
    }

    transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        const token = this.requiredScopes && this.requiredScopes.length > 0
            ? await getAccessToken(this.requiredScopes, getWindowEnv().VITE_AUTH0_COCKTAILS_API_AUDIENCE)
            : undefined;

        options.headers = {
            ...options.headers,
            'X-Key': `${getWindowEnv().VITE_COCKTAILS_APIM_SUBSCRIPTION_KEY}`
        };

        if (token) {
            options.headers = {
                'Authorization': `Bearer ${token}`,
                ...options.headers
            };
        }

        options.credentials = 'same-origin';
        options.redirect = 'error';
        options.mode = 'cors';

        return Promise.resolve(options);
    }

    protected transformResult(_url: string, response: Response, processor: (response: Response) => any) {
        try {
            return processor(response);
        } catch (e: unknown) {
            logger.logException(undefined, e as Error);
            throw e;
        }
    }

    protected getBaseUrl(_s: string, override: string | undefined): string {
        return override && override.length > 0 ? override : `${getWindowEnv().VITE_COCKTAILS_API_URL}`;
    }
}
