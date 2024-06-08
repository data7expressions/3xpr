[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / PrototypeEvaluator

# Class: `abstract` PrototypeEvaluator

## Implements

- [`IEvaluator`](../interfaces/IEvaluator.md)

## Constructors

### new PrototypeEvaluator()

> **new PrototypeEvaluator**(`operand`?): [`PrototypeEvaluator`](PrototypeEvaluator.md)

#### Parameters

• **operand?**: [`Operand`](Operand.md)

#### Returns

[`PrototypeEvaluator`](PrototypeEvaluator.md)

#### Source

[src/lib/operand/domain/entities.ts:54](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L54)

## Methods

### clone()

> `abstract` **clone**(`operand`): [`IEvaluator`](../interfaces/IEvaluator.md)

#### Parameters

• **operand**: [`Operand`](Operand.md)

#### Returns

[`IEvaluator`](../interfaces/IEvaluator.md)

#### Source

[src/lib/operand/domain/entities.ts:55](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L55)

***

### eval()

> `abstract` **eval**(`context`): `any`

#### Parameters

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Implementation of

[`IEvaluator`](../interfaces/IEvaluator.md).[`eval`](../interfaces/IEvaluator.md#eval)

#### Source

[src/lib/operand/domain/entities.ts:56](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L56)

***

### evalAsync()

> `abstract` **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

• **context**: [`Context`](Context.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`IEvaluator`](../interfaces/IEvaluator.md).[`evalAsync`](../interfaces/IEvaluator.md#evalasync)

#### Source

[src/lib/operand/domain/entities.ts:57](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L57)
