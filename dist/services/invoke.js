"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helper/utils");
async function default_1(params) {
    if (!this.config)
        this.init({
            secretId: params.secretId,
            secretKey: params.secretKey,
            token: params.token,
            region: params.region
        });
    const requestHelper = this.requestHelper;
    const region = this.config.region;
    let __params = Object.assign({
        region,
        namespace: 'default',
        qualifier: '$LATEST'
    }, {
        functionName: params.functionName,
        qualifier: params.qualifier,
        clientContext: params.data,
        namespace: params.namespace
    }, {
        invocationType: 'RequestResponse',
        logType: 'Tail',
        version: '2018-04-16',
        action: 'Invoke'
    });
    if (this.config.token)
        __params.token = this.config.token;
    return await utils_1.uniteRes(requestHelper, this, [
        utils_1.caseForObject(__params, 'upper'),
        {
            serviceType: 'scf'
        }
    ], 'Response.Result.RetMsg');
}
exports.default = default_1;
