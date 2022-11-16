[Expressions](../README.md) / [operand](../modules/operand.md) / OperandBuilder

# Class: OperandBuilder

[operand](../modules/operand.md).OperandBuilder

## Implements

- [`IOperandBuilder`](../interfaces/model.IOperandBuilder.md)

## Table of contents

### Constructors

- [constructor](operand.OperandBuilder.md#constructor)

### Methods

- [build](operand.OperandBuilder.md#build)

## Constructors

### constructor

• **new OperandBuilder**(`expressionConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionConfig` | [`ExpressionConfig`](parser.ExpressionConfig.md) |

#### Defined in

[operand/operandBuilder.ts:13](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operandBuilder.ts#L13)

## Methods

### build

▸ **build**(`node`): [`Operand`](model.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |

#### Returns

[`Operand`](model.Operand.md)

#### Implementation of

[IOperandBuilder](../interfaces/model.IOperandBuilder.md).[build](../interfaces/model.IOperandBuilder.md#build)

#### Defined in

[operand/operandBuilder.ts:17](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operandBuilder.ts#L17)
