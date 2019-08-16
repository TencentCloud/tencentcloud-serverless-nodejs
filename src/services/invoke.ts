import { caseForObject, uniteRes } from '../helper/utils'
import { APIV3Res, APIV3Error, InitConfig } from '../helper/types'

interface Params {
  /**函数名 */
  functionName: string
  /**版本/别名 */
  qualifier?: string
  /**运行函数的参数 */
  data?: string
  /**函数所在命名空间 */
  namespace?: string
}

type Res = APIV3Res<{
  Result: {
    MemUsage: number
    FunctionRequestId: string
    RetMsg: string
    Duration: number
    ErrMsg: string
    BillDuration: number
    InvokeResult: number
    Log: string
  }
}> &
  APIV3Error

/**
 * 第一期只支持同步调用
 * @param params
 */
export default async function(params: Params & InitConfig): Promise<Res> {
  const config = this.config
  if (!config)
    this.init({
      secretId: params.secretId,
      secretKey: params.secretKey,
      token: params.token,
      region: params.region
    })

  const requestHelper = this.requestHelper
  const region = config.region

  // 区分默认参数，可配置参数，不可配置参数
  let __params = Object.assign(
    {
      region,
      namespace: 'default',
      qualifier: '$LATEST'
    },
    {
      functionName: params.functionName,
      qualifier: params.qualifier,
      clientContext: params.data,
      namespace: params.namespace,
      region: params.region || config.region,
      secretId: params.secretId || config.secretId
    },
    {
      invocationType: 'RequestResponse',
      logType: 'Tail',
      version: '2018-04-16',
      action: 'Invoke'
    }
  ) as any

  if (config.token || params.token)
    __params.token = params.token || config.token

  return await uniteRes(
    requestHelper,
    this,
    [
      caseForObject(__params, 'upper'),
      {
        serviceType: 'scf',
        secretKey: params.secretKey || config.secretId
      }
    ],
    'Response.Result.RetMsg'
  )
}
