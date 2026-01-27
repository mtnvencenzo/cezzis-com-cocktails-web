# AccountsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**changeAccountOwnedEmailV1AccountsOwnedProfileEmailPut**](AccountsApi.md#changeaccountownedemailv1accountsownedprofileemailput) | **PUT** /v1/accounts/owned/profile/email | Change Account Owned Email |
| [**changeAccountOwnedPasswordV1AccountsOwnedProfilePasswordPut**](AccountsApi.md#changeaccountownedpasswordv1accountsownedprofilepasswordput) | **PUT** /v1/accounts/owned/profile/password | Change Account Owned Password |
| [**changeAccountOwnedUsernameV1AccountsOwnedProfileUsernamePut**](AccountsApi.md#changeaccountownedusernamev1accountsownedprofileusernameput) | **PUT** /v1/accounts/owned/profile/username | Change Account Owned Username |
| [**getAccountOwnedProfileV1AccountsOwnedProfileGet**](AccountsApi.md#getaccountownedprofilev1accountsownedprofileget) | **GET** /v1/accounts/owned/profile | Get Account Owned Profile |
| [**getCocktailRatingsV1AccountsOwnedProfileCocktailsRatingsGet**](AccountsApi.md#getcocktailratingsv1accountsownedprofilecocktailsratingsget) | **GET** /v1/accounts/owned/profile/cocktails/ratings | Get Cocktail Ratings |
| [**loginAccountOwnedProfileV1AccountsOwnedProfilePost**](AccountsApi.md#loginaccountownedprofilev1accountsownedprofilepost) | **POST** /v1/accounts/owned/profile | Login Account Owned Profile |
| [**manageFavoriteCocktailsV1AccountsOwnedProfileCocktailsFavoritesPut**](AccountsApi.md#managefavoritecocktailsv1accountsownedprofilecocktailsfavoritesput) | **PUT** /v1/accounts/owned/profile/cocktails/favorites | Manage Favorite Cocktails |
| [**rateCocktailV1AccountsOwnedProfileCocktailsRatingsPost**](AccountsApi.md#ratecocktailv1accountsownedprofilecocktailsratingspost) | **POST** /v1/accounts/owned/profile/cocktails/ratings | Rate Cocktail |
| [**sendCocktailRecommendationV1AccountsOwnedProfileCocktailsRecommendationsPost**](AccountsApi.md#sendcocktailrecommendationv1accountsownedprofilecocktailsrecommendationspost) | **POST** /v1/accounts/owned/profile/cocktails/recommendations | Send Cocktail Recommendation |
| [**updateAccountOwnedAccessibilitySettingsV1AccountsOwnedProfileAccessibilityPut**](AccountsApi.md#updateaccountownedaccessibilitysettingsv1accountsownedprofileaccessibilityput) | **PUT** /v1/accounts/owned/profile/accessibility | Update Account Owned Accessibility Settings |
| [**updateAccountOwnedNotificationSettingsV1AccountsOwnedProfileNotificationsPut**](AccountsApi.md#updateaccountownednotificationsettingsv1accountsownedprofilenotificationsput) | **PUT** /v1/accounts/owned/profile/notifications | Update Account Owned Notification Settings |
| [**updateAccountOwnedProfileV1AccountsOwnedProfilePut**](AccountsApi.md#updateaccountownedprofilev1accountsownedprofileput) | **PUT** /v1/accounts/owned/profile | Update Account Owned Profile |
| [**uploadProfileImageV1AccountsOwnedProfileImagePost**](AccountsApi.md#uploadprofileimagev1accountsownedprofileimagepost) | **POST** /v1/accounts/owned/profile/image | Upload Profile Image |



## changeAccountOwnedEmailV1AccountsOwnedProfileEmailPut

> AccountOwnedProfileRs changeAccountOwnedEmailV1AccountsOwnedProfileEmailPut(ChangeAccountOwnedEmailRq)

Change Account Owned Email

Updates the account profile email address for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ChangeAccountOwnedEmailV1AccountsOwnedProfileEmailPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // ChangeAccountOwnedEmailRq
    ChangeAccountOwnedEmailRq: ...,
  } satisfies ChangeAccountOwnedEmailV1AccountsOwnedProfileEmailPutRequest;

  try {
    const data = await api.changeAccountOwnedEmailV1AccountsOwnedProfileEmailPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **ChangeAccountOwnedEmailRq** | [ChangeAccountOwnedEmailRq](ChangeAccountOwnedEmailRq.md) |  | |

### Return type

[**AccountOwnedProfileRs**](AccountOwnedProfileRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Account email updated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## changeAccountOwnedPasswordV1AccountsOwnedProfilePasswordPut

> any changeAccountOwnedPasswordV1AccountsOwnedProfilePasswordPut(ChangeAccountOwnedPasswordRq)

Change Account Owned Password

Initiates the change password authentication flow for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ChangeAccountOwnedPasswordV1AccountsOwnedProfilePasswordPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // ChangeAccountOwnedPasswordRq
    ChangeAccountOwnedPasswordRq: ...,
  } satisfies ChangeAccountOwnedPasswordV1AccountsOwnedProfilePasswordPutRequest;

  try {
    const data = await api.changeAccountOwnedPasswordV1AccountsOwnedProfilePasswordPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **ChangeAccountOwnedPasswordRq** | [ChangeAccountOwnedPasswordRq](ChangeAccountOwnedPasswordRq.md) |  | |

### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **204** | Password change initiated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## changeAccountOwnedUsernameV1AccountsOwnedProfileUsernamePut

> any changeAccountOwnedUsernameV1AccountsOwnedProfileUsernamePut(ChangeAccountOwnedUsernameRq)

Change Account Owned Username

Initiates the change username authentication flow for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ChangeAccountOwnedUsernameV1AccountsOwnedProfileUsernamePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // ChangeAccountOwnedUsernameRq
    ChangeAccountOwnedUsernameRq: ...,
  } satisfies ChangeAccountOwnedUsernameV1AccountsOwnedProfileUsernamePutRequest;

  try {
    const data = await api.changeAccountOwnedUsernameV1AccountsOwnedProfileUsernamePut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **ChangeAccountOwnedUsernameRq** | [ChangeAccountOwnedUsernameRq](ChangeAccountOwnedUsernameRq.md) |  | |

### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **204** | Username change initiated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAccountOwnedProfileV1AccountsOwnedProfileGet

> AccountOwnedProfileRs getAccountOwnedProfileV1AccountsOwnedProfileGet()

Get Account Owned Profile

Gets the account profile for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { GetAccountOwnedProfileV1AccountsOwnedProfileGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  try {
    const data = await api.getAccountOwnedProfileV1AccountsOwnedProfileGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AccountOwnedProfileRs**](AccountOwnedProfileRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful account profile retrieval |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCocktailRatingsV1AccountsOwnedProfileCocktailsRatingsGet

> AccountCocktailRatingsRs getCocktailRatingsV1AccountsOwnedProfileCocktailsRatingsGet()

Get Cocktail Ratings

Gets the account cocktail ratings for the account profile user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { GetCocktailRatingsV1AccountsOwnedProfileCocktailsRatingsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  try {
    const data = await api.getCocktailRatingsV1AccountsOwnedProfileCocktailsRatingsGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AccountCocktailRatingsRs**](AccountCocktailRatingsRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Cocktail ratings retrieved |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## loginAccountOwnedProfileV1AccountsOwnedProfilePost

> AccountOwnedProfileRs loginAccountOwnedProfileV1AccountsOwnedProfilePost()

Login Account Owned Profile

Logs in the account profile for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { LoginAccountOwnedProfileV1AccountsOwnedProfilePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  try {
    const data = await api.loginAccountOwnedProfileV1AccountsOwnedProfilePost();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AccountOwnedProfileRs**](AccountOwnedProfileRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Account profile retrieved |  -  |
| **201** | Account profile created |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## manageFavoriteCocktailsV1AccountsOwnedProfileCocktailsFavoritesPut

> AccountOwnedProfileRs manageFavoriteCocktailsV1AccountsOwnedProfileCocktailsFavoritesPut(ManageFavoriteCocktailsRq)

Manage Favorite Cocktails

Manages the account profile favorite cocktails list for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ManageFavoriteCocktailsV1AccountsOwnedProfileCocktailsFavoritesPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // ManageFavoriteCocktailsRq
    ManageFavoriteCocktailsRq: ...,
  } satisfies ManageFavoriteCocktailsV1AccountsOwnedProfileCocktailsFavoritesPutRequest;

  try {
    const data = await api.manageFavoriteCocktailsV1AccountsOwnedProfileCocktailsFavoritesPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **ManageFavoriteCocktailsRq** | [ManageFavoriteCocktailsRq](ManageFavoriteCocktailsRq.md) |  | |

### Return type

[**AccountOwnedProfileRs**](AccountOwnedProfileRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Favorite cocktails updated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rateCocktailV1AccountsOwnedProfileCocktailsRatingsPost

> any rateCocktailV1AccountsOwnedProfileCocktailsRatingsPost(RateCocktailRq)

Rate Cocktail

Rates a cocktail for the account profile user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { RateCocktailV1AccountsOwnedProfileCocktailsRatingsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // RateCocktailRq
    RateCocktailRq: ...,
  } satisfies RateCocktailV1AccountsOwnedProfileCocktailsRatingsPostRequest;

  try {
    const data = await api.rateCocktailV1AccountsOwnedProfileCocktailsRatingsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **RateCocktailRq** | [RateCocktailRq](RateCocktailRq.md) |  | |

### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **201** | Cocktail rated successfully |  -  |
| **409** | Cocktail already rated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## sendCocktailRecommendationV1AccountsOwnedProfileCocktailsRecommendationsPost

> any sendCocktailRecommendationV1AccountsOwnedProfileCocktailsRecommendationsPost(CocktailRecommendationRq)

Send Cocktail Recommendation

Sends a cocktail recommendation for review

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { SendCocktailRecommendationV1AccountsOwnedProfileCocktailsRecommendationsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // CocktailRecommendationRq
    CocktailRecommendationRq: ...,
  } satisfies SendCocktailRecommendationV1AccountsOwnedProfileCocktailsRecommendationsPostRequest;

  try {
    const data = await api.sendCocktailRecommendationV1AccountsOwnedProfileCocktailsRecommendationsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **CocktailRecommendationRq** | [CocktailRecommendationRq](CocktailRecommendationRq.md) |  | |

### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **202** | Recommendation accepted |  -  |
| **502** | Failed to send recommendation |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateAccountOwnedAccessibilitySettingsV1AccountsOwnedProfileAccessibilityPut

> AccountOwnedProfileRs updateAccountOwnedAccessibilitySettingsV1AccountsOwnedProfileAccessibilityPut(UpdateAccountOwnedAccessibilitySettingsRq)

Update Account Owned Accessibility Settings

Updates the account profile accessibility settings for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { UpdateAccountOwnedAccessibilitySettingsV1AccountsOwnedProfileAccessibilityPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // UpdateAccountOwnedAccessibilitySettingsRq
    UpdateAccountOwnedAccessibilitySettingsRq: ...,
  } satisfies UpdateAccountOwnedAccessibilitySettingsV1AccountsOwnedProfileAccessibilityPutRequest;

  try {
    const data = await api.updateAccountOwnedAccessibilitySettingsV1AccountsOwnedProfileAccessibilityPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **UpdateAccountOwnedAccessibilitySettingsRq** | [UpdateAccountOwnedAccessibilitySettingsRq](UpdateAccountOwnedAccessibilitySettingsRq.md) |  | |

### Return type

[**AccountOwnedProfileRs**](AccountOwnedProfileRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Accessibility settings updated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateAccountOwnedNotificationSettingsV1AccountsOwnedProfileNotificationsPut

> AccountOwnedProfileRs updateAccountOwnedNotificationSettingsV1AccountsOwnedProfileNotificationsPut(UpdateAccountOwnedNotificationSettingsRq)

Update Account Owned Notification Settings

Updates the account profile notifications settings for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { UpdateAccountOwnedNotificationSettingsV1AccountsOwnedProfileNotificationsPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // UpdateAccountOwnedNotificationSettingsRq
    UpdateAccountOwnedNotificationSettingsRq: ...,
  } satisfies UpdateAccountOwnedNotificationSettingsV1AccountsOwnedProfileNotificationsPutRequest;

  try {
    const data = await api.updateAccountOwnedNotificationSettingsV1AccountsOwnedProfileNotificationsPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **UpdateAccountOwnedNotificationSettingsRq** | [UpdateAccountOwnedNotificationSettingsRq](UpdateAccountOwnedNotificationSettingsRq.md) |  | |

### Return type

[**AccountOwnedProfileRs**](AccountOwnedProfileRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Notification settings updated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateAccountOwnedProfileV1AccountsOwnedProfilePut

> AccountOwnedProfileRs updateAccountOwnedProfileV1AccountsOwnedProfilePut(UpdateAccountOwnedProfileRq)

Update Account Owned Profile

Updates the account profile for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { UpdateAccountOwnedProfileV1AccountsOwnedProfilePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // UpdateAccountOwnedProfileRq
    UpdateAccountOwnedProfileRq: ...,
  } satisfies UpdateAccountOwnedProfileV1AccountsOwnedProfilePutRequest;

  try {
    const data = await api.updateAccountOwnedProfileV1AccountsOwnedProfilePut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **UpdateAccountOwnedProfileRq** | [UpdateAccountOwnedProfileRq](UpdateAccountOwnedProfileRq.md) |  | |

### Return type

[**AccountOwnedProfileRs**](AccountOwnedProfileRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Account profile updated |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## uploadProfileImageV1AccountsOwnedProfileImagePost

> any uploadProfileImageV1AccountsOwnedProfileImagePost(file)

Upload Profile Image

Uploads an account profile image for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { UploadProfileImageV1AccountsOwnedProfileImagePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // Blob | The profile image file to upload
    file: BINARY_DATA_HERE,
  } satisfies UploadProfileImageV1AccountsOwnedProfileImagePostRequest;

  try {
    const data = await api.uploadProfileImageV1AccountsOwnedProfileImagePost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **file** | `Blob` | The profile image file to upload | [Defaults to `undefined`] |

### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **201** | Profile image uploaded |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

