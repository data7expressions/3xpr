[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / Operand

# Class: Operand

## Constructors

### new Operand()

> **new Operand**(`pos`, `name`, `type`, `children`, `returnType`?): [`Operand`](Operand.md)

#### Parameters

• **pos**: [`Position`](Position.md)

• **name**: `any`

• **type**: [`OperandType`](../enumerations/OperandType.md)

• **children**: [`Operand`](Operand.md)[]= `[]`

• **returnType?**: `Type`

#### Returns

[`Operand`](Operand.md)

#### Source

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L48)

## Properties

### children

> **children**: [`Operand`](Operand.md)[] = `[]`

#### Source

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L48)

***

### evaluator?

> `optional` **evaluator**: [`IEvaluator`](../interfaces/IEvaluator.md)

#### Source

[src/lib/shared/domain/operand.ts:44](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L44)

***

### id?

> `optional` **id**: `string`

#### Source

[src/lib/shared/domain/operand.ts:46](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L46)

***

### name

> **name**: `any`

#### Source

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L48)

***

### number?

> `optional` **number**: `number`

#### Source

[src/lib/shared/domain/operand.ts:45](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L45)

***

### pos

> `readonly` **pos**: [`Position`](Position.md)

#### Source

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L48)

***

### returnType?

> `optional` **returnType**: `Type`

#### Source

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L48)

***

### type

> `readonly` **type**: [`OperandType`](../enumerations/OperandType.md)

#### Source

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L48)

## Methods

### eval()

> **eval**(`context`): `any`

#### Parameters

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Source

[src/lib/shared/domain/operand.ts:49](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L49)

***

### evalAsync()

> **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

• **context**: [`Context`](Context.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/shared/domain/operand.ts:56](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L56)

***

### isAsync()

> **isAsync**(): `boolean`

#### Returns

`boolean`

#### Source

[src/lib/shared/domain/operand.ts:63](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L63)

***

### solve()

> **solve**(`context`): `Promise`\<`any`\>

#### Parameters

• **context**: [`Context`](Context.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/shared/domain/operand.ts:67](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/shared/domain/operand.ts#L67)
