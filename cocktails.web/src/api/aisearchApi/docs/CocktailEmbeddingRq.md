
# CocktailEmbeddingRq

Request model for embedding cocktail description chunks into the vector database.

## Properties

Name | Type
------------ | -------------
`contentChunks` | [Array&lt;CocktailDescriptionChunk&gt;](CocktailDescriptionChunk.md)
`cocktailEmbeddingModel` | [CocktailEmbeddingModel](CocktailEmbeddingModel.md)
`cocktailKeywords` | [CocktailSearchKeywords](CocktailSearchKeywords.md)

## Example

```typescript
import type { CocktailEmbeddingRq } from ''

// TODO: Update the object below with actual values
const example = {
  "contentChunks": null,
  "cocktailEmbeddingModel": null,
  "cocktailKeywords": null,
} satisfies CocktailEmbeddingRq

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailEmbeddingRq
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


