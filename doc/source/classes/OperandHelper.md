[Expressions](../README.md) / OperandHelper

# Class: OperandHelper

## Implements

- [`IOperandHelper`](../interfaces/IOperandHelper.md)

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

[src/lib/operand/infrastructure/helper.ts:7](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L7)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[avg](../interfaces/IOperandHelper.md#avg)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:247](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L247)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[count](../interfaces/IOperandHelper.md#count)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:186](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L186)

___

### findAggregates

▸ **findAggregates**(`operand`): [`Operand`](Operand.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

[`Operand`](Operand.md)[]

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[findAggregates](../interfaces/IOperandHelper.md#findaggregates)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:135](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L135)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[first](../interfaces/IOperandHelper.md#first)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:198](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L198)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[getKeys](../interfaces/IOperandHelper.md#getkeys)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:93](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L93)

___

### haveAggregates

▸ **haveAggregates**(`operand`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

`boolean`

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[haveAggregates](../interfaces/IOperandHelper.md#haveaggregates)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:122](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L122)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[last](../interfaces/IOperandHelper.md#last)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:209](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L209)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[max](../interfaces/IOperandHelper.md#max)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:221](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L221)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[min](../interfaces/IOperandHelper.md#min)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:234](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L234)

___

### objectKey

▸ **objectKey**(`obj`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`any`

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[objectKey](../interfaces/IOperandHelper.md#objectkey)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:83](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L83)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[solveAggregates](../interfaces/IOperandHelper.md#solveaggregates)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:151](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L151)

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

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[sum](../interfaces/IOperandHelper.md#sum)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:260](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L260)

___

### toExpression

▸ **toExpression**(`operand`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

`string`

#### Implementation of

[IOperandHelper](../interfaces/IOperandHelper.md).[toExpression](../interfaces/IOperandHelper.md#toexpression)

#### Defined in

[src/lib/operand/infrastructure/helper.ts:9](https://github.com/data7expressions/3xpr/blob/24a5f5b/src/lib/operand/infrastructure/helper.ts#L9)
