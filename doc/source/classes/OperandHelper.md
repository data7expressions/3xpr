[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / OperandHelper

# Class: OperandHelper

## Constructors

### new OperandHelper()

> **new OperandHelper**(`constBuilder`): [`OperandHelper`](OperandHelper.md)

#### Parameters

• **constBuilder**: [`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Returns

[`OperandHelper`](OperandHelper.md)

#### Source

[src/lib/operand/infrastructure/helper.ts:6](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L6)

## Methods

### avg()

> **avg**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **aggregate**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

`number`

#### Source

[src/lib/operand/infrastructure/helper.ts:246](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L246)

***

### count()

> **count**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **aggregate**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

`number`

#### Source

[src/lib/operand/infrastructure/helper.ts:185](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L185)

***

### findAggregates()

> **findAggregates**(`operand`): [`Operand`](Operand.md)[]

#### Parameters

• **operand**: [`Operand`](Operand.md)

#### Returns

[`Operand`](Operand.md)[]

#### Source

[src/lib/operand/infrastructure/helper.ts:134](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L134)

***

### first()

> **first**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **aggregate**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Source

[src/lib/operand/infrastructure/helper.ts:197](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L197)

***

### getKeys()

> **getKeys**(`variable`, `fields`, `list`, `context`): `any`[]

#### Parameters

• **variable**: [`Operand`](Operand.md)

• **fields**: [`Operand`](Operand.md)[]

• **list**: `any`[]

• **context**: [`Context`](Context.md)

#### Returns

`any`[]

#### Source

[src/lib/operand/infrastructure/helper.ts:92](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L92)

***

### haveAggregates()

> **haveAggregates**(`operand`): `boolean`

#### Parameters

• **operand**: [`Operand`](Operand.md)

#### Returns

`boolean`

#### Source

[src/lib/operand/infrastructure/helper.ts:121](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L121)

***

### last()

> **last**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **aggregate**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Source

[src/lib/operand/infrastructure/helper.ts:208](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L208)

***

### max()

> **max**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **aggregate**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Source

[src/lib/operand/infrastructure/helper.ts:220](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L220)

***

### min()

> **min**(`list`, `variable`, `aggregate`, `context`): `any`

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **aggregate**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Source

[src/lib/operand/infrastructure/helper.ts:233](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L233)

***

### objectKey()

> **objectKey**(`obj`): `any`

#### Parameters

• **obj**: `any`

#### Returns

`any`

#### Source

[src/lib/operand/infrastructure/helper.ts:82](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L82)

***

### solveAggregates()

> **solveAggregates**(`list`, `variable`, `operand`, `context`): [`Operand`](Operand.md)

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **operand**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

[`Operand`](Operand.md)

#### Source

[src/lib/operand/infrastructure/helper.ts:150](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L150)

***

### sum()

> **sum**(`list`, `variable`, `aggregate`, `context`): `number`

#### Parameters

• **list**: `any`[]

• **variable**: [`Operand`](Operand.md)

• **aggregate**: [`Operand`](Operand.md)

• **context**: [`Context`](Context.md)

#### Returns

`number`

#### Source

[src/lib/operand/infrastructure/helper.ts:259](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L259)

***

### toExpression()

> **toExpression**(`operand`): `string`

#### Parameters

• **operand**: [`Operand`](Operand.md)

#### Returns

`string`

#### Source

[src/lib/operand/infrastructure/helper.ts:8](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/infrastructure/helper.ts#L8)
