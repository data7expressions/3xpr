[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / ActionObserver

# Class: `abstract` ActionObserver

## Constructors

### new ActionObserver()

> **new ActionObserver**(`condition`?): [`ActionObserver`](ActionObserver.md)

#### Parameters

• **condition?**: `string`

#### Returns

[`ActionObserver`](ActionObserver.md)

#### Source

[src/lib/shared/domain/observer.ts:10](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/observer.ts#L10)

## Properties

### condition?

> `optional` `readonly` **condition**: `string`

#### Source

[src/lib/shared/domain/observer.ts:10](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/observer.ts#L10)

## Methods

### after()

> `abstract` **after**(`args`): `void`

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`void`

#### Source

[src/lib/shared/domain/observer.ts:12](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/observer.ts#L12)

***

### before()

> `abstract` **before**(`args`): `void`

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`void`

#### Source

[src/lib/shared/domain/observer.ts:11](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/observer.ts#L11)

***

### error()

> `abstract` **error**(`args`): `void`

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`void`

#### Source

[src/lib/shared/domain/observer.ts:13](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/observer.ts#L13)
