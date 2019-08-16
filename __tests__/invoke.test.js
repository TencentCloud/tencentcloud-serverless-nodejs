const LabelResourceNotFound = String('ResourceNotFound.FunctionName')

const sdk = require('../dist/index')
const secret = require('../secret.json')

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
  sdk.init({
    region,
    secretId: secret.secretId,
    secretKey: secret.secretKey
  })
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
  test(
    'Test Invoke Correct',
    async () => {
      const res = await sdk.invoke({
        region,
        secretId: secret.secretId,
        secretKey: secret.secretKey,
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
        region,
        secretId: secret.secretId,
        secretKey: secret.secretKey,
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
