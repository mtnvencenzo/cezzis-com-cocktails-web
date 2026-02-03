# AccountsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getV1AccountsOwnedProfile**](AccountsApi.md#getv1accountsownedprofile) | **GET** /v1/accounts/owned/profile | Get Account Owned Profile |
| [**getV1AccountsOwnedProfileCocktailsRatings**](AccountsApi.md#getv1accountsownedprofilecocktailsratings) | **GET** /v1/accounts/owned/profile/cocktails/ratings | Get Cocktail Ratings |
| [**postV1AccountsOwnedProfile**](AccountsApi.md#postv1accountsownedprofile) | **POST** /v1/accounts/owned/profile | Login Account Owned Profile |
| [**postV1AccountsOwnedProfileCocktailsRatings**](AccountsApi.md#postv1accountsownedprofilecocktailsratings) | **POST** /v1/accounts/owned/profile/cocktails/ratings | Rate Cocktail |
| [**postV1AccountsOwnedProfileCocktailsRecommendations**](AccountsApi.md#postv1accountsownedprofilecocktailsrecommendations) | **POST** /v1/accounts/owned/profile/cocktails/recommendations | Send Cocktail Recommendation |
| [**postV1AccountsOwnedProfileImage**](AccountsApi.md#postv1accountsownedprofileimage) | **POST** /v1/accounts/owned/profile/image | Upload Profile Image |
| [**putV1AccountsOwnedProfile**](AccountsApi.md#putv1accountsownedprofile) | **PUT** /v1/accounts/owned/profile | Update Account Owned Profile |
| [**putV1AccountsOwnedProfileAccessibility**](AccountsApi.md#putv1accountsownedprofileaccessibility) | **PUT** /v1/accounts/owned/profile/accessibility | Update Account Owned Accessibility Settings |
| [**putV1AccountsOwnedProfileCocktailsFavorites**](AccountsApi.md#putv1accountsownedprofilecocktailsfavorites) | **PUT** /v1/accounts/owned/profile/cocktails/favorites | Manage Favorite Cocktails |
| [**putV1AccountsOwnedProfileEmail**](AccountsApi.md#putv1accountsownedprofileemail) | **PUT** /v1/accounts/owned/profile/email | Change Account Owned Email |
| [**putV1AccountsOwnedProfileNotifications**](AccountsApi.md#putv1accountsownedprofilenotifications) | **PUT** /v1/accounts/owned/profile/notifications | Update Account Owned Notification Settings |
| [**putV1AccountsOwnedProfilePassword**](AccountsApi.md#putv1accountsownedprofilepassword) | **PUT** /v1/accounts/owned/profile/password | Change Account Owned Password |
| [**putV1AccountsOwnedProfileUsername**](AccountsApi.md#putv1accountsownedprofileusername) | **PUT** /v1/accounts/owned/profile/username | Change Account Owned Username |



## getV1AccountsOwnedProfile

> AccountOwnedProfileRs getV1AccountsOwnedProfile(X_Key)

Get Account Owned Profile

Gets the account profile for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { GetV1AccountsOwnedProfileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
  } satisfies GetV1AccountsOwnedProfileRequest;

  try {
    const data = await api.getV1AccountsOwnedProfile(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |

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


## getV1AccountsOwnedProfileCocktailsRatings

> AccountCocktailRatingsRs getV1AccountsOwnedProfileCocktailsRatings(X_Key)

Get Cocktail Ratings

Gets the account cocktail ratings for the account profile user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { GetV1AccountsOwnedProfileCocktailsRatingsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
  } satisfies GetV1AccountsOwnedProfileCocktailsRatingsRequest;

  try {
    const data = await api.getV1AccountsOwnedProfileCocktailsRatings(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |

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


## postV1AccountsOwnedProfile

> AccountOwnedProfileRs postV1AccountsOwnedProfile(X_Key)

Login Account Owned Profile

Logs in the account profile for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PostV1AccountsOwnedProfileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
  } satisfies PostV1AccountsOwnedProfileRequest;

  try {
    const data = await api.postV1AccountsOwnedProfile(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |

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


## postV1AccountsOwnedProfileCocktailsRatings

> any postV1AccountsOwnedProfileCocktailsRatings(X_Key, RateCocktailRq)

Rate Cocktail

Rates a cocktail for the account profile user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PostV1AccountsOwnedProfileCocktailsRatingsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // RateCocktailRq
    RateCocktailRq: ...,
  } satisfies PostV1AccountsOwnedProfileCocktailsRatingsRequest;

  try {
    const data = await api.postV1AccountsOwnedProfileCocktailsRatings(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## postV1AccountsOwnedProfileCocktailsRecommendations

> any postV1AccountsOwnedProfileCocktailsRecommendations(X_Key, CocktailRecommendationRq)

Send Cocktail Recommendation

Sends a cocktail recommendation for review

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PostV1AccountsOwnedProfileCocktailsRecommendationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // CocktailRecommendationRq
    CocktailRecommendationRq: ...,
  } satisfies PostV1AccountsOwnedProfileCocktailsRecommendationsRequest;

  try {
    const data = await api.postV1AccountsOwnedProfileCocktailsRecommendations(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## postV1AccountsOwnedProfileImage

> any postV1AccountsOwnedProfileImage(X_Key, file)

Upload Profile Image

Uploads an account profile image for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PostV1AccountsOwnedProfileImageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // Blob | The profile image file to upload
    file: BINARY_DATA_HERE,
  } satisfies PostV1AccountsOwnedProfileImageRequest;

  try {
    const data = await api.postV1AccountsOwnedProfileImage(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## putV1AccountsOwnedProfile

> AccountOwnedProfileRs putV1AccountsOwnedProfile(X_Key, UpdateAccountOwnedProfileRq)

Update Account Owned Profile

Updates the account profile for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PutV1AccountsOwnedProfileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // UpdateAccountOwnedProfileRq
    UpdateAccountOwnedProfileRq: ...,
  } satisfies PutV1AccountsOwnedProfileRequest;

  try {
    const data = await api.putV1AccountsOwnedProfile(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## putV1AccountsOwnedProfileAccessibility

> AccountOwnedProfileRs putV1AccountsOwnedProfileAccessibility(X_Key, UpdateAccountOwnedAccessibilitySettingsRq)

Update Account Owned Accessibility Settings

Updates the account profile accessibility settings for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PutV1AccountsOwnedProfileAccessibilityRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // UpdateAccountOwnedAccessibilitySettingsRq
    UpdateAccountOwnedAccessibilitySettingsRq: ...,
  } satisfies PutV1AccountsOwnedProfileAccessibilityRequest;

  try {
    const data = await api.putV1AccountsOwnedProfileAccessibility(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## putV1AccountsOwnedProfileCocktailsFavorites

> AccountOwnedProfileRs putV1AccountsOwnedProfileCocktailsFavorites(X_Key, ManageFavoriteCocktailsRq)

Manage Favorite Cocktails

Manages the account profile favorite cocktails list for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PutV1AccountsOwnedProfileCocktailsFavoritesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // ManageFavoriteCocktailsRq
    ManageFavoriteCocktailsRq: ...,
  } satisfies PutV1AccountsOwnedProfileCocktailsFavoritesRequest;

  try {
    const data = await api.putV1AccountsOwnedProfileCocktailsFavorites(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## putV1AccountsOwnedProfileEmail

> AccountOwnedProfileRs putV1AccountsOwnedProfileEmail(X_Key, ChangeAccountOwnedEmailRq)

Change Account Owned Email

Updates the account profile email address for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PutV1AccountsOwnedProfileEmailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // ChangeAccountOwnedEmailRq
    ChangeAccountOwnedEmailRq: ...,
  } satisfies PutV1AccountsOwnedProfileEmailRequest;

  try {
    const data = await api.putV1AccountsOwnedProfileEmail(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## putV1AccountsOwnedProfileNotifications

> AccountOwnedProfileRs putV1AccountsOwnedProfileNotifications(X_Key, UpdateAccountOwnedNotificationSettingsRq)

Update Account Owned Notification Settings

Updates the account profile notifications settings for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PutV1AccountsOwnedProfileNotificationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // UpdateAccountOwnedNotificationSettingsRq
    UpdateAccountOwnedNotificationSettingsRq: ...,
  } satisfies PutV1AccountsOwnedProfileNotificationsRequest;

  try {
    const data = await api.putV1AccountsOwnedProfileNotifications(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## putV1AccountsOwnedProfilePassword

> any putV1AccountsOwnedProfilePassword(X_Key, ChangeAccountOwnedPasswordRq)

Change Account Owned Password

Initiates the change password authentication flow for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PutV1AccountsOwnedProfilePasswordRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // ChangeAccountOwnedPasswordRq
    ChangeAccountOwnedPasswordRq: ...,
  } satisfies PutV1AccountsOwnedProfilePasswordRequest;

  try {
    const data = await api.putV1AccountsOwnedProfilePassword(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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


## putV1AccountsOwnedProfileUsername

> any putV1AccountsOwnedProfileUsername(X_Key, ChangeAccountOwnedUsernameRq)

Change Account Owned Username

Initiates the change username authentication flow for the user represented within the authenticated bearer token

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { PutV1AccountsOwnedProfileUsernameRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // ChangeAccountOwnedUsernameRq
    ChangeAccountOwnedUsernameRq: ...,
  } satisfies PutV1AccountsOwnedProfileUsernameRequest;

  try {
    const data = await api.putV1AccountsOwnedProfileUsername(body);
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
| **X_Key** | `string` | The API gateway subscription key | [Defaults to `undefined`] |
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

