
# AccountCocktailRatingModel

The cocktail user ratings.

## Properties

Name | Type
------------ | -------------
`one_stars` | number
`two_stars` | number
`three_stars` | number
`four_stars` | number
`five_stars` | number
`total_stars` | number
`rating` | string
`rating_count` | number

## Example

```typescript
import type { AccountCocktailRatingModel } from ''

// TODO: Update the object below with actual values
const example = {
  "one_stars": 5,
  "two_stars": 1,
  "three_stars": 1,
  "four_stars": 1,
  "five_stars": 1,
  "total_stars": 1,
  "rating": 3.5,
  "rating_count": 1,
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


