
# CocktailFavoriteActionModel

A cocktail reference with management action within an owned account favorites list.

## Properties

Name | Type
------------ | -------------
`cocktailId` | string
`action` | [CocktailFavoritingActionModel](CocktailFavoritingActionModel.md)

## Example

```typescript
import type { CocktailFavoriteActionModel } from ''

// TODO: Update the object below with actual values
const example = {
  "cocktailId": null,
  "action": null,
} satisfies CocktailFavoriteActionModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailFavoriteActionModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


