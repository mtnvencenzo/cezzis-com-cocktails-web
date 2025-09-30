import { AuthenticationError, GetTokenSilentlyVerboseResponse, User } from '@auth0/auth0-spa-js';
import { Auth0ProviderOptions } from '../components/Auth0Provider';
import { loginAuthorizationParams, onRedirectCallback } from '../utils/authConfig';

export const TEST_ACCESS_TOKEN =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRlc3Qta2V5LWlkIn0.eyJpc3MiOiJodHRwczovL3Rlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDEyMzQ1Njc4OSIsImF1ZCI6InRlc3QtY2xpZW50LWlkIiwiZXhwIjoxNjU2NjA0NzY3LCJpYXQiOjE2NTY1OTk2MjYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJ0ZXN0LWNsaWVudC1pZCIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvZSIsInBpY3R1cmUiOiJodHRwczovL2V4YW1wbGUuY29tL2pvaG4tZG9lLmpwZyIsIm5pY2tuYW1lIjoiam9obm55IiwibG9jYWxlIjoiZW4tVVMifQ.signature-would-go-here';

//
// Token parsed is equal to (Auth0 format):
//
/**

 {
  "alg": "RS256",
  "typ": "JWT",
  "kid": "test-key-id"
 }.{
  "iss": "https://test.auth0.com/",
  "sub": "auth0|123456789",
  "aud": "test-client-id",
  "exp": 1656604767,
  "iat": 1656599626,
  "scope": "openid profile email",
  "azp": "test-client-id",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "email_verified": true,
  "given_name": "John",
  "family_name": "Doe",
  "picture": "https://example.com/john-doe.jpg",
  "nickname": "johnny",
  "locale": "en-US"
}.[Signature]

 
 */

export const defaultTestUser: User = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    picture: 'https://example.com/john-doe.jpg',
    sub: 'auth0|123456789',
    updated_at: '2021-01-01T00:00:00.000Z',
    nickname: 'johnny',
    email_verified: true,
    given_name: 'John',
    family_name: 'Doe',
    locale: 'en-US'
};

export const defaultTestAuthError: AuthenticationError = {
    error: 'test-error',
    error_description: 'test-error-description',
    name: 'AuthenticationError',
    message: 'test-error-description',
    stack: '',
    state: '',
    appState: undefined
};

export const defaultTestAuthenticationResult: GetTokenSilentlyVerboseResponse = {
    access_token: TEST_ACCESS_TOKEN,
    id_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InRlc3Qta2V5LWlkIn0.eyJpc3MiOiJodHRwczovL3Rlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDEyMzQ1Njc4OSIsImF1ZCI6InRlc3QtY2xpZW50LWlkIiwiZXhwIjoxNjU2NjA0NzY3LCJpYXQiOjE2NTY1OTk2MjYsImF1dGhfdGltZSI6MTY1NjU5OTYyNiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwicGljdHVyZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20vam9obi1kb2UuanBnIiwibmlja25hbWUiOiJqb2hubnkiLCJsb2NhbGUiOiJlbi1VUyIsIm5vbmNlIjoidGVzdC1ub25jZS0xMjMifQ.signature',
    scope: 'openid profile email',
    expires_in: 3600,
    token_type: 'Bearer'
};

export const auth0TestProviderOptions: Auth0ProviderOptions = {
    domain: 'https://test-domain.auth0.com',
    clientId: 'test-client-id',
    authorizationParams: loginAuthorizationParams,
    onRedirectCallback,
    useRefreshTokens: true,
    cacheLocation: 'memory'
};
