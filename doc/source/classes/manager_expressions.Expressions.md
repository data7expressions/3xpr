[Expressions](../README.md) / [manager/expressions](../modules/manager_expressions.md) / Expressions

# Class: Expressions

[manager/expressions](../modules/manager_expressions.md).Expressions

## Table of contents

### Constructors

- [constructor](manager_expressions.Expressions.md#constructor)

### Accessors

- [config](manager_expressions.Expressions.md#config)
- [parser](manager_expressions.Expressions.md#parser)
- [instance](manager_expressions.Expressions.md#instance)

### Methods

- [eval](manager_expressions.Expressions.md#eval)
- [parameters](manager_expressions.Expressions.md#parameters)
- [parse](manager_expressions.Expressions.md#parse)

## Constructors

### constructor

• **new Expressions**()

#### Defined in

[manager/expressions.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/manager/expressions.ts#L13)

## Accessors

### config

• `get` **config**(): [`ExpressionConfig`](parser.ExpressionConfig.md)

#### Returns

[`ExpressionConfig`](parser.ExpressionConfig.md)

#### Defined in

[manager/expressions.ts:33](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/manager/expressions.ts#L33)

___

### parser

• `get` **parser**(): [`ParserManager`](parser.ParserManager.md)

#### Returns

[`ParserManager`](parser.ParserManager.md)

#### Defined in

[manager/expressions.ts:29](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/manager/expressions.ts#L29)

___

### instance

• `Static` `get` **instance**(): [`Expressions`](manager_expressions.Expressions.md)

#### Returns

[`Expressions`](manager_expressions.Expressions.md)

#### Defined in

[manager/expressions.ts:22](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/manager/expressions.ts#L22)

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

[manager/expressions.ts:61](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/manager/expressions.ts#L61)

___

### parameters

▸ **parameters**(`expression`): [`Parameter`](../interfaces/model.Parameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`Parameter`](../interfaces/model.Parameter.md)[]

Parameters of expression

#### Defined in

[manager/expressions.ts:72](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/manager/expressions.ts#L72)

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

[manager/expressions.ts:37](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/manager/expressions.ts#L37)
