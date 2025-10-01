/* tslint:disable */
/* eslint-disable */
import { getWindowEnv } from '../../utils/envConfig';
import logger from '../../services/Logger';
import { CocktailsApiClientException, ProblemDetails, UploadProfileImageRs } from './cocktailsApiClient';
import { getAccessToken } from '../../utils/authConfig';

export class CocktailsApiClientBase {

    private requiredScopes: string[] = [];

    public setRequiredScopes = (scopes: string[]) => {
        this.requiredScopes = scopes;
    }

    transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        const token = this.requiredScopes && this.requiredScopes.length > 0
            ? await getAccessToken(this.requiredScopes)
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

    public async customUploadProfileImage(formData: FormData): Promise<UploadProfileImageRs> {
        let url_ = this.getBaseUrl("", undefined) + "/api/v1/accounts/owned/profile/image";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            body: formData,
            method: "POST",
            headers: {
                "Accept": "application/json; x-api-version=1.0"
            }
        };

        const transformedOptions_ = await this.transformOptions(options_);
        const _response = await fetch(url_, transformedOptions_);
        return this.transformResult(url_, _response, (_response_1: Response) => {
            if (_response_1.status === 201) {
                return _response_1.text().then((_responseText) => {
                    let result201: any = null;
                    result201 = _responseText === "" ? null : JSON.parse(_responseText) as UploadProfileImageRs;
                    return result201;
                });
            } else {
                return _response_1.text().then((_responseText_1) => {
                    let resultdefault: any = null;
                    resultdefault = _responseText_1 === "" ? null : JSON.parse(_responseText_1) as ProblemDetails;
                    return this.throwEx("A server side error occurred.", _response_1.status, _responseText_1, {}, resultdefault);
                });
            }
        });
    }

    private throwEx(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
        if (result !== null && result !== undefined)
            throw result;
        else
            throw new CocktailsApiClientException(message, status, response, headers, null);
    }
}
