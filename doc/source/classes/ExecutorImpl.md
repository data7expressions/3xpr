[Expressions](../README.md) / ExecutorImpl

# Class: ExecutorImpl

## Implements

- [`Executor`](../interfaces/Executor.md)

## Table of contents

### Constructors

- [constructor](ExecutorImpl.md#constructor)

### Methods

- [eval](ExecutorImpl.md#eval)
- [evalAsync](ExecutorImpl.md#evalasync)
- [execute](ExecutorImpl.md#execute)

## Constructors

### constructor

• **new ExecutorImpl**(`operand`): [`ExecutorImpl`](ExecutorImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`OperandFacade`](../interfaces/OperandFacade.md) |

#### Returns

[`ExecutorImpl`](ExecutorImpl.md)

#### Defined in

[src/lib/expression/application/useCases/executor.ts:7](https://github.com/FlavioLionelRita/3xpr/blob/2371f39/src/lib/expression/application/useCases/executor.ts#L7)

## Methods

### eval

▸ **eval**(`expression`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Implementation of

[Executor](../interfaces/Executor.md).[eval](../interfaces/Executor.md#eval)

#### Defined in

[src/lib/expression/application/useCases/executor.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/2371f39/src/lib/expression/application/useCases/executor.ts#L9)

___

### evalAsync

▸ **evalAsync**(`expression`, `context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[evalAsync](../interfaces/Executor.md#evalasync)

#### Defined in

[src/lib/expression/application/useCases/executor.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/2371f39/src/lib/expression/application/useCases/executor.ts#L14)

___

### execute

▸ **execute**(`expression`, `context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[execute](../interfaces/Executor.md#execute)

#### Defined in

[src/lib/expression/application/useCases/executor.ts:19](https://github.com/FlavioLionelRita/3xpr/blob/2371f39/src/lib/expression/application/useCases/executor.ts#L19)
