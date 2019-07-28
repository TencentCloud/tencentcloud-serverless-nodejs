const LabelResourceNotFound = String('ResourceNotFound.FunctionName')

const sdk = require('../dist/index')

sdk.init({
  region: 'ap-guangzhou'
})

describe('Test Api', () => {
  test(
    'Test Invoke Correct',
    async () => {
      const res = await sdk.invoke({
        functionName: 'test',
        data: JSON.stringify({
          retMsg: 'test'
        })
      })
      expect(res).toBe(JSON.stringify('test'))
    },
    10 * 1000
  )

  test(
    'Test Invoke Error',
    async () => {
      const res = await sdk.invoke({
        functionName: 'fake_function',
        data: JSON.stringify({
          retMsg: 'test'
        })
      })
      expect(res.error.code).toBe(LabelResourceNotFound)
    },
    10 * 1000
  )
})
