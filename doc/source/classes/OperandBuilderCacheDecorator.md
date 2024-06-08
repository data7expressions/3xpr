[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / OperandBuilderCacheDecorator

# Class: OperandBuilderCacheDecorator

## Implements

- [`OperandBuilder`](../interfaces/OperandBuilder.md)

## Constructors

### new OperandBuilderCacheDecorator()

> **new OperandBuilderCacheDecorator**(`builder`, `cache`, `serializer`, `utils`): [`OperandBuilderCacheDecorator`](OperandBuilderCacheDecorator.md)

#### Parameters

• **builder**: [`OperandBuilder`](../interfaces/OperandBuilder.md)

• **cache**: `ICache`\<`string`, `string`\>

• **serializer**: [`OperandSerializer`](../interfaces/OperandSerializer.md)

• **utils**: `IUtils`

#### Returns

[`OperandBuilderCacheDecorator`](OperandBuilderCacheDecorator.md)

#### Source

[src/lib/operand/application/services/builderCacheDecorator.ts:9](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/builderCacheDecorator.ts#L9)

## Accessors

### evaluatorFactory

> `get` **evaluatorFactory**(): [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Returns

[`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Source

[src/lib/operand/application/services/builderCacheDecorator.ts:16](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/builderCacheDecorator.ts#L16)

## Methods

### build()

> **build**(`expression`): [`Operand`](Operand.md)

#### Parameters

• **expression**: `string`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`OperandBuilder`](../interfaces/OperandBuilder.md).[`build`](../interfaces/OperandBuilder.md#build)

#### Source

[src/lib/operand/application/services/builderCacheDecorator.ts:20](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/builderCacheDecorator.ts#L20)
