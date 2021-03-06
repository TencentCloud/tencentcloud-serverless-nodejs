# Tencentcloud-Serverless-Nodejs

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/tencentcloud-serverless-nodejs.svg?style=flat)](https://www.npmjs.com/package/tencentcloud-serverless-nodejs)
[![NODE Version](https://img.shields.io/node/v/tencentcloud-serverless-nodejs.svg)](https://www.npmjs.com/package/tencentcloud-serverless-nodejs)
[![CircleCI](https://circleci.com/gh/TencentCloud/tencentcloud-serverless-nodejs/tree/master.svg?style=svg)](https://circleci.com/gh/TencentCloud/tencentcloud-serverless-nodejs/tree/master)
[![codecov](https://codecov.io/gh/TencentCloud/tencentcloud-serverless-nodejs/branch/master/graph/badge.svg)](https://codecov.io/gh/TencentCloud/tencentcloud-serverless-nodejs)

腾讯云云函数SDK，集成云函数业务流接口

## Install
```shell
npm install tencentcloud-serverless-nodejs
```

## Example
```javascript
const sdk = require('tencentcloud-serverless-nodejs')

sdk.init({
  region: 'ap-guangzhou'
}) // 如果sdk运行在云函数中，初始化时可以不传secretId,secretKey

sdk.invoke({
  functionName: 'test',
  qualifier: '$LATEST',
  data: JSON.stringify({
    key:'value'
  }),
  namespace:'default'
})
```

## API Reference
- [Init](#Init) 
- [Invoke](#Invoke)

### Init

**init(Params, ExtraParams)**

使用SDK前，可以选择初始化SDK，这个并不是强制要求的操作，只是为了方便调用API接口时，复用初始化的配置。参数中undefined的值会被忽略。

**Params:**

| 参数名    | 是否必填 |  类型  |                                       描述 |
| :-------- | :------: | :----: | -----------------------------------------: |
| region    |    否    | string |                                       地域 |
| secretId  |    否    | string |  默认会取process.env.TENCENTCLOUD_SECRETID |
| secretKey |    否    | string | 默认会取process.env.TENCENTCLOUD_SECRETKEY |
| token |    否    | string | 默认会取process.env.TENCENTCLOUD_SESSIONTOKEN |

**ExtraParams:**

| 参数名    | 是否必填 |  类型  |                                       描述 |
| :-------- | :------: | :----: | -----------------------------------------: |
| forever    |    否    | boolean |   是否开启keep-alive |
| time  |    否    | boolean |  是否打印请求耗时统计 |

### Invoke

**invoke(Params, ExtraParams)**

调用函数。暂时只支持同步调用。参数中undefined的值会被忽略。

**Params:**

| 参数名       | 是否必填 |  类型  |                    描述 |
| :----------- | :------: | :----: | ----------------------: |
| functionName |    是    | string |                函数名称 |
| qualifier    |    否    | string | 函数版本，默认为$LATEST |
| data         |    否    | string |            函数运行入参 |
| namespace    |    否    | string | 命名空间，默认为default |
| region    |    否    | string |                                       地域 |
| secretId  |    否    | string |  默认会取process.env.TENCENTCLOUD_SECRETID |
| secretKey |    否    | string | 默认会取process.env.TENCENTCLOUD_SECRETKEY |
| token |    否    | string | 默认会取process.env.TENCENTCLOUD_SESSIONTOKEN |

**ExtraParams:**

| 参数名    | 是否必填 |  类型  |                                       描述 |
| :-------- | :------: | :----: | -----------------------------------------: |
| forever    |    否    | boolean |                                       是否开启keep-alive |
| time  |    否    | boolean |  是否打印请求耗时统计 |

**Return:**

正常调用的返回结果为**被调用**的云函数的返回值。

错误调用的返回结果不会从SDK中抛出异常，固定为以下返回类型:
```typescript
{
  error: {
    code: string
    message: string
  }
  requestId: string
}
```


## TODO List
* [ ] 支持管理流接口

## Licence

[MIT](./LICENSE)
