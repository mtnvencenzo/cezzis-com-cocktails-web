# JobsApi

All URIs are relative to *http://localhost:7179*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**init**](JobsApi.md#init) | **POST** /job/initialize-app |  |



## init

> init(X_Key)



Initialize the application

### Example

```ts
import {
  Configuration,
  JobsApi,
} from '';
import type { InitRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobsApi();

  const body = {
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies InitRequest;

  try {
    const data = await api.init(body);
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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

