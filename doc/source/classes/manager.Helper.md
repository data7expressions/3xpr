[Expressions](../README.md) / [manager](../modules/manager.md) / Helper

# Class: Helper

[manager](../modules/manager.md).Helper

## Table of contents

### Constructors

- [constructor](manager.Helper.md#constructor)

### Methods

- [copyFile](manager.Helper.md#copyfile)
- [createIfNotExists](manager.Helper.md#createifnotexists)
- [exec](manager.Helper.md#exec)
- [existsPath](manager.Helper.md#existspath)
- [getType](manager.Helper.md#gettype)
- [isEmpty](manager.Helper.md#isempty)
- [isObject](manager.Helper.md#isobject)
- [lstat](manager.Helper.md#lstat)
- [mkdir](manager.Helper.md#mkdir)
- [nvl](manager.Helper.md#nvl)
- [readFile](manager.Helper.md#readfile)
- [removeFile](manager.Helper.md#removefile)
- [replace](manager.Helper.md#replace)
- [tryParse](manager.Helper.md#tryparse)
- [writeFile](manager.Helper.md#writefile)

## Constructors

### constructor

• **new Helper**()

## Methods

### copyFile

▸ `Static` **copyFile**(`src`, `dest`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `dest` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/helper.ts:85](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L85)

___

### createIfNotExists

▸ `Static` **createIfNotExists**(`fullPath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/helper.ts:64](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L64)

___

### exec

▸ `Static` **exec**(`command`, `cwd?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |
| `cwd` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/helper.ts:41](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L41)

___

### existsPath

▸ `Static` **existsPath**(`fullPath`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[manager/helper.ts:52](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L52)

___

### getType

▸ `Static` **getType**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

[manager/helper.ts:12](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L12)

___

### isEmpty

▸ `Static` **isEmpty**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[manager/helper.ts:25](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L25)

___

### isObject

▸ `Static` **isObject**(`obj`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`boolean`

#### Defined in

[manager/helper.ts:21](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L21)

___

### lstat

▸ `Static` **lstat**(`fullPath`): `Promise`<`Stats`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`Stats`\>

#### Defined in

[manager/helper.ts:110](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L110)

___

### mkdir

▸ `Static` **mkdir**(`fullPath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/helper.ts:104](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L104)

___

### nvl

▸ `Static` **nvl**(`value`, `_default`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `_default` | `any` |

#### Returns

`any`

#### Defined in

[manager/helper.ts:29](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L29)

___

### readFile

▸ `Static` **readFile**(`filePath`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[manager/helper.ts:71](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L71)

___

### removeFile

▸ `Static` **removeFile**(`fullPath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/helper.ts:78](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L78)

___

### replace

▸ `Static` **replace**(`string`, `search`, `replace`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |
| `search` | `string` |
| `replace` | `string` |

#### Returns

`string`

#### Defined in

[manager/helper.ts:6](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L6)

___

### tryParse

▸ `Static` **tryParse**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`any`

#### Defined in

[manager/helper.ts:33](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L33)

___

### writeFile

▸ `Static` **writeFile**(`filePath`, `content`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |
| `content` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/helper.ts:94](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/manager/helper.ts#L94)
