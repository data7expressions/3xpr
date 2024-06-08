[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / Evaluator

# Class: `abstract` Evaluator

## Implements

- [`IEvaluator`](../interfaces/IEvaluator.md)

## Constructors

### new Evaluator()

> **new Evaluator**(`operand`): [`Evaluator`](Evaluator.md)

#### Parameters

• **operand**: [`Operand`](Operand.md)

#### Returns

[`Evaluator`](Evaluator.md)

#### Source

[src/lib/operand/domain/entities.ts:28](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L28)

## Methods

### eval()

> `abstract` **eval**(`context`): `any`

#### Parameters

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Implementation of

[`IEvaluator`](../interfaces/IEvaluator.md).[`eval`](../interfaces/IEvaluator.md#eval)

#### Source

[src/lib/operand/domain/entities.ts:29](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L29)

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

[src/lib/operand/domain/entities.ts:30](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L30)

***

### isAsync()

> **isAsync**(): `boolean`

#### Returns

`boolean`

#### Source

[src/lib/operand/domain/entities.ts:39](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/entities.ts#L39)
