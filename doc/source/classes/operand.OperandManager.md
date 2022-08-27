[Expressions](../README.md) / [operand](../modules/operand.md) / OperandManager

# Class: OperandManager

[operand](../modules/operand.md).OperandManager

## Table of contents

### Constructors

- [constructor](operand.OperandManager.md#constructor)

### Methods

- [build](operand.OperandManager.md#build)
- [clone](operand.OperandManager.md#clone)
- [deserialize](operand.OperandManager.md#deserialize)
- [eval](operand.OperandManager.md#eval)
- [parameters](operand.OperandManager.md#parameters)
- [serialize](operand.OperandManager.md#serialize)

## Constructors

### constructor

• **new OperandManager**(`expressionConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionConfig` | [`ExpressionConfig`](parser.ExpressionConfig.md) |

#### Defined in

[operand/operandManager.ts:22](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operandManager.ts#L22)

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

[operand/operandManager.ts:26](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operandManager.ts#L26)

___

### clone

▸ **clone**(`value`): [`Operand`](operand.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Operand`](operand.Operand.md) |

#### Returns

[`Operand`](operand.Operand.md)

#### Defined in

[operand/operandManager.ts:37](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operandManager.ts#L37)

___

### deserialize

▸ **deserialize**(`value`): [`Operand`](operand.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Operand`](operand.Operand.md)

#### Defined in

[operand/operandManager.ts:59](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operandManager.ts#L59)

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

[operand/operandManager.ts:138](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operandManager.ts#L138)

___

### parameters

▸ **parameters**(`operand`): [`Parameter`](../interfaces/model.Parameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](operand.Operand.md) |

#### Returns

[`Parameter`](../interfaces/model.Parameter.md)[]

#### Defined in

[operand/operandManager.ts:143](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operandManager.ts#L143)

___

### serialize

▸ **serialize**(`operand`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](operand.Operand.md) |

#### Returns

`string`

#### Defined in

[operand/operandManager.ts:41](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operandManager.ts#L41)
