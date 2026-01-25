
# UpdateAccountOwnedProfileRq

The account owned profile upload request information.

## Properties

Name | Type
------------ | -------------
`given_name` | string
`family_name` | string
`display_name` | string
`primary_address` | [AccountAddressModel](AccountAddressModel.md)

## Example

```typescript
import type { UpdateAccountOwnedProfileRq } from ''

// TODO: Update the object below with actual values
const example = {
  "given_name": John,
  "family_name": Doe,
  "display_name": Jamie Johns,
  "primary_address": null,
} satisfies UpdateAccountOwnedProfileRq

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateAccountOwnedProfileRq
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


