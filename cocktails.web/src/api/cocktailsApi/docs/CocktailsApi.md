# CocktailsApi

All URIs are relative to *http://localhost:7177*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getCocktail**](CocktailsApi.md#getcocktail) | **GET** /api/v1/cocktails/{id} |  |
| [**getCocktailIngredientFilters**](CocktailsApi.md#getcocktailingredientfilters) | **GET** /api/v1/cocktails/ingredients/filters |  |
| [**seedCocktails**](CocktailsApi.md#seedcocktails) | **PUT** /api/v1/cocktails |  |
| [**seedIngredients**](CocktailsApi.md#seedingredients) | **PUT** /api/v1/cocktails/ingredients |  |



## getCocktail

> CocktailRs getCocktail(id, X_Key)



Get a specific cocktail recipe

### Example

```ts
import {
  Configuration,
  CocktailsApi,
} from '';
import type { GetCocktailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CocktailsApi();

  const body = {
    // string | The cocktail recipe unique identifier
    id: id_example,
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies GetCocktailRequest;

  try {
    const data = await api.getCocktail(body);
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
| **id** | `string` | The cocktail recipe unique identifier | [Defaults to `undefined`] |
| **X_Key** | `string` | Subscription key | [Optional] [Defaults to `undefined`] |

### Return type

[**CocktailRs**](CocktailRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json; x-api-version=1.0`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCocktailIngredientFilters

> CocktailIngredientFiltersRs getCocktailIngredientFilters(X_Key)



Get the available cocktails filters to be used while performing a search

### Example

```ts
import {
  Configuration,
  CocktailsApi,
} from '';
import type { GetCocktailIngredientFiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CocktailsApi();

  const body = {
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies GetCocktailIngredientFiltersRequest;

  try {
    const data = await api.getCocktailIngredientFilters(body);
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
| **X_Key** | `string` | Subscription key | [Optional] [Defaults to `undefined`] |

### Return type

[**CocktailIngredientFiltersRs**](CocktailIngredientFiltersRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json; x-api-version=1.0`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## seedCocktails

> seedCocktails(X_Key)



Seeds the cocktails in the database

### Example

```ts
import {
  Configuration,
  CocktailsApi,
} from '';
import type { SeedCocktailsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CocktailsApi();

  const body = {
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies SeedCocktailsRequest;

  try {
    const data = await api.seedCocktails(body);
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
| **X_Key** | `string` | Subscription key | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json; x-api-version=1.0`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## seedIngredients

> seedIngredients(X_Key)



Seeds the ingredients in the database

### Example

```ts
import {
  Configuration,
  CocktailsApi,
} from '';
import type { SeedIngredientsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CocktailsApi();

  const body = {
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies SeedIngredientsRequest;

  try {
    const data = await api.seedIngredients(body);
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
| **X_Key** | `string` | Subscription key | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json; x-api-version=1.0`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

