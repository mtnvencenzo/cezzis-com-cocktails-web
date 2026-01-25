# DefaultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**healthCheckV1HealthGet**](DefaultApi.md#healthcheckv1healthget) | **GET** /v1/health | Health Check |



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

