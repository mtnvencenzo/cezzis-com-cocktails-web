# LegalApi

All URIs are relative to *http://localhost:7179*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getPrivacyPolicy**](LegalApi.md#getprivacypolicy) | **GET** /api/v1/legal/documents/privacy-policy |  |
| [**getTermsOfService**](LegalApi.md#gettermsofservice) | **GET** /api/v1/legal/documents/terms-of-service |  |



## getPrivacyPolicy

> LegalDocumentRs getPrivacyPolicy(X_Key)



Gets the Cezzi\&#39;s.com privacy policy

### Example

```ts
import {
  Configuration,
  LegalApi,
} from '';
import type { GetPrivacyPolicyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LegalApi();

  const body = {
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies GetPrivacyPolicyRequest;

  try {
    const data = await api.getPrivacyPolicy(body);
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

[**LegalDocumentRs**](LegalDocumentRs.md)

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


## getTermsOfService

> LegalDocumentRs getTermsOfService(X_Key)



Gets the Cezzi\&#39;s.com terms of service

### Example

```ts
import {
  Configuration,
  LegalApi,
} from '';
import type { GetTermsOfServiceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LegalApi();

  const body = {
    // string | Subscription key (optional)
    X_Key: 1234567890-0000,
  } satisfies GetTermsOfServiceRequest;

  try {
    const data = await api.getTermsOfService(body);
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

[**LegalDocumentRs**](LegalDocumentRs.md)

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

