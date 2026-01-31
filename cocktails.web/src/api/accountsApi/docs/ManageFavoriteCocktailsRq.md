
# ManageFavoriteCocktailsRq

The request to manage an owned account\'s favorite cocktails.

## Properties

Name | Type
------------ | -------------
`cocktailActions` | [Array&lt;CocktailFavoriteActionModel&gt;](CocktailFavoriteActionModel.md)

## Example

```typescript
import type { ManageFavoriteCocktailsRq } from ''

// TODO: Update the object below with actual values
const example = {
  "cocktailActions": null,
} satisfies ManageFavoriteCocktailsRq

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ManageFavoriteCocktailsRq
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


