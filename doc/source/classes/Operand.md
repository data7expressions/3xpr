[Expressions](../README.md) / Operand

# Class: Operand

## Table of contents

### Constructors

- [constructor](Operand.md#constructor)

### Properties

- [children](Operand.md#children)
- [evaluator](Operand.md#evaluator)
- [id](Operand.md#id)
- [name](Operand.md#name)
- [number](Operand.md#number)
- [pos](Operand.md#pos)
- [returnType](Operand.md#returntype)
- [type](Operand.md#type)

### Methods

- [eval](Operand.md#eval)
- [evalAsync](Operand.md#evalasync)
- [isAsync](Operand.md#isasync)
- [solve](Operand.md#solve)

## Constructors

### constructor

• **new Operand**(`pos`, `name`, `type`, `children?`, `returnType?`): [`Operand`](Operand.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pos` | [`Position`](Position.md) | `undefined` |
| `name` | `any` | `undefined` |
| `type` | [`OperandType`](../enums/OperandType.md) | `undefined` |
| `children` | [`Operand`](Operand.md)[] | `[]` |
| `returnType?` | `Type` | `undefined` |

#### Returns

[`Operand`](Operand.md)

#### Defined in

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L48)

## Properties

### children

• **children**: [`Operand`](Operand.md)[] = `[]`

#### Defined in

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L48)

___

### evaluator

• `Optional` **evaluator**: [`IEvaluator`](../interfaces/IEvaluator.md)

#### Defined in

[src/lib/shared/domain/operand.ts:44](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L44)

___

### id

• `Optional` **id**: `string`

#### Defined in

[src/lib/shared/domain/operand.ts:46](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L46)

___

### name

• **name**: `any`

#### Defined in

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L48)

___

### number

• `Optional` **number**: `number`

#### Defined in

[src/lib/shared/domain/operand.ts:45](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L45)

___

### pos

• `Readonly` **pos**: [`Position`](Position.md)

#### Defined in

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L48)

___

### returnType

• `Optional` **returnType**: `Type`

#### Defined in

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L48)

___

### type

• `Readonly` **type**: [`OperandType`](../enums/OperandType.md)

#### Defined in

[src/lib/shared/domain/operand.ts:48](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L48)

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/shared/domain/operand.ts:49](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L49)

___

### evalAsync

▸ **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/shared/domain/operand.ts:56](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L56)

___

### isAsync

▸ **isAsync**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/shared/domain/operand.ts:63](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L63)

___

### solve

▸ **solve**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/shared/domain/operand.ts:67](https://github.com/data7expressions/3xpr/blob/383dad40c3415837443b6ccd0c7960abae2de02b/src/lib/shared/domain/operand.ts#L67)
