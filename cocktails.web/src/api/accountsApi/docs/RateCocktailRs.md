
# RateCocktailRs

The cocktail rating response from an account supplied cocktail rating.

## Properties

Name | Type
------------ | -------------
`ratings` | [Array&lt;AccountCocktailRatingsModel&gt;](AccountCocktailRatingsModel.md)
`cocktailId` | string
`cocktailRating` | [AccountCocktailRatingModel](AccountCocktailRatingModel.md)

## Example

```typescript
import type { RateCocktailRs } from ''

// TODO: Update the object below with actual values
const example = {
  "ratings": null,
  "cocktailId": null,
  "cocktailRating": null,
} satisfies RateCocktailRs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RateCocktailRs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


