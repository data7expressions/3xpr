[Expressions](../README.md) / ExpressionParse

# Class: ExpressionParse

## Table of contents

### Constructors

- [constructor](ExpressionParse.md#constructor)

### Methods

- [parse](ExpressionParse.md#parse)

## Constructors

### constructor

• **new ExpressionParse**(`model`): [`ExpressionParse`](ExpressionParse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`ModelService`](../interfaces/ModelService.md) |

#### Returns

[`ExpressionParse`](ExpressionParse.md)

#### Defined in

[src/lib/operand/application/services/parser.ts:703](https://github.com/data7expressions/3xpr/blob/67c52f7411be29dd217e3e83f8162cdf62d63d02/src/lib/operand/application/services/parser.ts#L703)

## Methods

### parse

▸ **parse**(`expression`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | [`string`, `number`, `number`][] |

#### Returns

[`Operand`](Operand.md)

#### Defined in

[src/lib/operand/application/services/parser.ts:705](https://github.com/data7expressions/3xpr/blob/67c52f7411be29dd217e3e83f8162cdf62d63d02/src/lib/operand/application/services/parser.ts#L705)
