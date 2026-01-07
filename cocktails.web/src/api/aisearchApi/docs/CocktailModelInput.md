
# CocktailModelInput


## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`descriptiveTitle` | string
`rating` | number
`ingredients` | [Array&lt;IngredientModel&gt;](IngredientModel.md)
`isIba` | boolean
`serves` | number
`prepTimeMinutes` | number
`searchTiles` | Array&lt;string&gt;
`glassware` | [Array&lt;GlasswareTypeModel&gt;](GlasswareTypeModel.md)
`search_statistics` | [CocktailSearchStatistics](CocktailSearchStatistics.md)

## Example

```typescript
import type { CocktailModelInput } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "title": null,
  "descriptiveTitle": null,
  "rating": null,
  "ingredients": null,
  "isIba": null,
  "serves": null,
  "prepTimeMinutes": null,
  "searchTiles": null,
  "glassware": null,
  "search_statistics": null,
} satisfies CocktailModelInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailModelInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


