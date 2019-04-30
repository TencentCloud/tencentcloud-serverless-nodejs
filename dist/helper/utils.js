"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = function (obj) {
    try {
        return JSON.parse(JSON.stringify(obj, (key, value) => {
            if (typeof value === 'function') {
                return value.toString();
            }
            return value;
        }));
    }
    catch (e) {
        return obj;
    }
};
exports.isType = type => {
    const typeMap = [
        'Number',
        'String',
        'Function',
        'Null',
        'Undefined',
        'Array',
        'Object',
        'Symbol'
    ];
    if (typeMap.indexOf(type) === -1)
        throw `type must in ${typeMap}`;
    return obj => toString.call(obj) == `[object ${type}]`;
};
exports.caseFormat = type => string => {
    if (typeof string !== 'string')
        throw Error('First arguments of titleCase must be String');
    const tmpS = string, length = tmpS.length;
    const typeFn = type === 'lower' ? 'toLowerCase' : 'toUpperCase';
    return length ? String.prototype[typeFn].call(tmpS[0]) + tmpS.slice(1) : tmpS;
};
function caseForObject(obj, type) {
    const _obj = exports.clone(obj);
    const typeFormat = exports.caseFormat(type);
    const isObject = exports.isType('Object');
    const isArray = exports.isType('Array');
    function _caseForV3(_tmp) {
        for (let item in _tmp) {
            if (_tmp.hasOwnProperty(item)) {
                let formattedItem = typeFormat(item);
                _tmp[formattedItem] = _tmp[item];
                if (isObject(_tmp[formattedItem]) || isArray(_tmp[formattedItem])) {
                    _caseForV3(_tmp[formattedItem]);
                }
                if (formattedItem !== item)
                    delete _tmp[item];
            }
        }
    }
    for (let item in _obj) {
        if (_obj.hasOwnProperty(item)) {
            let formattedItem = typeFormat(item);
            _obj[formattedItem] = _obj[item];
            if (isObject(_obj[item]) || isArray(_obj[item])) {
                _caseForV3(_obj[item]);
            }
            if (formattedItem !== item)
                delete _obj[item];
        }
    }
    return _obj;
}
exports.caseForObject = caseForObject;
