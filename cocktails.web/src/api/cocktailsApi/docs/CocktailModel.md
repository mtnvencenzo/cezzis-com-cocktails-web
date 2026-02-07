
# CocktailModel

The cocktail recipe model

## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`descriptiveTitle` | string
`description` | string
`content` | string
`publishedOn` | Date
`modifiedOn` | Date
`serves` | number
`prepTimeMinutes` | number
`isIba` | boolean
`mainImages` | [Array&lt;CocktailImageModel&gt;](CocktailImageModel.md)
`searchTiles` | Array&lt;any&gt;
`glassware` | [Array&lt;GlasswareTypeModel&gt;](GlasswareTypeModel.md)
`rating` | [CocktailRatingModel](CocktailRatingModel.md)
`searchableTitles` | Array&lt;string&gt;
`tags` | Array&lt;string&gt;
`ingredients` | [Array&lt;IngredientModel&gt;](IngredientModel.md)
`instructions` | [Array&lt;InstructionStepModel&gt;](InstructionStepModel.md)
`keywords` | [CocktailKeywordsModel](CocktailKeywordsModel.md)

## Example

```typescript
import type { CocktailModel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": clover-club,
  "title": Clover Club,
  "descriptiveTitle": Clover Club: A Pink-Hued Classic,
  "description": A classic pre-Prohibition cocktail made with gin, raspberry syrup, lemon juice, and egg white. Named after a Philadelphia men's club, it's a smooth, frothy, and slightly tart cocktail.,
  "content": --markdown content--,
  "publishedOn": 2024-05-24T00:00-07:00,
  "modifiedOn": 2024-05-24T00:00-07:00,
  "serves": 1,
  "prepTimeMinutes": 5,
  "isIba": true,
  "mainImages": null,
  "searchTiles": null,
  "glassware": ["coupe","cocktailGlass"],
  "rating": null,
  "searchableTitles": ["Clover Club","Clover Club: A Pink-Hued Classic"],
  "tags": ["Traditional"],
  "ingredients": null,
  "instructions": null,
  "keywords": null,
} satisfies CocktailModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


