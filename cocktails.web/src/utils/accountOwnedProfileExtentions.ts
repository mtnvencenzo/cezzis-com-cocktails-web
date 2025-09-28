import { User } from '@auth0/auth0-react';
import { AccountOwnedProfileRs } from '../api/cocktailsApi/cocktailsApiClient';

export const getOwnedAccountGivenName = (account: AccountOwnedProfileRs | undefined, user: User | undefined): string => {
    if (account) {
        return ((account.givenName ?? '') as string).trim();
    }

    if (user) {
        return getGivenName([user]);
    }

    return '';
};

export const getOwnedAccountFamilyName = (account: AccountOwnedProfileRs | undefined, user: User | undefined): string => {
    if (account) {
        return ((account.familyName ?? '') as string).trim();
    }

    if (user) {
        return getFamilyName([user]);
    }

    return '';
};

export const getOwnedAccountName = (account: AccountOwnedProfileRs | undefined, user: User | undefined): string => {
    const name = `${getOwnedAccountGivenName(account, user)} ${getOwnedAccountFamilyName(account, user)}`.trim();

    if (name.length > 0) {
        return name;
    }

    return 'New User';
};

export const getOwnedAccountInitials = (account: AccountOwnedProfileRs | undefined, user: User | undefined): string =>
    (`${getOwnedAccountGivenName(account, user)} `.substring(0, 1) + `${getOwnedAccountFamilyName(account, user)} `.substring(0, 1)).trim();

export const getSubjectId = (user: User): string | undefined => {
    if (user) {
        return user.sub;
    }

    return undefined;
};

export const getGivenName = (user: User): string => {
    if (user) {
        return ((user.given_name ?? '') as string).trim();
    }

    return '';
};

export const getFamilyName = (user: User): string => {
    if (user) {
        return ((user.family_name ?? '') as string).trim();
    }
    
    return '';
};

export const getDisplayName = (user: User): string => `${getGivenName(user)} ${getFamilyName(user)}`.trim();

export const getInitials = (user: User): string => (`${getGivenName(user)} `.substring(0, 1) + `${getFamilyName(user)} `.substring(0, 1)).trim();
