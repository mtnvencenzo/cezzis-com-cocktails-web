
# ProblemDetails

RFC 7807 compliant problem details model.  This model provides a standard way to carry machine-readable details of errors in HTTP response bodies.

## Properties

Name | Type
------------ | -------------
`title` | string
`status` | number
`type` | string
`detail` | string
`instance` | string
`errors` | { [key: string]: Array&lt;string&gt;; }
`extensions` | { [key: string]: any; }

## Example

```typescript
import type { ProblemDetails } from ''

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "status": null,
  "type": null,
  "detail": null,
  "instance": null,
  "errors": null,
  "extensions": null,
} satisfies ProblemDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProblemDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


