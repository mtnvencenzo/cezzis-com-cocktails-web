
# CocktailSearchStatistics

Model representing the search statistics for a cocktail search operation, including score metrics and hit details.

## Properties

Name | Type
------------ | -------------
`totalScore` | number
`maxScore` | number
`avgScore` | number
`weightedScore` | number
`hitCount` | number
`hitResults` | [Array&lt;CocktailVectorSearchResult&gt;](CocktailVectorSearchResult.md)

## Example

```typescript
import type { CocktailSearchStatistics } from ''

// TODO: Update the object below with actual values
const example = {
  "totalScore": 3.72682033,
  "maxScore": 0.5158496,
  "avgScore": 0.4815899,
  "weightedScore": 0.6260669,
  "hitCount": 3,
  "hitResults": {"score":0.5158496},
} satisfies CocktailSearchStatistics

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailSearchStatistics
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


