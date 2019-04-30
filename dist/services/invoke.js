"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helper/utils");
async function default_1(params) {
    const requestHelper = this.requestHelper;
    const region = this.config.region;
    const __params = utils_1.caseForObject(Object.assign({
        region,
        namespace: 'default',
        qualifier: '$LATEST'
    }, params, {
        invocationType: 'RequestResponse',
        logType: 'Tail',
        version: '2018-04-16',
        action: 'Invoke'
    }), 'upper');
    return await requestHelper(__params, {
        serviceType: 'scf'
    });
}
exports.default = default_1;
