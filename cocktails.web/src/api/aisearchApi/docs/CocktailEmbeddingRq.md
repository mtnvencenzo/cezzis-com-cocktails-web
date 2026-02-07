
# CocktailEmbeddingRq

Request model for embedding cocktail description chunks into the vector database.

## Properties

Name | Type
------------ | -------------
`content_chunks` | [Array&lt;CocktailDescriptionChunk&gt;](CocktailDescriptionChunk.md)
`cocktail_model` | [CocktailModelInput](CocktailModelInput.md)
`cocktail_keywords` | [CocktailKeywords](CocktailKeywords.md)

## Example

```typescript
import type { CocktailEmbeddingRq } from ''

// TODO: Update the object below with actual values
const example = {
  "content_chunks": null,
  "cocktail_model": null,
  "cocktail_keywords": null,
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


