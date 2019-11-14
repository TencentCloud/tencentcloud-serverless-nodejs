"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helper/utils");
const _ = require("lodash");
async function default_1(params, extraParams) {
    if (!this.config)
        this.init({
            secretId: params.secretId,
            secretKey: params.secretKey,
            token: params.token,
            region: params.region
        }, extraParams);
    const requestHelper = this.requestHelper;
    const region = this.config.region;
    let __params = _.omitBy(_.merge({
        region,
        namespace: 'default',
        qualifier: '$LATEST'
    }, {
        functionName: params.functionName,
        qualifier: params.qualifier,
        clientContext: params.data,
        namespace: params.namespace,
        region: params.region || this.config.region,
        secretId: params.secretId || this.config.secretId,
        token: params.token || this.config.token
    }, {
        invocationType: 'RequestResponse',
        logType: 'Tail',
        version: '2018-04-16',
        action: 'Invoke'
    }), _.isUndefined);
    return await utils_1.uniteRes(requestHelper, this, [
        utils_1.caseForObject(__params, 'upper'),
        {
            serviceType: 'scf',
            secretKey: params.secretKey || this.config.secretKey
        },
        this.extraParams || extraParams
    ], 'Response.Result.RetMsg');
}
exports.default = default_1;
