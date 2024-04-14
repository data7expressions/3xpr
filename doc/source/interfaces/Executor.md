[Expressions](../README.md) / Executor

# Interface: Executor

## Hierarchy

- **`Executor`**

  ↳ [`Expressions`](Expressions.md)

## Implemented by

- [`ExecutorImpl`](../classes/ExecutorImpl.md)
- [`ExecutorObserveDecorator`](../classes/ExecutorObserveDecorator.md)

## Table of contents

### Methods

- [eval](Executor.md#eval)
- [evalAsync](Executor.md#evalasync)
- [execute](Executor.md#execute)

## Methods

### eval

▸ **eval**(`expression`, `data?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`any`

#### Defined in

[src/lib/expression/domain/expressions.ts:6](https://github.com/data7expressions/3xpr/blob/95c7d152921f5a8f5f272209d2eafc5adcde5f98/src/lib/expression/domain/expressions.ts#L6)

___

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

[src/lib/expression/domain/expressions.ts:7](https://github.com/data7expressions/3xpr/blob/95c7d152921f5a8f5f272209d2eafc5adcde5f98/src/lib/expression/domain/expressions.ts#L7)

___

### execute

▸ **execute**(`task`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expression/domain/expressions.ts:8](https://github.com/data7expressions/3xpr/blob/95c7d152921f5a8f5f272209d2eafc5adcde5f98/src/lib/expression/domain/expressions.ts#L8)
