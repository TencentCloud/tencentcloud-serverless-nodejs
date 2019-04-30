"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helper/utils");
async function default_1(params) {
    const requestHelper = this.requestHelper;
    const region = this.config.region;
    let __params = Object.assign({
        region,
        namespace: 'default',
        qualifier: '$LATEST'
    }, params, {
        invocationType: 'RequestResponse',
        logType: 'Tail',
        version: '2018-04-16',
        action: 'Invoke'
    });
    if (this.config.token)
        __params.token = this.config.token;
    return await requestHelper(utils_1.caseForObject(__params, 'upper'), {
        serviceType: 'scf'
    });
}
exports.default = default_1;
