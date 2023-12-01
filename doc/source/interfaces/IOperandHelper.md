[Expressions](../README.md) / IOperandHelper

# Interface: IOperandHelper

## Implemented by

- [`OperandHelper`](../classes/OperandHelper.md)

## Table of contents

### Methods

- [avg](IOperandHelper.md#avg)
- [count](IOperandHelper.md#count)
- [findAggregates](IOperandHelper.md#findaggregates)
- [first](IOperandHelper.md#first)
- [getKeys](IOperandHelper.md#getkeys)
- [haveAggregates](IOperandHelper.md#haveaggregates)
- [last](IOperandHelper.md#last)
- [max](IOperandHelper.md#max)
- [min](IOperandHelper.md#min)
- [objectKey](IOperandHelper.md#objectkey)
- [solveAggregates](IOperandHelper.md#solveaggregates)
- [sum](IOperandHelper.md#sum)
- [toExpression](IOperandHelper.md#toexpression)

## Methods

### avg

▸ **avg**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `aggregate` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`number`

#### Defined in

[src/lib/shared/application/helper/operand.ts:15](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L15)

___

### count

▸ **count**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `aggregate` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`number`

#### Defined in

[src/lib/shared/application/helper/operand.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L10)

___

### findAggregates

▸ **findAggregates**(`operand`): [`Operand`](../classes/Operand.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/Operand.md) |

#### Returns

[`Operand`](../classes/Operand.md)[]

#### Defined in

[src/lib/shared/application/helper/operand.ts:8](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L8)

___

### first

▸ **first**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `aggregate` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/shared/application/helper/operand.ts:11](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L11)

___

### getKeys

▸ **getKeys**(`variable`, `fields`, `list`, `context`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | [`Operand`](../classes/Operand.md) |
| `fields` | [`Operand`](../classes/Operand.md)[] |
| `list` | `any`[] |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`any`[]

#### Defined in

[src/lib/shared/application/helper/operand.ts:6](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L6)

___

### haveAggregates

▸ **haveAggregates**(`operand`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/Operand.md) |

#### Returns

`boolean`

#### Defined in

[src/lib/shared/application/helper/operand.ts:7](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L7)

___

### last

▸ **last**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `aggregate` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/shared/application/helper/operand.ts:12](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L12)

___

### max

▸ **max**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `aggregate` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/shared/application/helper/operand.ts:13](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L13)

___

### min

▸ **min**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `aggregate` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/shared/application/helper/operand.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L14)

___

### objectKey

▸ **objectKey**(`obj`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`any`

#### Defined in

[src/lib/shared/application/helper/operand.ts:5](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L5)

___

### solveAggregates

▸ **solveAggregates**(`list`, `variable`, `operand`, `context`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `operand` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

[`Operand`](../classes/Operand.md)

#### Defined in

[src/lib/shared/application/helper/operand.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L9)

___

### sum

▸ **sum**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](../classes/Operand.md) |
| `aggregate` | [`Operand`](../classes/Operand.md) |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`number`

#### Defined in

[src/lib/shared/application/helper/operand.ts:16](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L16)

___

### toExpression

▸ **toExpression**(`operand`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/Operand.md) |

#### Returns

`string`

#### Defined in

[src/lib/shared/application/helper/operand.ts:4](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/shared/application/helper/operand.ts#L4)
