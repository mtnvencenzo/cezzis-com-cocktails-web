/* tslint:disable */
/* eslint-disable */
import { Middleware, RequestContext, FetchParams, ResponseContext, ErrorContext } from './runtime';
import { getWindowEnv } from '../../utils/envConfig';
import { getAccessToken } from '../../utils/authConfig';
import logger from '../../services/Logger';
import { ProblemDetails, ProblemDetailsFromJSON } from './models';

/**
 * Creates an authentication middleware for the Accounts API.
 * This middleware adds the authorization header and API key to requests.
 * 
 * @param scopes - The OAuth scopes required for the API call
 * @returns A middleware that can be used with the OpenAPI Generator client
 */
export const createAuthMiddleware = (scopes: string[]): Middleware => {
    return {
        pre: async (context: RequestContext): Promise<FetchParams> => {
            const audience = getWindowEnv().VITE_AUTH0_ACCOUNTS_API_AUDIENCE;
            const token = scopes.length > 0 ? await getAccessToken(scopes, audience) : undefined;

            if (!token) {
                logger.logWarning(`No token retrieved for accounts API. Audience: ${audience}, Scopes: ${scopes.join(', ')}`);
            }

            const headers: Record<string, string> = {
                ...context.init.headers as Record<string, string>,
                'X-Key': getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY || '',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            return {
                url: context.url,
                init: {
                    ...context.init,
                    headers,
                    credentials: 'same-origin',
                    redirect: 'error',
                    mode: 'cors',
                },
            };
        },
        post: async (context: ResponseContext): Promise<Response | void> => {
            // Handle error responses by parsing ProblemDetails
            if (context.response.status >= 400) {
                const responseText = await context.response.clone().text();
                try {
                    const problemDetails = ProblemDetailsFromJSON(JSON.parse(responseText));
                    logger.logException(undefined, new Error(problemDetails.detail || problemDetails.title));
                    throw problemDetails;
                } catch (e) {
                    if ((e as ProblemDetails).status) {
                        throw e; // Re-throw ProblemDetails
                    }
                    // If parsing fails, throw generic error
                    throw new Error(`API error: ${context.response.status}`);
                }
            }
            return context.response;
        },
        onError: async (context: ErrorContext): Promise<Response | void> => {
            logger.logException(undefined, context.error as Error);
            return undefined;
        },
    };
};

/**
 * OAuth scopes for account operations
 */
export const AccountScopes = {
    read: 'read:owned-account',
    write: 'write:owned-account',
} as const;
