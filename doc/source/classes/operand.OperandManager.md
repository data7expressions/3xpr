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

[operand/operandManager.ts:23](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/operandManager.ts#L23)

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

[operand/operandManager.ts:27](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/operandManager.ts#L27)

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

[operand/operandManager.ts:38](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/operandManager.ts#L38)

___

### deserialize

▸ **deserialize**(`value`): [`Operand`](operand.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OperandMetadata`](../interfaces/operand.OperandMetadata.md) |

#### Returns

[`Operand`](operand.Operand.md)

#### Defined in

[operand/operandManager.ts:58](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/operandManager.ts#L58)

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

[operand/operandManager.ts:133](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/operandManager.ts#L133)

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

[operand/operandManager.ts:138](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/operandManager.ts#L138)

___

### serialize

▸ **serialize**(`operand`): [`OperandMetadata`](../interfaces/operand.OperandMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](operand.Operand.md) |

#### Returns

[`OperandMetadata`](../interfaces/operand.OperandMetadata.md)

#### Defined in

[operand/operandManager.ts:44](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/operandManager.ts#L44)
