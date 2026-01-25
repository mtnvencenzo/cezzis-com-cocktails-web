
# AccountAddressModel

An owned account profile address.

## Properties

Name | Type
------------ | -------------
`address_line1` | string
`address_line2` | string
`city` | string
`region` | string
`sub_region` | string
`postal_code` | string
`country` | string

## Example

```typescript
import type { AccountAddressModel } from ''

// TODO: Update the object below with actual values
const example = {
  "address_line1": 123 Anytown Ln.,
  "address_line2": Suite #300,
  "city": Royal Oak,
  "region": MI,
  "sub_region": Oakland,
  "postal_code": 48073,
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


