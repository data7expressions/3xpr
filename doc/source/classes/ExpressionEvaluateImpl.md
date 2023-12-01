[Expressions](../README.md) / ExpressionEvaluateImpl

# Class: ExpressionEvaluateImpl

## Implements

- [`ExpressionEvaluate`](../interfaces/ExpressionEvaluate.md)

## Table of contents

### Constructors

- [constructor](ExpressionEvaluateImpl.md#constructor)

### Methods

- [eval](ExpressionEvaluateImpl.md#eval)
- [evalAsync](ExpressionEvaluateImpl.md#evalasync)

## Constructors

### constructor

• **new ExpressionEvaluateImpl**(`operand`): [`ExpressionEvaluateImpl`](ExpressionEvaluateImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`OperandFacade`](../interfaces/OperandFacade.md) |

#### Returns

[`ExpressionEvaluateImpl`](ExpressionEvaluateImpl.md)

#### Defined in

[src/lib/expression/application/useCases/evaluate.ts:7](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/expression/application/useCases/evaluate.ts#L7)

## Methods

### eval

▸ **eval**(`expression`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Implementation of

[ExpressionEvaluate](../interfaces/ExpressionEvaluate.md).[eval](../interfaces/ExpressionEvaluate.md#eval)

#### Defined in

[src/lib/expression/application/useCases/evaluate.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/expression/application/useCases/evaluate.ts#L9)

___

### evalAsync

▸ **evalAsync**(`expression`, `context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[ExpressionEvaluate](../interfaces/ExpressionEvaluate.md).[evalAsync](../interfaces/ExpressionEvaluate.md#evalasync)

#### Defined in

[src/lib/expression/application/useCases/evaluate.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/expression/application/useCases/evaluate.ts#L14)
