[Expressions](../README.md) / Token

# Class: Token

## Table of contents

### Constructors

- [constructor](Token.md#constructor)

### Properties

- [id](Token.md#id)
- [isBreak](Token.md#isbreak)
- [listeners](Token.md#listeners)
- [signals](Token.md#signals)
- [stack](Token.md#stack)

### Methods

- [addListener](Token.md#addlistener)
- [addSignal](Token.md#addsignal)
- [clearListeners](Token.md#clearlisteners)
- [clearSignals](Token.md#clearsignals)

## Constructors

### constructor

• **new Token**(): [`Token`](Token.md)

#### Returns

[`Token`](Token.md)

#### Defined in

[src/lib/shared/domain/context.ts:58](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L58)

## Properties

### id

• **id**: `string`

#### Defined in

[src/lib/shared/domain/context.ts:52](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L52)

___

### isBreak

• **isBreak**: `boolean`

#### Defined in

[src/lib/shared/domain/context.ts:54](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L54)

___

### listeners

• **listeners**: `string`[]

#### Defined in

[src/lib/shared/domain/context.ts:55](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L55)

___

### signals

• **signals**: `string`[]

#### Defined in

[src/lib/shared/domain/context.ts:56](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L56)

___

### stack

• **stack**: `any`

#### Defined in

[src/lib/shared/domain/context.ts:53](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L53)

## Methods

### addListener

▸ **addListener**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/context.ts:66](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L66)

___

### addSignal

▸ **addSignal**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/context.ts:76](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L76)

___

### clearListeners

▸ **clearListeners**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/context.ts:71](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L71)

___

### clearSignals

▸ **clearSignals**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/context.ts:80](https://github.com/data7expressions/3xpr/blob/75bc908120831b89f4db473368191027448620e2/src/lib/shared/domain/context.ts#L80)
