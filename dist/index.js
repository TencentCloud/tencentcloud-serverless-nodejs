"use strict";
const services = require("./services");
const Capi = require("qcloudapi-sdk");
const error_1 = require("./helper/error");
const assign = require("object-assign");
const qs = require("querystring");
const request = require("request");
const _ = require("lodash");
Capi.prototype.request = function (data, opts, callback, extra) {
    if (typeof opts === 'function') {
        callback = opts;
        opts = this.defaults;
    }
    opts = opts || this.defaults;
    callback = callback || Function.prototype;
    var url = this.generateUrl(opts);
    var method = (opts.method || this.defaults.method).toUpperCase();
    var dataStr = this.generateQueryString(data, opts);
    var option = { url: url, method: method, json: true, strictSSL: false };
    var maxKeys = opts.maxKeys === undefined ? this.defaults.maxKeys : opts.maxKeys;
    if (method === 'POST') {
        option['form'] = qs.parse(dataStr, null, null, {
            maxKeys: maxKeys
        });
    }
    else {
        option.url += '?' + dataStr;
    }
    assign(option, extra);
    request(option, function (error, response, body) {
        callback(error, response, body);
    });
};
class SDK {
    constructor() {
        this.invoke = services.invoke;
    }
    init(config, extraParams) {
        const defaultConfig = {
            secretId: process.env.TENCENTCLOUD_SECRETID,
            secretKey: process.env.TENCENTCLOUD_SECRETKEY,
            token: process.env.TENCENTCLOUD_SESSIONTOKEN,
            region: 'ap-guangzhou'
        };
        const defaultExtraParams = {
            forever: true
        };
        const __config = _.omitBy(_.merge({}, defaultConfig, config), _.isUndefined);
        const __extraParams = _.omitBy(_.merge({}, defaultExtraParams, extraParams), _.isUndefined);
        if (!__config.secretId || !__config.secretKey)
            return console.warn(error_1.ERR_MISSING_SECRET);
        this.extraParams = __extraParams;
        this.config = __config;
        const isScf = process.env.TENCENTCLOUD_RUNENV === 'SCF';
        const capi = new Capi({
            SecretId: __config.secretId,
            SecretKey: __config.secretKey,
            serviceType: 'scf',
            path: '/',
            baseHost: isScf ? 'internal.tencentcloudapi.com' : 'tencentcloudapi.com',
            protocol: 'https'
        });
        this.requestHelper = (data, opts, extra) => {
            return new Promise((res, rej) => {
                capi.request(data, opts, (err, response, body) => {
                    if (err)
                        return rej(err);
                    if (__extraParams.time && response)
                        console.log(response.timingPhases);
                    res(body);
                }, extra);
            });
        };
    }
    _reset() {
        this.config = null;
        this.requestHelper = null;
    }
}
module.exports = new SDK();
