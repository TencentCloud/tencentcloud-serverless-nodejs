import * as services from './services'
import * as Capi from 'qcloudapi-sdk'
import * as util from 'util'
import { InitConfig } from './helper/types'
import { ERR_MISSING_SECRET } from './helper/error'
import * as _ from 'lodash'

class SDK {
  public config: InitConfig
  public requestHelper

  init(config?: InitConfig) {
    const defaultConfig = {
      secretId: process.env.TENCENTCLOUD_SECRETID,
      secretKey: process.env.TENCENTCLOUD_SECRETKEY,
      token: process.env.TENCENTCLOUD_SESSIONTOKEN,
      region: 'ap-guangzhou'
    }
    const __config = _.omitBy(_.merge({}, defaultConfig, config), _.isUndefined)
    if (!__config.secretId || !__config.secretKey)
      throw Error(ERR_MISSING_SECRET)

    this.config = __config
    const capi = new Capi({
      SecretId: __config.secretId,
      SecretKey: __config.secretKey,
      serviceType: 'scf',
      path: '/',
      baseHost: 'tencentcloudapi.com',
      protocol: 'https'
    })
    this.requestHelper = util.promisify(capi.request.bind(capi))
  }

  _reset() {
    this.config = null
    this.requestHelper = null
  }

  invoke = services.invoke
}

export = new SDK()
