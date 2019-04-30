const { default: sdk } = require('../dist/index')

sdk.init({
  region: 'ap-guangzhou'
})

describe('Test Api', () => {
  test('Test Invoke', async () => {
    const res = await sdk.invoke({
      functionName: 'test',
      clientContext: JSON.stringify({
        retMsg: 'test'
      })
    })
    expect(res.Response.Result.RetMsg).toBe(JSON.stringify('test'))
  })
})
