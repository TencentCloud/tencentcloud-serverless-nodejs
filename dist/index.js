"use strict";
const services = require("./services");
const Capi = require("qcloudapi-sdk");
const util = require("util");
const error_1 = require("./helper/error");
class SDK {
    constructor() {
        this.invoke = services.invoke;
    }
    init(config) {
        const __config = Object.assign({}, {
            secretId: process.env.TENCENTCLOUD_SECRETID,
            secretKey: process.env.TENCENTCLOUD_SECRETKEY,
            token: process.env.TENCENTCLOUD_SESSIONTOKEN,
            region: 'ap-guangzhou'
        }, config);
        if (!__config.secretId || !__config.secretKey)
            throw Error(error_1.ERR_MISSING_SECRET);
        this.config = __config;
        const capi = new Capi({
            SecretId: __config.secretId,
            SecretKey: __config.secretKey,
            serviceType: 'scf',
            path: '/',
            baseHost: 'tencentcloudapi.com',
            protocol: 'https'
        });
        this.requestHelper = util.promisify(capi.request.bind(capi));
    }
}
module.exports = new SDK();
