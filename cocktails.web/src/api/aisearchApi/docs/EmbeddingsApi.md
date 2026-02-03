# EmbeddingsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**putV1CocktailsEmbeddings**](EmbeddingsApi.md#putv1cocktailsembeddings) | **PUT** /v1/cocktails/embeddings | Embed |



## putV1CocktailsEmbeddings

> putV1CocktailsEmbeddings(X_Key, CocktailEmbeddingRq)

Embed

Performs a semantic search for cocktails based on a free text query.

### Example

```ts
import {
  Configuration,
  EmbeddingsApi,
} from '';
import type { PutV1CocktailsEmbeddingsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: auth0 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EmbeddingsApi(config);

  const body = {
    // string | The API gateway subscription key
    X_Key: X_Key_example,
    // CocktailEmbeddingRq
    CocktailEmbeddingRq: ...,
  } satisfies PutV1CocktailsEmbeddingsRequest;

  try {
    const data = await api.putV1CocktailsEmbeddings(body);
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

