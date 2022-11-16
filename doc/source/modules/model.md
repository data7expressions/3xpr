[Expressions](../README.md) / model

# Module: model

## Table of contents

### Enumerations

- [OperatorType](../enums/model.OperatorType.md)

### Classes

- [ActionObserver](../classes/model.ActionObserver.md)
- [Context](../classes/model.Context.md)
- [Data](../classes/model.Data.md)
- [Operand](../classes/model.Operand.md)

### Interfaces

- [ActionObserverArgs](../interfaces/model.ActionObserverArgs.md)
- [ArrayType](../interfaces/model.ArrayType.md)
- [Cache](../interfaces/model.Cache.md)
- [Format](../interfaces/model.Format.md)
- [IExpressionConfig](../interfaces/model.IExpressionConfig.md)
- [IOperandBuilder](../interfaces/model.IOperandBuilder.md)
- [IOperandTypeManager](../interfaces/model.IOperandTypeManager.md)
- [IParserManager](../interfaces/model.IParserManager.md)
- [ISerializer](../interfaces/model.ISerializer.md)
- [ObjectType](../interfaces/model.ObjectType.md)
- [OperandMetadata](../interfaces/model.OperandMetadata.md)
- [OperatorMetadata](../interfaces/model.OperatorMetadata.md)
- [Parameter](../interfaces/model.Parameter.md)
- [PropertyType](../interfaces/model.PropertyType.md)

### Type aliases

- [PrimitiveType](model.md#primitivetype)
- [Type](model.md#type)

## Type aliases

### PrimitiveType

Ƭ **PrimitiveType**: ``"string"`` \| ``"integer"`` \| ``"decimal"`` \| ``"number"`` \| ``"boolean"`` \| ``"date"`` \| ``"datetime"`` \| ``"time"`` \| ``"any"`` \| ``"void"``

#### Defined in

[model/type.ts:1](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/type.ts#L1)

___

### Type

Ƭ **Type**: [`PrimitiveType`](model.md#primitivetype) \| [`ObjectType`](../interfaces/model.ObjectType.md) \| [`ArrayType`](../interfaces/model.ArrayType.md)

#### Defined in

[model/type.ts:3](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/type.ts#L3)
