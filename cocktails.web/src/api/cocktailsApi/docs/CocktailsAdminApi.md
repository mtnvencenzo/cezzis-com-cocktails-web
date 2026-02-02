# CocktailsAdminApi

All URIs are relative to *http://localhost:7177*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**publishCocktails**](CocktailsAdminApi.md#publishcocktails) | **PUT** /api/v1/cocktails/admin/pub |  |



## publishCocktails

> publishCocktails(PublishCocktailsRq, X_Key)



Publishes the cocktails to an event stream

### Example

```ts
import {
  Configuration,
  CocktailsAdminApi,
} from '';
import type { PublishCocktailsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: oauth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CocktailsAdminApi(config);

  const body = {
    // PublishCocktailsRq | The request to publish cocktails to external systems
    PublishCocktailsRq: ...,
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies PublishCocktailsRequest;

  try {
    const data = await api.publishCocktails(body);
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
| **PublishCocktailsRq** | [PublishCocktailsRq](PublishCocktailsRq.md) | The request to publish cocktails to external systems | |
| **X_Key** | `string` | Subscription key | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[oauth2 accessCode](../README.md#oauth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json; x-api-version=1.0`
- **Accept**: `application/json; x-api-version=1.0`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

