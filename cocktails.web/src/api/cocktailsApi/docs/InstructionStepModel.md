
# InstructionStepModel


## Properties

Name | Type
------------ | -------------
`display` | string
`order` | number

## Example

```typescript
import type { InstructionStepModel } from ''

// TODO: Update the object below with actual values
const example = {
  "display": Combine the gin, lemon juice, raspberry syrup, and egg white in a shaker without ice and dry shake (shake without ice) for about 10 seconds to make the foam.,
  "order": 1,
} satisfies InstructionStepModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InstructionStepModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


