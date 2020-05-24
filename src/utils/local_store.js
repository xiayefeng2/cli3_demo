export default class Store {
  constructor () {
    Store.checkBrows()
  }
  getSession (key) {
    if (typeof key !== 'string') {
      throw new Error('params must be string')
    }
    let val = this.getItem(key)
    if (val === null) {
      console.log(`no exist such ${key} sessionStorage`)
      return null
    }
    let parseVal
    try {
      parseVal = JSON.parse(val)
      parseVal = this.checkStr(parseVal)
      parseVal = this.checkNaN(parseVal)
      parseVal = this.checkBigInt(parseVal)
    } catch (err) {
      if (err.message.includes('JSON')) {
        return val
      }
    }
    return parseVal
  }

  getLocal (key) {
    if (typeof key !== 'string') {
      throw new Error('params must be string')
    }
    let val = this.getItem(key, 2)
    if (val === null) {
      console.log(`no exist such ${key} 的localStorage`)
      return null
    }
    let parseVal
    try {
      parseVal = JSON.parse(val)
      parseVal = this.checkStr(parseVal)
      parseVal = this.checkNaN(parseVal)
      parseVal = this.checkBigInt(parseVal)
    } catch (err) {
      if (err.message.includes('JSON')) {
        return val
      }
    }
    return parseVal
  }

  setSession (key, val) {
    this.setItem(key, val)
  }

  setLocal (key, val) {
    this.setItem(key, val, 2)
  }

  removeSession (key) {
    this.removeItem(key)
  }

  removeLocal (key) {
    this.removeItem(key, 2)
  }

  removeAllSession () {
    this.removeAll()
  }

  removeAllLocal () {
    this.removeAll(2)
  }

  removeAllStorage () {
    this.removeAll(3)
  }

  getItem (key, lx = 1) {
    let val
    if (lx === 1) {
      val = sessionStorage.getItem(key)
    } else if (lx === 2) {
      val = localStorage.getItem(key)
    }
    return val
  }

  setItem (key, val, lx = 1) {
    if (typeof key !== 'string') {
      throw new Error('Items key params must be string')
    }
    if (typeof val === 'undefined') {
      throw new Error('set value is not defind')
    }
    if (typeof val === 'symbol') {
      throw new Error('value is not support symbol')
    }
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else if (typeof val === 'string') {
      val = JSON.stringify({ str: val, isString2Object: true })
    } else if (Number.isNaN(val)) {
      val = JSON.stringify({ num: null, isNaN2Object: true })
      // eslint-disable-next-line
    } else if (typeof val === 'bigint') {
      val = JSON.stringify({ num: String(val), isBigInt2Object: true })
    }
    if (lx === 1) {
      sessionStorage.setItem(key, val)
    } else {
      localStorage.setItem(key, val)
    }
  }

  removeItem (key, lx = 1) {
    if (typeof key !== 'string') {
      throw new Error('Items key params must be string')
    }
    if (lx === 1 && sessionStorage.hasOwnProperty(key)) {
      sessionStorage.removeItem(key)
    } else if (lx === 2 && localStorage.hasOwnProperty(key)) {
      localStorage.removeItem(key)
    }
  }

  removeAll (lx = 1) {
    if (lx === 1) {
      sessionStorage.clear()
    } else if (lx === 2) {
      localStorage.clear()
    } else if (lx === 3) {
      sessionStorage.clear()
      localStorage.clear()
    } else {
      throw new Error('param error, param must be one of 1,2,3')
    }
  }
  static checkBrows () {
    if (!window.sessionStorage || !window.localStorage) {
      throw new Error('当前环境不支持本地存储')
    }
  }
  checkStr (obj) {
    let target = obj
    if (this.checkedType(target) === 'Object') {
      if (target.hasOwnProperty('isString2Object') && target.isString2Object) {
        target = target.str
      }
    }
    return target
  }
  checkNaN (obj) {
    let target = obj
    if (this.checkedType(target) === 'Object') {
      if (Reflect.has(target, 'isNaN2Object')) {
        target = NaN
      }
    }
    return target
  }
  checkBigInt (obj) {
    let target = obj
    if (this.checkedType(target) === 'Object') {
      if (Reflect.has(target, 'isBigInt2Object')) {
        // eslint-disable-next-line
        target = BigInt(target.num)
      }
    }
    return target
  }
  checkedType (target) {
    return Object.prototype.toString.call(target).slice(8, -1)
  }
  getSessionSize () {
    const arr = Reflect.ownKeys(sessionStorage)
    let num = 0
    for (let item of arr) {
      num += sessionStorage.getItem(item).length
    }
    return `sessionStorage used ${(num / 1024).toFixed(2)}kb`
  }
  getLocalSize () {
    const arr = Reflect.ownKeys(localStorage)
    let num = 0
    for (let item of arr) {
      num += localStorage.getItem(item).length
    }
    return `localStorage used ${(num / 1024).toFixed(2)}kb`
  }
}
