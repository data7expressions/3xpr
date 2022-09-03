[Expressions](../README.md) / [manager/expressions](../modules/manager_expressions.md) / Expressions

# Class: Expressions

[manager/expressions](../modules/manager_expressions.md).Expressions

## Table of contents

### Constructors

- [constructor](manager_expressions.Expressions.md#constructor)

### Accessors

- [config](manager_expressions.Expressions.md#config)
- [operand](manager_expressions.Expressions.md#operand)
- [parser](manager_expressions.Expressions.md#parser)
- [instance](manager_expressions.Expressions.md#instance)

### Methods

- [eval](manager_expressions.Expressions.md#eval)
- [parameters](manager_expressions.Expressions.md#parameters)
- [parse](manager_expressions.Expressions.md#parse)
- [subscribe](manager_expressions.Expressions.md#subscribe)
- [unsubscribe](manager_expressions.Expressions.md#unsubscribe)

## Constructors

### constructor

• **new Expressions**()

#### Defined in

[manager/expressions.ts:14](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L14)

## Accessors

### config

• `get` **config**(): [`ExpressionConfig`](parser.ExpressionConfig.md)

#### Returns

[`ExpressionConfig`](parser.ExpressionConfig.md)

#### Defined in

[manager/expressions.ts:34](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L34)

___

### operand

• `get` **operand**(): [`OperandManager`](operand.OperandManager.md)

#### Returns

[`OperandManager`](operand.OperandManager.md)

#### Defined in

[manager/expressions.ts:38](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L38)

___

### parser

• `get` **parser**(): [`ParserManager`](parser.ParserManager.md)

#### Returns

[`ParserManager`](parser.ParserManager.md)

#### Defined in

[manager/expressions.ts:30](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L30)

___

### instance

• `Static` `get` **instance**(): [`Expressions`](manager_expressions.Expressions.md)

#### Returns

[`Expressions`](manager_expressions.Expressions.md)

#### Defined in

[manager/expressions.ts:23](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L23)

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

Result of the evaluate expression

#### Defined in

[manager/expressions.ts:75](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L75)

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

[manager/expressions.ts:64](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L64)

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

[manager/expressions.ts:42](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L42)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](model.ActionObserver.md) |

#### Returns

`void`

#### Defined in

[manager/expressions.ts:90](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L90)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](model.ActionObserver.md) |

#### Returns

`void`

#### Defined in

[manager/expressions.ts:94](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/manager/expressions.ts#L94)
