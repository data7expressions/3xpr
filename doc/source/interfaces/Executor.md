[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / Executor

# Interface: Executor

## Extended by

- [`Expressions`](Expressions.md)

## Methods

### eval()

> **eval**(`expression`, `data`?): `any`

#### Parameters

• **expression**: `string`

• **data?**: `any`

#### Returns

`any`

#### Source

[src/lib/expression/domain/expressions.ts:6](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L6)

***

### evalAsync()

> **evalAsync**(`expression`, `data`?): `Promise`\<`any`\>

#### Parameters

• **expression**: `string`

• **data?**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/expression/domain/expressions.ts:7](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L7)

***

### execute()

> **execute**(`task`, `data`?): `Promise`\<`any`\>

#### Parameters

• **task**: `string`

• **data?**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/expression/domain/expressions.ts:8](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L8)
