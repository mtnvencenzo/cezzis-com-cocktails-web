import { AccountOwnedProfileRs } from '../api/cocktailsApi/cocktailsApiClient';
import { getFamilyName, getGivenName, msalInstance } from './authConfig';

export const getOwnedAccountGivenName = (account: AccountOwnedProfileRs | undefined, useIdentityFallback: boolean = true): string => {
    if (account) {
        return ((account.givenName ?? '') as string).trim();
    }

    if (useIdentityFallback) {
        const activeAccount = msalInstance?.getActiveAccount();

        if (activeAccount) {
            return getGivenName([activeAccount]);
        }
    }

    return '';
};

export const getOwnedAccountFamilyName = (account: AccountOwnedProfileRs | undefined, useIdentityFallback: boolean = true): string => {
    if (account) {
        return ((account.familyName ?? '') as string).trim();
    }

    if (useIdentityFallback) {
        const activeAccount = msalInstance?.getActiveAccount();

        if (activeAccount) {
            return getFamilyName([activeAccount]);
        }
    }

    return '';
};

export const getOwnedAccountName = (account: AccountOwnedProfileRs | undefined, useIdentityFallback: boolean = true): string =>
    `${getOwnedAccountGivenName(account, useIdentityFallback)} ${getOwnedAccountFamilyName(account, useIdentityFallback)}`.trim();

export const getOwnedAccountInitials = (account: AccountOwnedProfileRs | undefined, useIdentityFallback: boolean = true): string =>
    (`${getOwnedAccountGivenName(account, useIdentityFallback)} `.substring(0, 1) + `${getOwnedAccountFamilyName(account, useIdentityFallback)} `.substring(0, 1)).trim();
