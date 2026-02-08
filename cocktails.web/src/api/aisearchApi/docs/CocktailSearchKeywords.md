
# CocktailSearchKeywords

Keyword metadata for Qdrant payload filtering. Not returned in search responses.

## Properties

Name | Type
------------ | -------------
`keywordsBaseSpirit` | Array&lt;string&gt;
`keywordsSpiritSubtype` | Array&lt;string&gt;
`keywordsFlavorProfile` | Array&lt;string&gt;
`keywordsCocktailFamily` | Array&lt;string&gt;
`keywordsTechnique` | Array&lt;string&gt;
`keywordsStrength` | string
`keywordsTemperature` | string
`keywordsSeason` | Array&lt;string&gt;
`keywordsOccasion` | Array&lt;string&gt;
`keywordsMood` | Array&lt;string&gt;
`keywordsSearchTerms` | Array&lt;string&gt;

## Example

```typescript
import type { CocktailSearchKeywords } from ''

// TODO: Update the object below with actual values
const example = {
  "keywordsBaseSpirit": ["gin"],
  "keywordsSpiritSubtype": ["aged-rum"],
  "keywordsFlavorProfile": ["bitter"],
  "keywordsCocktailFamily": ["sour"],
  "keywordsTechnique": ["shaken"],
  "keywordsStrength": light,
  "keywordsTemperature": cold,
  "keywordsSeason": ["summer"],
  "keywordsOccasion": ["aperitif"],
  "keywordsMood": ["sophisticated"],
  "keywordsSearchTerms": ["classic"],
} satisfies CocktailSearchKeywords

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailSearchKeywords
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


