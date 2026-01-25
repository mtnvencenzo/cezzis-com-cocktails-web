
# CocktailRecommendationModel

The cocktail recommendation model.

## Properties

Name | Type
------------ | -------------
`name` | string
`ingredients` | string
`directions` | string

## Example

```typescript
import type { CocktailRecommendationModel } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Painkiller (Cezzi's Version),
  "ingredients": 3 ounces pimm's no.1,
  "directions": Pour everything into a cocktail glass and stir,
} satisfies CocktailRecommendationModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailRecommendationModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


