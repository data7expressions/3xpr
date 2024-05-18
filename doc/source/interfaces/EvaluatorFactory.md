[Expressions](../README.md) / EvaluatorFactory

# Interface: EvaluatorFactory

## Implemented by

- [`EvaluatorFactoryImpl`](../classes/EvaluatorFactoryImpl.md)

## Table of contents

### Methods

- [add](EvaluatorFactory.md#add)
- [create](EvaluatorFactory.md#create)
- [get](EvaluatorFactory.md#get)

## Methods

### add

▸ **add**(`key`, `evaluator`): [`EvaluatorFactory`](EvaluatorFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `evaluator` | [`EvaluatorBuilder`](EvaluatorBuilder.md) |

#### Returns

[`EvaluatorFactory`](EvaluatorFactory.md)

#### Defined in

[src/lib/operand/domain/services.ts:7](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/operand/domain/services.ts#L7)

___

### create

▸ **create**(`operand`): `undefined` \| [`IEvaluator`](IEvaluator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/Operand.md) |

#### Returns

`undefined` \| [`IEvaluator`](IEvaluator.md)

#### Defined in

[src/lib/operand/domain/services.ts:9](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/operand/domain/services.ts#L9)

___

### get

▸ **get**(`key`): `undefined` \| [`EvaluatorBuilder`](EvaluatorBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EvaluatorBuilder`](EvaluatorBuilder.md)

#### Defined in

[src/lib/operand/domain/services.ts:8](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/operand/domain/services.ts#L8)
