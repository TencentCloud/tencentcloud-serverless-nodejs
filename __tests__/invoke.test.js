const LabelResourceNotFound = String('ResourceNotFound.FunctionName')

const sdk = require('../dist/index')

const extraParams = {
  forever: true,
  time: true,
  strictSSL: false
}

let secret = {
  secretId: process.env.TENCENTCLOUD_SECRETID,
  secretKey: process.env.TENCENTCLOUD_SECRETKEY
}
try {
  const secretJson = require('../secret.json')
  secret = {
    secretId: secretJson.secretId,
    secretKey: secretJson.secretKey
  }
  process.env.TENCENTCLOUD_SECRETID = secretJson.secretId
  process.env.TENCENTCLOUD_SECRETKEY = secretJson.secretKey
} catch (e) {
  console.log(e)
}

const region = 'ap-guangzhou'
const functionReturnCorrect = {
  functionName: 'tencentcloud-serverless-nodejs__correct',
  version: '$LATEST',
  namespace: 'jestForSDK',
  clientContext: {
    retMsg: 'test'
  }
}
const functionReturnError = {
  functionName: 'tencentcloud-serverless-nodejs__error',
  version: '$LATEST',
  clientContext: {
    retMsg: 'test'
  }
}

describe('Test Api With Init', () => {
  sdk.init(
    {
      region,
      secretId: secret.secretId,
      secretKey: secret.secretKey
    },
    extraParams
  )
  test(
    'Test Invoke Correct',
    async () => {
      const res = await sdk.invoke({
        functionName: functionReturnCorrect.functionName,
        version: functionReturnCorrect.version,
        data: JSON.stringify(functionReturnCorrect.clientContext),
        namespace: functionReturnCorrect.namespace
      })
      expect(res).toBe(JSON.stringify('test'))
    },
    10 * 1000
  )

  test(
    'Test Invoke Error',
    async () => {
      const res = await sdk.invoke({
        functionName: functionReturnError.functionName,
        version: functionReturnError.version,
        data: JSON.stringify(functionReturnError.clientContext),
        namespace: functionReturnError.namespace
      })
      expect(res.error.code).toBe(LabelResourceNotFound)
    },
    10 * 1000
  )
})

describe('Test Api Without Init', () => {
  beforeEach(() => {
    sdk._reset()
  })

  test(
    'Test Invoke Correct With secret dominantly',
    async () => {
      const res = await sdk.invoke(
        {
          region,
          secretId: secret.secretId,
          secretKey: secret.secretKey,
          token: undefined,
          functionName: functionReturnCorrect.functionName,
          version: functionReturnCorrect.version,
          data: JSON.stringify(functionReturnCorrect.clientContext),
          namespace: functionReturnCorrect.namespace
        },
        extraParams
      )
      expect(res).toBe(JSON.stringify('test'))
    },
    10 * 1000
  )
  test(
    'Test Invoke Correct With secret implicitly',
    async () => {
      const res = await sdk.invoke(
        {
          functionName: functionReturnCorrect.functionName,
          version: functionReturnCorrect.version,
          data: JSON.stringify(functionReturnCorrect.clientContext),
          namespace: functionReturnCorrect.namespace
        },
        extraParams
      )
      expect(res).toBe(JSON.stringify('test'))
    },
    10 * 1000
  )

  test(
    'Test Invoke Error With secret dominantly',
    async () => {
      const res = await sdk.invoke(
        {
          region,
          secretId: secret.secretId,
          secretKey: secret.secretKey,
          token: undefined,
          functionName: functionReturnError.functionName,
          version: functionReturnError.version,
          data: JSON.stringify(functionReturnError.clientContext),
          namespace: functionReturnError.namespace
        },
        extraParams
      )
      expect(res.error.code).toBe(LabelResourceNotFound)
    },
    10 * 1000
  )
  test(
    'Test Invoke Error With secret implicitly',
    async () => {
      const res = await sdk.invoke(
        {
          functionName: functionReturnError.functionName,
          version: functionReturnError.version,
          data: JSON.stringify(functionReturnError.clientContext),
          namespace: functionReturnError.namespace
        },
        extraParams
      )
      expect(res.error.code).toBe(LabelResourceNotFound)
    },
    10 * 1000
  )
})
