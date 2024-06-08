[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / OperandFacade

# Interface: OperandFacade

## Extends

- [`OperandCloner`](OperandCloner.md)

## Extended by

- [`Expressions`](Expressions.md)

## Properties

### constBuilder

> **constBuilder**: [`ConstBuilder`](ConstBuilder.md)

#### Source

[src/lib/operand/domain/services.ts:39](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L39)

## Methods

### build()

> **build**(`expression`, `key`?): [`Operand`](../classes/Operand.md)

#### Parameters

• **expression**: `string`

• **key?**: `string`

#### Returns

[`Operand`](../classes/Operand.md)

#### Source

[src/lib/operand/domain/services.ts:43](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L43)

***

### clone()

> **clone**(`source`, `key`?): [`Operand`](../classes/Operand.md)

#### Parameters

• **source**: [`Operand`](../classes/Operand.md)

• **key?**: `string`

#### Returns

[`Operand`](../classes/Operand.md)

#### Inherited from

[`OperandCloner`](OperandCloner.md).[`clone`](OperandCloner.md#clone)

#### Source

[src/lib/operand/domain/services.ts:35](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L35)

***

### getBuilder()

> **getBuilder**(`key`): [`OperandBuilder`](OperandBuilder.md)

#### Parameters

• **key**: `string`

#### Returns

[`OperandBuilder`](OperandBuilder.md)

#### Source

[src/lib/operand/domain/services.ts:40](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L40)

***

### parameters()

> **parameters**(`expression`): [`Parameter`](Parameter.md)[]

#### Parameters

• **expression**: `string`

#### Returns

[`Parameter`](Parameter.md)[]

#### Source

[src/lib/operand/domain/services.ts:41](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L41)

***

### type()

> **type**(`expression`): `string`

#### Parameters

• **expression**: `string`

#### Returns

`string`

#### Source

[src/lib/operand/domain/services.ts:42](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L42)
