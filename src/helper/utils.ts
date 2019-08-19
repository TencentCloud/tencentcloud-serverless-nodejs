/**
 * 复制一个对象，会抛弃继承属性
 * @param obj
 */
export const clone = function(obj: object): object {
  try {
    return JSON.parse(
      JSON.stringify(obj, (key, value) => {
        if (typeof value === 'function') {
          return value.toString()
        }
        return value
      })
    )
  } catch (e) {
    return obj
  }
}

/**
 * 偏函数实现格式校验
 * @param {*} type
 */
export const isType: (type: string) => (obj) => boolean = type => {
  const typeMap = [
    'Number',
    'String',
    'Function',
    'Null',
    'Undefined',
    'Array',
    'Object',
    'Symbol'
  ]
  if (typeMap.indexOf(type) === -1) throw `type must in ${typeMap}`
  return obj => toString.call(obj) === `[object ${type}]`
}

/**
 * 首字母格式化
 * @param {*} string
 * @param {*} type 大写/小写
 */
export const caseFormat: (
  type: 'lower' | 'upper'
) => (string: string) => string = type => string => {
  if (typeof string !== 'string')
    throw Error('First arguments of titleCase must be String')
  const tmpS = string,
    length = tmpS.length
  const typeFn = type === 'lower' ? 'toLowerCase' : 'toUpperCase'
  return length ? String.prototype[typeFn].call(tmpS[0]) + tmpS.slice(1) : tmpS
}

/**
 * 首字母格式化，深度优先
 * @param {} obj
 * @param {*} type 大写/小写
 */
export function caseForObject(obj: object, type: 'lower' | 'upper'): any {
  const _obj = clone(obj)
  const typeFormat = caseFormat(type)
  const isObject = isType('Object')
  const isArray = isType('Array')

  // 可能是数字/字符串
  if (!isObject(_obj) && !isArray(_obj)) return obj

  function _caseForV3(_tmp) {
    for (let item in _tmp) {
      if (_tmp.hasOwnProperty(item)) {
        let formattedItem = typeFormat(item)
        _tmp[formattedItem] = _tmp[item]
        if (isObject(_tmp[formattedItem]) || isArray(_tmp[formattedItem])) {
          _caseForV3(_tmp[formattedItem])
        }
        if (formattedItem !== item) delete _tmp[item]
      }
    }
  }

  for (let item in _obj) {
    if (_obj.hasOwnProperty(item)) {
      let formattedItem = typeFormat(item)
      _obj[formattedItem] = _obj[item]
      if (isObject(_obj[item]) || isArray(_obj[item])) {
        _caseForV3(_obj[item])
      }
      if (formattedItem !== item) delete _obj[item]
    }
  }
  return _obj
}

/**
 * 优化获取对象属性的过程，避免因为undefined.prop出错
 * @param obj
 * @return (key)=>value
 */
export const getValue: (obj: object) => (key: string) => any = obj => key => {
  let res
  let returnUndefined = undefined
  let _obj = obj
  let keyChain = []
  const isUndefined = isType('Undefined')
  const isNull = isType('Null')

  keyChain = key.split('.')
  for (let item of keyChain) {
    // 不存在值
    if (isUndefined(_obj[item]) || isNull(_obj[item])) {
      res = returnUndefined
      break
    }
    // 存在值
    else {
      res = _obj[item]
      _obj = _obj[item]
    }
  }
  return res
}

/**
 * 统一v3接口返回内容
 * @param fn
 * @param scope
 * @param args
 * @param returnKey
 */
export async function uniteRes(fn, scope, args, returnKey) {
  try {
    const res = await fn.apply(scope, args)
    if (res.Response.Error) {
      throw res.Response
    }

    return caseForObject(getValue(res)(returnKey), 'lower') as any
  } catch (e) {
    return caseForObject(e, 'lower') as {
      error: {
        code: string
        message: string
      }
      requestId: string
    }
  }
}
