# SemanticSearchApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getV1CocktailsSearch**](SemanticSearchApi.md#getv1cocktailssearch) | **GET** /v1/cocktails/search | Search |
| [**getV1CocktailsTypeahead**](SemanticSearchApi.md#getv1cocktailstypeahead) | **GET** /v1/cocktails/typeahead | Typeahead |



## getV1CocktailsSearch

> CocktailsSearchRs getV1CocktailsSearch(X_Key, freetext, skip, take, m, m_ex, inc, fi)

Search

Performs a semantic search for cocktails based on a free text query.

### Example

```ts
import {
  Configuration,
  SemanticSearchApi,
} from '';
import type { GetV1CocktailsSearchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SemanticSearchApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
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
  } satisfies GetV1CocktailsSearchRequest;

  try {
    const data = await api.getV1CocktailsSearch(body);
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
| **freetext** | `string` | The free text search term to match against | [Optional] [Defaults to `undefined`] |
| **skip** | `number` | The number of cocktail recipes to skip from the paged response | [Optional] [Defaults to `0`] |
| **take** | `number` | The number of cocktail recipes to take for pagination | [Optional] [Defaults to `10`] |
| **m** | `Array<string>` | A list of cocktails that can be included in the list | [Optional] |
| **m_ex** | `boolean` | Whether or not the supplied matches must be exclusively returned | [Optional] [Defaults to `false`] |
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


## getV1CocktailsTypeahead

> CocktailsSearchRs getV1CocktailsTypeahead(X_Key, freetext, skip, take, fi)

Typeahead

Performs a typeahead search for cocktails based on a free text query.

### Example

```ts
import {
  Configuration,
  SemanticSearchApi,
} from '';
import type { GetV1CocktailsTypeaheadRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SemanticSearchApi();

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // string | The free text search term to match against (optional)
    freetext: freetext_example,
    // number | The number of cocktail recipes to skip from the paged response (optional)
    skip: 56,
    // number | The number of cocktail recipes to take for pagination (optional)
    take: 56,
    // Array<string> | An optional list of filters to use when quering the cocktail recipes (optional)
    fi: ...,
  } satisfies GetV1CocktailsTypeaheadRequest;

  try {
    const data = await api.getV1CocktailsTypeahead(body);
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
| **freetext** | `string` | The free text search term to match against | [Optional] [Defaults to `undefined`] |
| **skip** | `number` | The number of cocktail recipes to skip from the paged response | [Optional] [Defaults to `0`] |
| **take** | `number` | The number of cocktail recipes to take for pagination | [Optional] [Defaults to `10`] |
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

