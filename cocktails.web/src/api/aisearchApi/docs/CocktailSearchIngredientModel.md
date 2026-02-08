
# CocktailSearchIngredientModel

Model representing an ingredient used in a cocktail, including its name, unit of measure, requirement type, preparation, and suggestions.

## Properties

Name | Type
------------ | -------------
`name` | string
`uoM` | [CocktailSearchUofMTypeModel](CocktailSearchUofMTypeModel.md)
`requirement` | [CocktailSearchIngredientRequirementTypeModel](CocktailSearchIngredientRequirementTypeModel.md)
`display` | string
`units` | number
`preparation` | [CocktailSearchPreparationTypeModel](CocktailSearchPreparationTypeModel.md)
`suggestions` | string
`types` | [Array&lt;CocktailSearchIngredientTypeModel&gt;](CocktailSearchIngredientTypeModel.md)
`applications` | [Array&lt;CocktailSearchIngredientApplicationTypeModel&gt;](CocktailSearchIngredientApplicationTypeModel.md)

## Example

```typescript
import type { CocktailSearchIngredientModel } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Blanco Tequila,
  "uoM": null,
  "requirement": null,
  "display": 1 1/2 oz Blanco Tequila,
  "units": 1.5,
  "preparation": null,
  "suggestions": Use a good quality Blanco Tequila for the best flavor,
  "types": ["spirit"],
  "applications": ["base"],
} satisfies CocktailSearchIngredientModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CocktailSearchIngredientModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


