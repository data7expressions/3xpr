[Expressions](../README.md) / [model](../modules/model.md) / ActionObserver

# Class: ActionObserver

[model](../modules/model.md).ActionObserver

## Table of contents

### Constructors

- [constructor](model.ActionObserver.md#constructor)

### Properties

- [condition](model.ActionObserver.md#condition)

### Methods

- [after](model.ActionObserver.md#after)
- [before](model.ActionObserver.md#before)
- [error](model.ActionObserver.md#error)

## Constructors

### constructor

• **new ActionObserver**(`condition?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition?` | `string` |

#### Defined in

[model/observer.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/model/observer.ts#L11)

## Properties

### condition

• `Optional` **condition**: `string`

#### Defined in

[model/observer.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/model/observer.ts#L10)

## Methods

### after

▸ `Abstract` **after**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/model.ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[model/observer.ts:16](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/model/observer.ts#L16)

___

### before

▸ `Abstract` **before**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/model.ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[model/observer.ts:15](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/model/observer.ts#L15)

___

### error

▸ `Abstract` **error**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/model.ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[model/observer.ts:17](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/model/observer.ts#L17)
