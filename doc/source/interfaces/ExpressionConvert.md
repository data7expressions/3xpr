[Expressions](../README.md) / ExpressionConvert

# Interface: ExpressionConvert

## Hierarchy

- **`ExpressionConvert`**

  ↳ [`Expressions`](Expressions.md)

## Table of contents

### Methods

- [addConvert](ExpressionConvert.md#addconvert)
- [convert](ExpressionConvert.md#convert)
- [getConvert](ExpressionConvert.md#getconvert)

## Methods

### addConvert

▸ **addConvert**(`key`, `converter`): [`ExpressionConvert`](ExpressionConvert.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `converter` | [`ExpressionConverter`](ExpressionConverter.md) |

#### Returns

[`ExpressionConvert`](ExpressionConvert.md)

#### Defined in

[src/lib/expression/domain/expressions.ts:20](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/expression/domain/expressions.ts#L20)

___

### convert

▸ **convert**(`source`, `from`): [`string`, `any`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `any` |
| `from` | `string` |

#### Returns

[`string`, `any`]

#### Defined in

[src/lib/expression/domain/expressions.ts:22](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/expression/domain/expressions.ts#L22)

___

### getConvert

▸ **getConvert**(`key`): [`ExpressionConverter`](ExpressionConverter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`ExpressionConverter`](ExpressionConverter.md)

#### Defined in

[src/lib/expression/domain/expressions.ts:21](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/expression/domain/expressions.ts#L21)
