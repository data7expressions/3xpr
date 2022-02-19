[Expressions](../README.md) / [manager](../modules/manager.md) / Expressions

# Class: Expressions

[manager](../modules/manager.md).Expressions

## Table of contents

### Constructors

- [constructor](manager.Expressions.md#constructor)

### Accessors

- [config](manager.Expressions.md#config)
- [parser](manager.Expressions.md#parser)
- [instance](manager.Expressions.md#instance)

### Methods

- [eval](manager.Expressions.md#eval)
- [parse](manager.Expressions.md#parse)

## Constructors

### constructor

• **new Expressions**()

#### Defined in

[manager/expressions.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/expressions.ts#L13)

## Accessors

### config

• `get` **config**(): [`ExpressionConfig`](parser.ExpressionConfig.md)

#### Returns

[`ExpressionConfig`](parser.ExpressionConfig.md)

#### Defined in

[manager/expressions.ts:33](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/expressions.ts#L33)

___

### parser

• `get` **parser**(): [`ParserManager`](parser.ParserManager.md)

#### Returns

[`ParserManager`](parser.ParserManager.md)

#### Defined in

[manager/expressions.ts:29](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/expressions.ts#L29)

___

### instance

• `Static` `get` **instance**(): [`Expressions`](manager.Expressions.md)

#### Returns

[`Expressions`](manager.Expressions.md)

#### Defined in

[manager/expressions.ts:22](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/expressions.ts#L22)

## Methods

### eval

▸ **eval**(`expression`, `data?`): `any`

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `data?` | `any` | Data with variables |

#### Returns

`any`

Result of the evaluale expression

#### Defined in

[manager/expressions.ts:60](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/expressions.ts#L60)

___

### parse

▸ **parse**(`expression`): [`Operand`](operand.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Operand`](operand.Operand.md)

#### Defined in

[manager/expressions.ts:37](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/expressions.ts#L37)
