[Expressions](../README.md) / OperandClone

# Class: OperandClone

## Implements

- [`OperandCloner`](../interfaces/OperandCloner.md)

## Table of contents

### Constructors

- [constructor](OperandClone.md#constructor)

### Methods

- [clone](OperandClone.md#clone)

## Constructors

### constructor

• **new OperandClone**(`factories`): [`OperandClone`](OperandClone.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `factories` | [`string`, [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)][] |

#### Returns

[`OperandClone`](OperandClone.md)

#### Defined in

[src/lib/operand/application/useCases/clone.ts:5](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/operand/application/useCases/clone.ts#L5)

## Methods

### clone

▸ **clone**(`operand`, `type`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |
| `type` | `string` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[OperandCloner](../interfaces/OperandCloner.md).[clone](../interfaces/OperandCloner.md#clone)

#### Defined in

[src/lib/operand/application/useCases/clone.ts:15](https://github.com/data7expressions/3xpr/blob/418dbf851deea161666265a0dc4715e3f1fa01b7/src/lib/operand/application/useCases/clone.ts#L15)
