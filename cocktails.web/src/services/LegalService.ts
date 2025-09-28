import { LegalDocumentRs, CocktailsApiClient } from '../api/cocktailsApi/cocktailsApiClient';
import logger from './Logger';

const getPrivacyPolicy = async (): Promise<LegalDocumentRs | undefined> => {
    let result: LegalDocumentRs | undefined;

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        result = await cocktailsApiClient.getPrivacyPolicy(undefined);
    } catch (e: unknown) {
        logger.logException('Failed to retrieve privacy policy', e as Error);
        throw e;
    }

    return result;
};

const getTermsOfService = async (): Promise<LegalDocumentRs | undefined> => {
    let result: LegalDocumentRs | undefined;

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        result = await cocktailsApiClient.getTermsOfService(undefined);
    } catch (e: unknown) {
        logger.logException('Failed to retrieve terms of service', e as Error);
        throw e;
    }

    return result;
};

export { getPrivacyPolicy, getTermsOfService };
