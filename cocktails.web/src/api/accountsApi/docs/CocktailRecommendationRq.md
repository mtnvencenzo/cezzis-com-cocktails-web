
# CocktailRecommendationRq

The cocktail recommendation request.

## Properties

Name | Type
------------ | -------------
`recommendation` | [CocktailRecommendationModel](CocktailRecommendationModel.md)
`verificationCode` | string

## Example

```typescript
import type { CocktailRecommendationRq } from ''

// TODO: Update the object below with actual values
const example = {
  "recommendation": null,
  "verificationCode": 03AFcWeA4HedFMVgSEGAfbZXZdbLu0RXp,
} satisfies CocktailRecommendationRq

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailRecommendationRq
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


