import { Configuration, LegalDocumentRs, LegalApi } from '../api/cocktailsApi';
import { getWindowEnv } from '../utils/envConfig';
import logger from './Logger';

const getPrivacyPolicy = async (): Promise<LegalDocumentRs | undefined> => {
    let result: LegalDocumentRs | undefined;

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_COCKTAILS_API_URL
        });

        const legalApiClient = new LegalApi(config);
        result = await legalApiClient.getPrivacyPolicy({
            X_Key: getWindowEnv().VITE_COCKTAILS_API_SUBSCRIPTION_KEY
        });
    } catch (e: unknown) {
        logger.logException('Failed to retrieve privacy policy', e as Error);
        throw e;
    }

    return result;
};

const getTermsOfService = async (): Promise<LegalDocumentRs | undefined> => {
    let result: LegalDocumentRs | undefined;

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_COCKTAILS_API_URL
        });

        const legalApiClient = new LegalApi(config);
        result = await legalApiClient.getTermsOfService({
            X_Key: getWindowEnv().VITE_COCKTAILS_API_SUBSCRIPTION_KEY
        });
    } catch (e: unknown) {
        logger.logException('Failed to retrieve terms of service', e as Error);
        throw e;
    }

    return result;
};

export { getPrivacyPolicy, getTermsOfService };
