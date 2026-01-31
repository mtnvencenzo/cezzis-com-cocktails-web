
# AccountAddressModel

An owned account profile address.

## Properties

Name | Type
------------ | -------------
`addressLine1` | string
`addressLine2` | string
`city` | string
`region` | string
`subRegion` | string
`postalCode` | string
`country` | string

## Example

```typescript
import type { AccountAddressModel } from ''

// TODO: Update the object below with actual values
const example = {
  "addressLine1": 123 Anytown Ln.,
  "addressLine2": Suite #300,
  "city": Royal Oak,
  "region": MI,
  "subRegion": Oakland,
  "postalCode": 48073,
  "country": USA,
} satisfies AccountAddressModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountAddressModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


