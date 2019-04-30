"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services = require("./services");
const Capi = require("qcloudapi-sdk");
const util = require("util");
class SDK {
    constructor() {
        this.invoke = services.invoke;
    }
    init(config) {
        const __config = Object.assign({}, {
            secretId: process.env.TENCENTCLOUD_SECRETID,
            secretKey: process.env.TENCENTCLOUD_SECRETKEY,
            region: 'ap-guangzhou'
        }, config);
        if (!__config.secretId || !__config.secretKey)
            throw Error('Init failed! Missing secretId or secretKey.');
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
exports.default = new SDK();
