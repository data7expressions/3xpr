[Expressions](../README.md) / OperandHelper

# Class: OperandHelper

## Table of contents

### Constructors

- [constructor](OperandHelper.md#constructor)

### Methods

- [avg](OperandHelper.md#avg)
- [count](OperandHelper.md#count)
- [findAggregates](OperandHelper.md#findaggregates)
- [first](OperandHelper.md#first)
- [getKeys](OperandHelper.md#getkeys)
- [haveAggregates](OperandHelper.md#haveaggregates)
- [last](OperandHelper.md#last)
- [max](OperandHelper.md#max)
- [min](OperandHelper.md#min)
- [objectKey](OperandHelper.md#objectkey)
- [solveAggregates](OperandHelper.md#solveaggregates)
- [sum](OperandHelper.md#sum)
- [toExpression](OperandHelper.md#toexpression)

## Constructors

### constructor

• **new OperandHelper**(`constBuilder`): [`OperandHelper`](OperandHelper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `constBuilder` | [`ConstBuilder`](../interfaces/ConstBuilder.md) |

#### Returns

[`OperandHelper`](OperandHelper.md)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:6](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L6)

## Methods

### avg

▸ **avg**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `aggregate` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`number`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:246](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L246)

___

### count

▸ **count**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `aggregate` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`number`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:185](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L185)

___

### findAggregates

▸ **findAggregates**(`operand`): [`Operand`](Operand.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

[`Operand`](Operand.md)[]

#### Defined in

[src/lib/operand/infrastructure/helper.ts:134](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L134)

___

### first

▸ **first**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `aggregate` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:197](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L197)

___

### getKeys

▸ **getKeys**(`variable`, `fields`, `list`, `context`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | [`Operand`](Operand.md) |
| `fields` | [`Operand`](Operand.md)[] |
| `list` | `any`[] |
| `context` | [`Context`](Context.md) |

#### Returns

`any`[]

#### Defined in

[src/lib/operand/infrastructure/helper.ts:92](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L92)

___

### haveAggregates

▸ **haveAggregates**(`operand`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

`boolean`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:121](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L121)

___

### last

▸ **last**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `aggregate` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:208](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L208)

___

### max

▸ **max**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `aggregate` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:220](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L220)

___

### min

▸ **min**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `aggregate` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:233](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L233)

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

[src/lib/operand/infrastructure/helper.ts:82](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L82)

___

### solveAggregates

▸ **solveAggregates**(`list`, `variable`, `operand`, `context`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `operand` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

[`Operand`](Operand.md)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:150](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L150)

___

### sum

▸ **sum**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `any`[] |
| `variable` | [`Operand`](Operand.md) |
| `aggregate` | [`Operand`](Operand.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`number`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:259](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L259)

___

### toExpression

▸ **toExpression**(`operand`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

`string`

#### Defined in

[src/lib/operand/infrastructure/helper.ts:8](https://github.com/data7expressions/3xpr/blob/5fc3d8db7a2e8309d2b0b1b76da6ac60e8497d49/src/lib/operand/infrastructure/helper.ts#L8)
