[Expressions](../README.md) / EvaluatorFactoryImpl

# Class: EvaluatorFactoryImpl

## Implements

- [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

## Table of contents

### Constructors

- [constructor](EvaluatorFactoryImpl.md#constructor)

### Methods

- [add](EvaluatorFactoryImpl.md#add)
- [create](EvaluatorFactoryImpl.md#create)
- [get](EvaluatorFactoryImpl.md#get)

## Constructors

### constructor

• **new EvaluatorFactoryImpl**(): [`EvaluatorFactoryImpl`](EvaluatorFactoryImpl.md)

#### Returns

[`EvaluatorFactoryImpl`](EvaluatorFactoryImpl.md)

#### Defined in

[src/lib/operand/application/services/factory.ts:6](https://github.com/data7expressions/3xpr/blob/e9bbe90/src/lib/operand/application/services/factory.ts#L6)

## Methods

### add

▸ **add**(`key`, `evaluator`): [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `evaluator` | [`EvaluatorBuilder`](../interfaces/EvaluatorBuilder.md) |

#### Returns

[`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Implementation of

[EvaluatorFactory](../interfaces/EvaluatorFactory.md).[add](../interfaces/EvaluatorFactory.md#add)

#### Defined in

[src/lib/operand/application/services/factory.ts:10](https://github.com/data7expressions/3xpr/blob/e9bbe90/src/lib/operand/application/services/factory.ts#L10)

___

### create

▸ **create**(`operand`): `undefined` \| [`IEvaluator`](../interfaces/IEvaluator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

`undefined` \| [`IEvaluator`](../interfaces/IEvaluator.md)

#### Implementation of

[EvaluatorFactory](../interfaces/EvaluatorFactory.md).[create](../interfaces/EvaluatorFactory.md#create)

#### Defined in

[src/lib/operand/application/services/factory.ts:19](https://github.com/data7expressions/3xpr/blob/e9bbe90/src/lib/operand/application/services/factory.ts#L19)

___

### get

▸ **get**(`key`): `undefined` \| [`EvaluatorBuilder`](../interfaces/EvaluatorBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EvaluatorBuilder`](../interfaces/EvaluatorBuilder.md)

#### Implementation of

[EvaluatorFactory](../interfaces/EvaluatorFactory.md).[get](../interfaces/EvaluatorFactory.md#get)

#### Defined in

[src/lib/operand/application/services/factory.ts:15](https://github.com/data7expressions/3xpr/blob/e9bbe90/src/lib/operand/application/services/factory.ts#L15)
