[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / EvaluatorFactory

# Interface: EvaluatorFactory

## Methods

### add()

> **add**(`key`, `evaluator`): [`EvaluatorFactory`](EvaluatorFactory.md)

#### Parameters

• **key**: `string`

• **evaluator**: [`EvaluatorBuilder`](EvaluatorBuilder.md)

#### Returns

[`EvaluatorFactory`](EvaluatorFactory.md)

#### Source

[src/lib/operand/domain/services.ts:7](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L7)

***

### create()

> **create**(`operand`): `undefined` \| [`IEvaluator`](IEvaluator.md)

#### Parameters

• **operand**: [`Operand`](../classes/Operand.md)

#### Returns

`undefined` \| [`IEvaluator`](IEvaluator.md)

#### Source

[src/lib/operand/domain/services.ts:9](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L9)

***

### get()

> **get**(`key`): `undefined` \| [`EvaluatorBuilder`](EvaluatorBuilder.md)

#### Parameters

• **key**: `string`

#### Returns

`undefined` \| [`EvaluatorBuilder`](EvaluatorBuilder.md)

#### Source

[src/lib/operand/domain/services.ts:8](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L8)
