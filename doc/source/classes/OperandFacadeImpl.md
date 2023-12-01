[Expressions](../README.md) / OperandFacadeImpl

# Class: OperandFacadeImpl

## Implements

- [`OperandFacade`](../interfaces/OperandFacade.md)

## Table of contents

### Constructors

- [constructor](OperandFacadeImpl.md#constructor)

### Properties

- [constBuilder](OperandFacadeImpl.md#constbuilder)

### Methods

- [build](OperandFacadeImpl.md#build)
- [clone](OperandFacadeImpl.md#clone)
- [getBuilder](OperandFacadeImpl.md#getbuilder)
- [parameters](OperandFacadeImpl.md#parameters)
- [type](OperandFacadeImpl.md#type)

## Constructors

### constructor

• **new OperandFacadeImpl**(`constBuilder`, `parameterService`, `operandBuild`, `operandClone`): [`OperandFacadeImpl`](OperandFacadeImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `constBuilder` | [`ConstBuilder`](../interfaces/ConstBuilder.md) |
| `parameterService` | [`ParameterService`](../interfaces/ParameterService.md) |
| `operandBuild` | [`OperandBuild`](OperandBuild.md) |
| `operandClone` | [`OperandClone`](OperandClone.md) |

#### Returns

[`OperandFacadeImpl`](OperandFacadeImpl.md)

#### Defined in

[src/lib/operand/application/facade.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/operand/application/facade.ts#L9)

## Properties

### constBuilder

• `Readonly` **constBuilder**: [`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Implementation of

[OperandFacade](../interfaces/OperandFacade.md).[constBuilder](../interfaces/OperandFacade.md#constbuilder)

#### Defined in

[src/lib/operand/application/facade.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/operand/application/facade.ts#L9)

## Methods

### build

▸ **build**(`expression`, `key?`): [`Operand`](Operand.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expression` | `string` | `undefined` |
| `key` | `string` | `'sync'` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[OperandFacade](../interfaces/OperandFacade.md).[build](../interfaces/OperandFacade.md#build)

#### Defined in

[src/lib/operand/application/facade.ts:38](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/operand/application/facade.ts#L38)

___

### clone

▸ **clone**(`source`, `key?`): [`Operand`](Operand.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `source` | [`Operand`](Operand.md) | `undefined` |
| `key` | `string` | `'sync'` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[OperandFacade](../interfaces/OperandFacade.md).[clone](../interfaces/OperandFacade.md#clone)

#### Defined in

[src/lib/operand/application/facade.ts:42](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/operand/application/facade.ts#L42)

___

### getBuilder

▸ **getBuilder**(`key`): [`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Implementation of

[OperandFacade](../interfaces/OperandFacade.md).[getBuilder](../interfaces/OperandFacade.md#getbuilder)

#### Defined in

[src/lib/operand/application/facade.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/operand/application/facade.ts#L14)

___

### parameters

▸ **parameters**(`expression`): [`Parameter`](../interfaces/Parameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`Parameter`](../interfaces/Parameter.md)[]

Parameters of expression

#### Implementation of

[OperandFacade](../interfaces/OperandFacade.md).[parameters](../interfaces/OperandFacade.md#parameters)

#### Defined in

[src/lib/operand/application/facade.ts:23](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/operand/application/facade.ts#L23)

___

### type

▸ **type**(`expression`): `string`

Get type of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

`string`

Type of expression

#### Implementation of

[OperandFacade](../interfaces/OperandFacade.md).[type](../interfaces/OperandFacade.md#type)

#### Defined in

[src/lib/operand/application/facade.ts:33](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/operand/application/facade.ts#L33)
