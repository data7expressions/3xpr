[Expressions](../README.md) / OperandFacade

# Interface: OperandFacade

## Hierarchy

- [`OperandCloner`](OperandCloner.md)

  ↳ **`OperandFacade`**

  ↳↳ [`Expressions`](Expressions.md)

## Implemented by

- [`OperandFacadeImpl`](../classes/OperandFacadeImpl.md)

## Table of contents

### Properties

- [constBuilder](OperandFacade.md#constbuilder)

### Methods

- [build](OperandFacade.md#build)
- [clone](OperandFacade.md#clone)
- [getBuilder](OperandFacade.md#getbuilder)
- [parameters](OperandFacade.md#parameters)
- [type](OperandFacade.md#type)

## Properties

### constBuilder

• **constBuilder**: [`ConstBuilder`](ConstBuilder.md)

#### Defined in

[src/lib/operand/domain/services.ts:39](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/operand/domain/services.ts#L39)

## Methods

### build

▸ **build**(`expression`, `key?`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `key?` | `string` |

#### Returns

[`Operand`](../classes/Operand.md)

#### Defined in

[src/lib/operand/domain/services.ts:43](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/operand/domain/services.ts#L43)

___

### clone

▸ **clone**(`source`, `key?`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Operand`](../classes/Operand.md) |
| `key?` | `string` |

#### Returns

[`Operand`](../classes/Operand.md)

#### Inherited from

[OperandCloner](OperandCloner.md).[clone](OperandCloner.md#clone)

#### Defined in

[src/lib/operand/domain/services.ts:35](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/operand/domain/services.ts#L35)

___

### getBuilder

▸ **getBuilder**(`key`): [`OperandBuilder`](OperandBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`OperandBuilder`](OperandBuilder.md)

#### Defined in

[src/lib/operand/domain/services.ts:40](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/operand/domain/services.ts#L40)

___

### parameters

▸ **parameters**(`expression`): [`Parameter`](Parameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Parameter`](Parameter.md)[]

#### Defined in

[src/lib/operand/domain/services.ts:41](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/operand/domain/services.ts#L41)

___

### type

▸ **type**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/operand/domain/services.ts:42](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/operand/domain/services.ts#L42)
