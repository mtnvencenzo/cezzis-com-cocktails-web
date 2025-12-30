
# IngredientModel


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
  "name": null,
  "uoM": null,
  "requirement": null,
  "display": null,
  "units": null,
  "preparation": null,
  "suggestions": null,
  "types": null,
  "applications": null,
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


