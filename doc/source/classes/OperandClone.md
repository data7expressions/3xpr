[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / OperandClone

# Class: OperandClone

## Implements

- [`OperandCloner`](../interfaces/OperandCloner.md)

## Constructors

### new OperandClone()

> **new OperandClone**(`factories`): [`OperandClone`](OperandClone.md)

#### Parameters

• **factories**: [`string`, [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)][]

#### Returns

[`OperandClone`](OperandClone.md)

#### Source

[src/lib/operand/application/useCases/clone.ts:5](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/useCases/clone.ts#L5)

## Methods

### clone()

> **clone**(`operand`, `type`): [`Operand`](Operand.md)

#### Parameters

• **operand**: [`Operand`](Operand.md)

• **type**: `string`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`OperandCloner`](../interfaces/OperandCloner.md).[`clone`](../interfaces/OperandCloner.md#clone)

#### Source

[src/lib/operand/application/useCases/clone.ts:15](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/useCases/clone.ts#L15)
