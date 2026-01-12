
# HealthCheckRs


## Properties

Name | Type
------------ | -------------
`status` | string
`version` | string
`output` | string
`details` | { [key: string]: any; }

## Example

```typescript
import type { HealthCheckRs } from ''

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "version": null,
  "output": null,
  "details": null,
} satisfies HealthCheckRs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HealthCheckRs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


