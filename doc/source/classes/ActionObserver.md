[Expressions](../README.md) / ActionObserver

# Class: ActionObserver

## Table of contents

### Constructors

- [constructor](ActionObserver.md#constructor)

### Properties

- [condition](ActionObserver.md#condition)

### Methods

- [after](ActionObserver.md#after)
- [before](ActionObserver.md#before)
- [error](ActionObserver.md#error)

## Constructors

### constructor

• **new ActionObserver**(`condition?`): [`ActionObserver`](ActionObserver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition?` | `string` |

#### Returns

[`ActionObserver`](ActionObserver.md)

#### Defined in

[src/lib/shared/domain/observer.ts:10](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/shared/domain/observer.ts#L10)

## Properties

### condition

• `Optional` `Readonly` **condition**: `string`

#### Defined in

[src/lib/shared/domain/observer.ts:10](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/shared/domain/observer.ts#L10)

## Methods

### after

▸ **after**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/observer.ts:12](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/shared/domain/observer.ts#L12)

___

### before

▸ **before**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/observer.ts:11](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/shared/domain/observer.ts#L11)

___

### error

▸ **error**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/observer.ts:13](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/shared/domain/observer.ts#L13)
