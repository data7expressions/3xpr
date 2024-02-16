Expressions

# Expressions

## Table of contents

### Enumerations

- [OperandType](enums/OperandType.md)

### Classes

- [ActionObserver](classes/ActionObserver.md)
- [ConstBuilderImpl](classes/ConstBuilderImpl.md)
- [Context](classes/Context.md)
- [Data](classes/Data.md)
- [Evaluator](classes/Evaluator.md)
- [EvaluatorFactoryImpl](classes/EvaluatorFactoryImpl.md)
- [ExecutorImpl](classes/ExecutorImpl.md)
- [ExecutorObserveDecorator](classes/ExecutorObserveDecorator.md)
- [ExpressionNormalizer](classes/ExpressionNormalizer.md)
- [ExpressionParse](classes/ExpressionParse.md)
- [ExpressionsBuilder](classes/ExpressionsBuilder.md)
- [ExpressionsImpl](classes/ExpressionsImpl.md)
- [Helper](classes/Helper.md)
- [HelperBuilder](classes/HelperBuilder.md)
- [ModelServiceImpl](classes/ModelServiceImpl.md)
- [Operand](classes/Operand.md)
- [OperandBuild](classes/OperandBuild.md)
- [OperandBuilderCacheDecorator](classes/OperandBuilderCacheDecorator.md)
- [OperandBuilderImpl](classes/OperandBuilderImpl.md)
- [OperandClone](classes/OperandClone.md)
- [OperandComplete](classes/OperandComplete.md)
- [OperandFacadeBuilder](classes/OperandFacadeBuilder.md)
- [OperandFacadeImpl](classes/OperandFacadeImpl.md)
- [OperandHelper](classes/OperandHelper.md)
- [OperandNormalize](classes/OperandNormalize.md)
- [OperandReduce](classes/OperandReduce.md)
- [OperandSerializerImpl](classes/OperandSerializerImpl.md)
- [ParameterServiceImpl](classes/ParameterServiceImpl.md)
- [Parser](classes/Parser.md)
- [Position](classes/Position.md)
- [PrototypeEvaluator](classes/PrototypeEvaluator.md)
- [Step](classes/Step.md)
- [Token](classes/Token.md)
- [TypeServiceImpl](classes/TypeServiceImpl.md)

### Interfaces

- [ActionObserverArgs](interfaces/ActionObserverArgs.md)
- [ConstBuilder](interfaces/ConstBuilder.md)
- [EvaluatorBuilder](interfaces/EvaluatorBuilder.md)
- [EvaluatorFactory](interfaces/EvaluatorFactory.md)
- [Executor](interfaces/Executor.md)
- [ExpressionConfig](interfaces/ExpressionConfig.md)
- [ExpressionConvert](interfaces/ExpressionConvert.md)
- [ExpressionConverter](interfaces/ExpressionConverter.md)
- [ExpressionListener](interfaces/ExpressionListener.md)
- [Expressions](interfaces/Expressions.md)
- [Format](interfaces/Format.md)
- [FunctionAdditionalInfo](interfaces/FunctionAdditionalInfo.md)
- [IBuilder](interfaces/IBuilder.md)
- [IEvaluator](interfaces/IEvaluator.md)
- [IExpressionHelper](interfaces/IExpressionHelper.md)
- [IOperandHelper](interfaces/IOperandHelper.md)
- [ISerializer](interfaces/ISerializer.md)
- [Library](interfaces/Library.md)
- [ModelService](interfaces/ModelService.md)
- [OperandBuildOptions](interfaces/OperandBuildOptions.md)
- [OperandBuilder](interfaces/OperandBuilder.md)
- [OperandCloner](interfaces/OperandCloner.md)
- [OperandFacade](interfaces/OperandFacade.md)
- [OperandMetadata](interfaces/OperandMetadata.md)
- [OperandSerializer](interfaces/OperandSerializer.md)
- [OperatorAdditionalInfo](interfaces/OperatorAdditionalInfo.md)
- [OperatorDoc](interfaces/OperatorDoc.md)
- [OperatorMetadata](interfaces/OperatorMetadata.md)
- [Parameter](interfaces/Parameter.md)
- [ParameterDoc](interfaces/ParameterDoc.md)
- [ParameterService](interfaces/ParameterService.md)
- [Signal](interfaces/Signal.md)
- [Sing](interfaces/Sing.md)
- [TypeService](interfaces/TypeService.md)
- [WaitSignal](interfaces/WaitSignal.md)

### Variables

- [expressions](README.md#expressions)
- [helper](README.md#helper)

### Functions

- [evalAsync](README.md#evalasync)
- [evaluate](README.md#evaluate)
- [parameters](README.md#parameters)
- [subscribe](README.md#subscribe)
- [unsubscribe](README.md#unsubscribe)

## Variables

### expressions

• `Const` **expressions**: [`Expressions`](interfaces/Expressions.md)

#### Defined in

[src/lib/index.ts:16](https://github.com/data7expressions/3xpr/blob/4f3ff2e/src/lib/index.ts#L16)

___

### helper

• `Const` **helper**: [`Helper`](classes/Helper.md)

#### Defined in

[src/lib/index.ts:15](https://github.com/data7expressions/3xpr/blob/4f3ff2e/src/lib/index.ts#L15)

## Functions

### evalAsync

▸ **evalAsync**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/index.ts:38](https://github.com/data7expressions/3xpr/blob/4f3ff2e/src/lib/index.ts#L38)

___

### evaluate

▸ **evaluate**(`expression`, `data?`): `any`

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `data?` | `any` | Data with variables |

#### Returns

`any`

Result of the evaluate expression

#### Defined in

[src/lib/index.ts:34](https://github.com/data7expressions/3xpr/blob/4f3ff2e/src/lib/index.ts#L34)

___

### parameters

▸ **parameters**(`expression`): [`Parameter`](interfaces/Parameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`Parameter`](interfaces/Parameter.md)[]

Parameters of expression

#### Defined in

[src/lib/index.ts:24](https://github.com/data7expressions/3xpr/blob/4f3ff2e/src/lib/index.ts#L24)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](classes/ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/index.ts:42](https://github.com/data7expressions/3xpr/blob/4f3ff2e/src/lib/index.ts#L42)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](classes/ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/index.ts:46](https://github.com/data7expressions/3xpr/blob/4f3ff2e/src/lib/index.ts#L46)
