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
- [getMainData](operand.OperandManager.md#getmaindata)
- [initialize](operand.OperandManager.md#initialize)
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

[operand/operandManager.ts:23](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L23)

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

[operand/operandManager.ts:27](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L27)

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

[operand/operandManager.ts:38](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L38)

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

[operand/operandManager.ts:60](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L60)

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

[operand/operandManager.ts:139](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L139)

___

### getMainData

▸ **getMainData**(`operand`): [`Data`](model.Data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`IOperandData`](../interfaces/operand.IOperandData.md) |

#### Returns

[`Data`](model.Data.md)

#### Defined in

[operand/operandManager.ts:390](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L390)

___

### initialize

▸ **initialize**(`operand`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](operand.Operand.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`void`

#### Defined in

[operand/operandManager.ts:165](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L165)

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

[operand/operandManager.ts:144](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L144)

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

[operand/operandManager.ts:42](https://github.com/FlavioLionelRita/js-expressions/blob/46de85e/src/lib/operand/operandManager.ts#L42)
