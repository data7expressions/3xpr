[Expressions](../README.md) / OperandBuild

# Class: OperandBuild

## Table of contents

### Constructors

- [constructor](OperandBuild.md#constructor)

### Methods

- [add](OperandBuild.md#add)
- [build](OperandBuild.md#build)
- [get](OperandBuild.md#get)

## Constructors

### constructor

• **new OperandBuild**(): [`OperandBuild`](OperandBuild.md)

#### Returns

[`OperandBuild`](OperandBuild.md)

#### Defined in

[src/lib/operand/application/useCases/build.ts:6](https://github.com/FlavioLionelRita/3xpr/blob/ec38cc3/src/lib/operand/application/useCases/build.ts#L6)

## Methods

### add

▸ **add**(`key`, `builder`): [`OperandBuild`](OperandBuild.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `builder` | [`OperandBuilder`](../interfaces/OperandBuilder.md) |

#### Returns

[`OperandBuild`](OperandBuild.md)

#### Defined in

[src/lib/operand/application/useCases/build.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/ec38cc3/src/lib/operand/application/useCases/build.ts#L10)

___

### build

▸ **build**(`expression`, `key?`): [`Operand`](Operand.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expression` | `string` | `undefined` |
| `key` | `string` | `'expression'` |

#### Returns

[`Operand`](Operand.md)

#### Defined in

[src/lib/operand/application/useCases/build.ts:19](https://github.com/FlavioLionelRita/3xpr/blob/ec38cc3/src/lib/operand/application/useCases/build.ts#L19)

___

### get

▸ **get**(`key`): [`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Defined in

[src/lib/operand/application/useCases/build.ts:15](https://github.com/FlavioLionelRita/3xpr/blob/ec38cc3/src/lib/operand/application/useCases/build.ts#L15)
