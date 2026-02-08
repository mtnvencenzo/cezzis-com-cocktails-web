
# CocktailEmbeddingModel

Model representing the cocktail embedding data structure used for vector search and storage.

## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`descriptiveTitle` | string
`rating` | number
`ingredients` | [Array&lt;CocktailSearchIngredientModel&gt;](CocktailSearchIngredientModel.md)
`isIba` | boolean
`serves` | number
`prepTimeMinutes` | number
`searchTiles` | Array&lt;string&gt;
`glassware` | [Array&lt;CocktailSearchGlasswareTypeModel&gt;](CocktailSearchGlasswareTypeModel.md)

## Example

```typescript
import type { CocktailEmbeddingModel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": old-fashioned,
  "title": Old Fashioned,
  "descriptiveTitle": The Old Fashioned: A Timeless Whiskey Cocktail,
  "rating": 4.5,
  "ingredients": null,
  "isIba": true,
  "serves": 1,
  "prepTimeMinutes": 5,
  "searchTiles": http://localhost:7179/api/v1/images/old-fashioned-cocktail-300x300.webp,
  "glassware": rocks,
} satisfies CocktailEmbeddingModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailEmbeddingModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


