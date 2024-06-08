[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / EvaluatorFactoryImpl

# Class: EvaluatorFactoryImpl

## Implements

- [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

## Constructors

### new EvaluatorFactoryImpl()

> **new EvaluatorFactoryImpl**(): [`EvaluatorFactoryImpl`](EvaluatorFactoryImpl.md)

#### Returns

[`EvaluatorFactoryImpl`](EvaluatorFactoryImpl.md)

#### Source

[src/lib/operand/application/services/factory.ts:6](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/factory.ts#L6)

## Methods

### add()

> **add**(`key`, `evaluator`): [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Parameters

• **key**: `string`

• **evaluator**: [`EvaluatorBuilder`](../interfaces/EvaluatorBuilder.md)

#### Returns

[`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Implementation of

[`EvaluatorFactory`](../interfaces/EvaluatorFactory.md).[`add`](../interfaces/EvaluatorFactory.md#add)

#### Source

[src/lib/operand/application/services/factory.ts:10](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/factory.ts#L10)

***

### create()

> **create**(`operand`): `undefined` \| [`IEvaluator`](../interfaces/IEvaluator.md)

#### Parameters

• **operand**: [`Operand`](Operand.md)

#### Returns

`undefined` \| [`IEvaluator`](../interfaces/IEvaluator.md)

#### Implementation of

[`EvaluatorFactory`](../interfaces/EvaluatorFactory.md).[`create`](../interfaces/EvaluatorFactory.md#create)

#### Source

[src/lib/operand/application/services/factory.ts:19](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/factory.ts#L19)

***

### get()

> **get**(`key`): `undefined` \| [`EvaluatorBuilder`](../interfaces/EvaluatorBuilder.md)

#### Parameters

• **key**: `string`

#### Returns

`undefined` \| [`EvaluatorBuilder`](../interfaces/EvaluatorBuilder.md)

#### Implementation of

[`EvaluatorFactory`](../interfaces/EvaluatorFactory.md).[`get`](../interfaces/EvaluatorFactory.md#get)

#### Source

[src/lib/operand/application/services/factory.ts:15](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/factory.ts#L15)
