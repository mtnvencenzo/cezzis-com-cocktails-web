
# IngredientModel

Model representing an ingredient used in a cocktail, including its name, unit of measure, requirement type, preparation, and suggestions.

## Properties

Name | Type
------------ | -------------
`name` | string
`uoM` | [UofMTypeModel](UofMTypeModel.md)
`requirement` | [IngredientRequirementTypeModel](IngredientRequirementTypeModel.md)
`display` | string
`units` | number
`preparation` | [PreparationTypeModel](PreparationTypeModel.md)
`suggestions` | string
`types` | [Array&lt;IngredientTypeModel&gt;](IngredientTypeModel.md)
`applications` | [Array&lt;IngredientApplicationTypeModel&gt;](IngredientApplicationTypeModel.md)

## Example

```typescript
import type { IngredientModel } from ''

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
} satisfies IngredientModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IngredientModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


