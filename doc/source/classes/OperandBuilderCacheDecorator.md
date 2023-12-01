[Expressions](../README.md) / OperandBuilderCacheDecorator

# Class: OperandBuilderCacheDecorator

## Implements

- [`OperandBuilder`](../interfaces/OperandBuilder.md)

## Table of contents

### Constructors

- [constructor](OperandBuilderCacheDecorator.md#constructor)

### Accessors

- [evaluatorFactory](OperandBuilderCacheDecorator.md#evaluatorfactory)

### Methods

- [build](OperandBuilderCacheDecorator.md#build)

## Constructors

### constructor

• **new OperandBuilderCacheDecorator**(`builder`, `cache`, `serializer`, `utils`): [`OperandBuilderCacheDecorator`](OperandBuilderCacheDecorator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`OperandBuilder`](../interfaces/OperandBuilder.md) |
| `cache` | `ICache`\<`string`, `string`\> |
| `serializer` | [`OperandSerializer`](../interfaces/OperandSerializer.md) |
| `utils` | `IUtils` |

#### Returns

[`OperandBuilderCacheDecorator`](OperandBuilderCacheDecorator.md)

#### Defined in

[src/lib/operand/application/services/builderCacheDecorator.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/operand/application/services/builderCacheDecorator.ts#L9)

## Accessors

### evaluatorFactory

• `get` **evaluatorFactory**(): [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Returns

[`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Implementation of

[OperandBuilder](../interfaces/OperandBuilder.md).[evaluatorFactory](../interfaces/OperandBuilder.md#evaluatorfactory)

#### Defined in

[src/lib/operand/application/services/builderCacheDecorator.ts:16](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/operand/application/services/builderCacheDecorator.ts#L16)

## Methods

### build

▸ **build**(`expression`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[OperandBuilder](../interfaces/OperandBuilder.md).[build](../interfaces/OperandBuilder.md#build)

#### Defined in

[src/lib/operand/application/services/builderCacheDecorator.ts:20](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/operand/application/services/builderCacheDecorator.ts#L20)
