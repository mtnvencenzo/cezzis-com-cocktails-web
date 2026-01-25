
# AccountOwnedProfileRs

The owned account profile response.

## Properties

Name | Type
------------ | -------------
`subjectId` | string
`loginEmail` | string
`email` | string
`givenName` | string
`familyName` | string
`avatarUri` | string
`primaryAddress` | [AccountAddressModel](AccountAddressModel.md)
`displayName` | string
`accessibility` | [AccountAccessibilitySettingsModel](AccountAccessibilitySettingsModel.md)
`favoriteCocktails` | Array&lt;string&gt;
`notifications` | [AccountNotificationSettingsModel](AccountNotificationSettingsModel.md)

## Example

```typescript
import type { AccountOwnedProfileRs } from ''

// TODO: Update the object below with actual values
const example = {
  "subjectId": 4493e636-6b1d-4t81-97b9-00d696c1g2f2,
  "loginEmail": someone@cezzis.com,
  "email": someone@cezzis.com,
  "givenName": John,
  "familyName": Doe,
  "avatarUri": https://cdn.cezzis.com/account-avatars/b4114bb7-46cf-49ab-b29a-4b20dd69c47e/e878a3b1-ea2a-433c-ba5f-f85df23f03ae.webp,
  "primaryAddress": null,
  "displayName": Jamie Johns,
  "accessibility": null,
  "favoriteCocktails": null,
  "notifications": null,
} satisfies AccountOwnedProfileRs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountOwnedProfileRs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


