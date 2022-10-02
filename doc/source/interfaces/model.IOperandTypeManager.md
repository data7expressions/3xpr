[Expressions](../README.md) / [model](../modules/model.md) / IOperandTypeManager

# Interface: IOperandTypeManager

[model](../modules/model.md).IOperandTypeManager

## Implemented by

- [`OperandTypeManager`](../classes/operand.OperandTypeManager.md)

## Table of contents

### Methods

- [parameters](model.IOperandTypeManager.md#parameters)
- [solve](model.IOperandTypeManager.md#solve)

## Methods

### parameters

▸ **parameters**(`operand`): [`Parameter`](model.Parameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/model.Operand.md) |

#### Returns

[`Parameter`](model.Parameter.md)[]

#### Defined in

[model/operands.ts:69](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L69)

___

### solve

▸ **solve**(`operand`): [`Type`](../modules/model.md#type)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/model.Operand.md) |

#### Returns

[`Type`](../modules/model.md#type)

#### Defined in

[model/operands.ts:68](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L68)
