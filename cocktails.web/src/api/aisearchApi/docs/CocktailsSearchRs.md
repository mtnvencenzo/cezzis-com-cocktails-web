
# CocktailsSearchRs

Model representing the response structure for a cocktail search operation, containing a list of matching cocktails.

## Properties

Name | Type
------------ | -------------
`items` | [Array&lt;CocktailSearchModel&gt;](CocktailSearchModel.md)

## Example

```typescript
import type { CocktailsSearchRs } from ''

// TODO: Update the object below with actual values
const example = {
  "items": null,
} satisfies CocktailsSearchRs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailsSearchRs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


