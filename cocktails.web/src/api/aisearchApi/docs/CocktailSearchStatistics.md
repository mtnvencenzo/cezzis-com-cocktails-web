
# CocktailSearchStatistics


## Properties

Name | Type
------------ | -------------
`total_score` | number
`max_score` | number
`avg_score` | number
`weighted_score` | number
`hit_count` | number
`hit_results` | [Array&lt;CocktailVectorSearchResult&gt;](CocktailVectorSearchResult.md)

## Example

```typescript
import type { CocktailSearchStatistics } from ''

// TODO: Update the object below with actual values
const example = {
  "total_score": null,
  "max_score": null,
  "avg_score": null,
  "weighted_score": null,
  "hit_count": null,
  "hit_results": null,
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


