[Expressions](../README.md) / [operand](../modules/operand.md) / OperandTypeManager

# Class: OperandTypeManager

[operand](../modules/operand.md).OperandTypeManager

## Implements

- [`IOperandTypeManager`](../interfaces/model.IOperandTypeManager.md)

## Table of contents

### Constructors

- [constructor](operand.OperandTypeManager.md#constructor)

### Methods

- [parameters](operand.OperandTypeManager.md#parameters)
- [solve](operand.OperandTypeManager.md#solve)

## Constructors

### constructor

• **new OperandTypeManager**(`expressionConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionConfig` | [`ExpressionConfig`](parser.ExpressionConfig.md) |

#### Defined in

[operand/typeManager.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/typeManager.ts#L9)

## Methods

### parameters

▸ **parameters**(`operand`): [`Parameter`](../interfaces/model.Parameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](model.Operand.md) |

#### Returns

[`Parameter`](../interfaces/model.Parameter.md)[]

#### Implementation of

[IOperandTypeManager](../interfaces/model.IOperandTypeManager.md).[parameters](../interfaces/model.IOperandTypeManager.md#parameters)

#### Defined in

[operand/typeManager.ts:25](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/typeManager.ts#L25)

___

### solve

▸ **solve**(`operand`): [`Type`](../modules/model.md#type)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](model.Operand.md) |

#### Returns

[`Type`](../modules/model.md#type)

#### Implementation of

[IOperandTypeManager](../interfaces/model.IOperandTypeManager.md).[solve](../interfaces/model.IOperandTypeManager.md#solve)

#### Defined in

[operand/typeManager.ts:40](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/typeManager.ts#L40)
