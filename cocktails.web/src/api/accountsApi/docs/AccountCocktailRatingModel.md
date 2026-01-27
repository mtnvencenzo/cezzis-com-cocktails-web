
# AccountCocktailRatingModel

The cocktail user ratings.

## Properties

Name | Type
------------ | -------------
`oneStars` | number
`twoStars` | number
`threeStars` | number
`fourStars` | number
`fiveStars` | number
`totalStars` | number
`rating` | number
`ratingCount` | number

## Example

```typescript
import type { AccountCocktailRatingModel } from ''

// TODO: Update the object below with actual values
const example = {
  "oneStars": 5,
  "twoStars": 1,
  "threeStars": 1,
  "fourStars": 1,
  "fiveStars": 1,
  "totalStars": 1,
  "rating": 3.5,
  "ratingCount": 1,
} satisfies AccountCocktailRatingModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountCocktailRatingModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


