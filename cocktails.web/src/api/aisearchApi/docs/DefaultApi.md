# DefaultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**embedV1CocktailsEmbeddingsPut**](DefaultApi.md#embedv1cocktailsembeddingsput) | **PUT** /v1/cocktails/embeddings | Embed |
| [**healthCheckV1HealthGet**](DefaultApi.md#healthcheckv1healthget) | **GET** /v1/health | Health Check |
| [**searchV1CocktailsSearchGet**](DefaultApi.md#searchv1cocktailssearchget) | **GET** /v1/cocktails/search | Search |



## embedV1CocktailsEmbeddingsPut

> embedV1CocktailsEmbeddingsPut(CocktailEmbeddingRq)

Embed

Performs a semantic search for cocktails based on a free text query.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { EmbedV1CocktailsEmbeddingsPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: auth0 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // CocktailEmbeddingRq
    CocktailEmbeddingRq: ...,
  } satisfies EmbedV1CocktailsEmbeddingsPutRequest;

  try {
    const data = await api.embedV1CocktailsEmbeddingsPut(body);
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
| **CocktailEmbeddingRq** | [CocktailEmbeddingRq](CocktailEmbeddingRq.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[auth0 accessCode](../README.md#auth0-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/problem+json`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Embedding successful. No content returned. |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## healthCheckV1HealthGet

> HealthCheckRs healthCheckV1HealthGet()

Health Check

Performs a health check of the API.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { HealthCheckV1HealthGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.healthCheckV1HealthGet();
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

[**HealthCheckRs**](HealthCheckRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful health check |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchV1CocktailsSearchGet

> CocktailsSearchRs searchV1CocktailsSearchGet(freetext, skip, take, m, m_ex, inc, fi)

Search

Performs a semantic search for cocktails based on a free text query.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { SearchV1CocktailsSearchGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // string | The free text search term to match against (optional)
    freetext: freetext_example,
    // number | The number of cocktail recipes to skip from the paged response (optional)
    skip: 56,
    // number | The number of cocktail recipes to take for pagination (optional)
    take: 56,
    // Array<string> | A list of cocktails that can be included in the list (optional)
    m: ...,
    // boolean | Whether or not the supplied matches must be exclusively returned (optional)
    m_ex: true,
    // Array<CocktailDataIncludeModel> | The list of extension objects to include for each cocktail recipe (optional)
    inc: ...,
    // Array<string> | An optional list of filters to use when quering the cocktail recipes (optional)
    fi: ...,
  } satisfies SearchV1CocktailsSearchGetRequest;

  try {
    const data = await api.searchV1CocktailsSearchGet(body);
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
| **freetext** | `string` | The free text search term to match against | [Optional] [Defaults to `undefined`] |
| **skip** | `number` | The number of cocktail recipes to skip from the paged response | [Optional] [Defaults to `undefined`] |
| **take** | `number` | The number of cocktail recipes to take for pagination | [Optional] [Defaults to `undefined`] |
| **m** | `Array<string>` | A list of cocktails that can be included in the list | [Optional] |
| **m_ex** | `boolean` | Whether or not the supplied matches must be exclusively returned | [Optional] [Defaults to `undefined`] |
| **inc** | `Array<CocktailDataIncludeModel>` | The list of extension objects to include for each cocktail recipe | [Optional] |
| **fi** | `Array<string>` | An optional list of filters to use when quering the cocktail recipes | [Optional] |

### Return type

[**CocktailsSearchRs**](CocktailsSearchRs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful search results |  -  |
| **0** | All non-success responses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

