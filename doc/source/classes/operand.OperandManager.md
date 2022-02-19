[Expressions](../README.md) / [operand](../modules/operand.md) / OperandManager

# Class: OperandManager

[operand](../modules/operand.md).OperandManager

## Table of contents

### Constructors

- [constructor](operand.OperandManager.md#constructor)

### Methods

- [build](operand.OperandManager.md#build)
- [deserialize](operand.OperandManager.md#deserialize)
- [eval](operand.OperandManager.md#eval)
- [serialize](operand.OperandManager.md#serialize)

## Constructors

### constructor

• **new OperandManager**(`expressionConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionConfig` | [`ExpressionConfig`](parser.ExpressionConfig.md) |

#### Defined in

[operand/operandManager.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/774a064/src/lib/operand/operandManager.ts#L11)

## Methods

### build

▸ **build**(`node`): [`Operand`](operand.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |

#### Returns

[`Operand`](operand.Operand.md)

#### Defined in

[operand/operandManager.ts:15](https://github.com/FlavioLionelRita/js-expressions/blob/774a064/src/lib/operand/operandManager.ts#L15)

___

### deserialize

▸ **deserialize**(`serialized`): [`Operand`](operand.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serialized` | `any` |

#### Returns

[`Operand`](operand.Operand.md)

#### Defined in

[operand/operandManager.ts:35](https://github.com/FlavioLionelRita/js-expressions/blob/774a064/src/lib/operand/operandManager.ts#L35)

___

### eval

▸ **eval**(`operand`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](operand.Operand.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`any`

#### Defined in

[operand/operandManager.ts:39](https://github.com/FlavioLionelRita/js-expressions/blob/774a064/src/lib/operand/operandManager.ts#L39)

___

### serialize

▸ **serialize**(`operand`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](operand.Operand.md) |

#### Returns

`any`

#### Defined in

[operand/operandManager.ts:26](https://github.com/FlavioLionelRita/js-expressions/blob/774a064/src/lib/operand/operandManager.ts#L26)
