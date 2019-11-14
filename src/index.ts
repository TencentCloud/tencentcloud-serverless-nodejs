import * as services from './services'
import * as Capi from 'qcloudapi-sdk'
import { InitConfig, ExtraParams } from './helper/types'
import { ERR_MISSING_SECRET } from './helper/error'
import * as assign from 'object-assign'
import * as qs from 'querystring'
import * as request from 'request'
import * as _ from 'lodash'

///////////////////////////////////////////////
/**
 * request 重写
 * - 原始的方法只往外传body，而不传response，像状态码等详细信息获取不到
 */
//////////////////////////////////////////////
Capi.prototype.request = function(data, opts, callback, extra) {
  if (typeof opts === 'function') {
    callback = opts
    opts = this.defaults
  }
  opts = opts || this.defaults
  callback = callback || Function.prototype

  var url = this.generateUrl(opts)
  var method = (opts.method || this.defaults.method).toUpperCase()
  var dataStr = this.generateQueryString(data, opts)
  var option = { url: url, method: method, json: true, strictSSL: false }
  var maxKeys =
    opts.maxKeys === undefined ? this.defaults.maxKeys : opts.maxKeys

  if (method === 'POST') {
    option['form'] = qs.parse(dataStr, null, null, {
      maxKeys: maxKeys
    })
  } else {
    option.url += '?' + dataStr
  }

  assign(option, extra)

  request(option, function(error, response, body) {
    callback(error, response, body)
  })
}

class SDK {
  public config: InitConfig
  public requestHelper
  public extraParams: ExtraParams

  init(config?: InitConfig, extraParams?: ExtraParams) {
    const defaultConfig = {
      secretId: process.env.TENCENTCLOUD_SECRETID,
      secretKey: process.env.TENCENTCLOUD_SECRETKEY,
      token: process.env.TENCENTCLOUD_SESSIONTOKEN,
      region: 'ap-guangzhou'
    }

    const defaultExtraParams = {
      forever: true
    }

    const __config = _.omitBy(_.merge({}, defaultConfig, config), _.isUndefined)
    const __extraParams = _.omitBy(
      _.merge({}, defaultExtraParams, extraParams),
      _.isUndefined
    )

    if (!__config.secretId || !__config.secretKey)
      return console.warn(ERR_MISSING_SECRET)

    this.extraParams = __extraParams
    this.config = __config
    const capi = new Capi({
      SecretId: __config.secretId,
      SecretKey: __config.secretKey,
      serviceType: 'scf',
      path: '/',
      baseHost: 'tencentcloudapi.com',
      protocol: 'https'
    })
    this.requestHelper = (data, opts, extra) => {
      return new Promise((res, rej) => {
        capi.request(
          data,
          opts,
          (err, response, body) => {
            if (err) return rej(err)
            if (__extraParams.time && response)
              console.log(response.timingPhases)
            res(body)
          },
          extra
        )
      })
    }
  }

  _reset() {
    this.config = null
    this.requestHelper = null
  }

  invoke = services.invoke
}

export = new SDK()
