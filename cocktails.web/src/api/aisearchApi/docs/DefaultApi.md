# DefaultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**chatV1CocktailsChatGet**](DefaultApi.md#chatv1cocktailschatget) | **GET** /v1/cocktails/chat | Chat |
| [**embedV1CocktailsEmbeddingsPut**](DefaultApi.md#embedv1cocktailsembeddingsput) | **PUT** /v1/cocktails/embeddings | Embed |
| [**searchV1CocktailsSearchGet**](DefaultApi.md#searchv1cocktailssearchget) | **GET** /v1/cocktails/search | Search |



## chatV1CocktailsChatGet

> any chatV1CocktailsChatGet()

Chat

AI powered conversational search for cocktails.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ChatV1CocktailsChatGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.chatV1CocktailsChatGet();
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

**any**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


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
  const api = new DefaultApi();

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

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Embedding successful. No content returned. |  -  |
| **422** | Invalid request or embedding failed. |  -  |

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
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

