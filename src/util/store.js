import { isObject } from './index'
/**
 * Store.getSession(key)  @param key, 获取 sessionStorage(key)
 * Store.setSession(key, val)  @param (key, val) 设置 sessionStorage(key, val)
 * Store.getLocal(key)  @param key, 获取 localStorage(key)
 * Store.setLocal(key, val)  @param (key, val) 设置 localStorage(key, val)
 * Store.removeSession(key) @param key, 删除 sessionStorage(key)
 * Store.removeLocal(key)  @param key, 删除 localStorage(key)
 * Store.clearSession()  删除所有 sessionStorage
 * Store.clearLocal()  删除所有 localStorage
 */
export default function Store () {
  this.getSession = key => {
    this.checkBrowser()
    let val = this.getItem(key)
    if (val === null) {
      console.log(key + '：sessionStorage值 不存在')
      return ''
    } else {
      return this.getValue(val)
    }
  }
  this.getLocal = (key) => {
    this.checkBrowser()
    let val = this.getItem(key, 2)
    if (val === null) {
      console.log(key + '：localStorage值 不存在')
      return ''
    } else {
      return this.getValue(val)
    }
  }

  this.setSession = (key, val) => {
    if (!key) {
      console.log('key值无效')
      return
    }
    this.setItem(key, val)
  }

  this.setLocal = (key, val) => {
    if (!key) {
      console.log('key值无效')
      return
    }
    this.setItem(key, val, 2)
  }

  this.removeSession = (key) => {
    this.removeItem(key)
  }

  this.removeLocal = (key) => {
    this.removeItem(key, 2)
  }

  this.clearSession = () => {
    this.removeAll()
  }

  this.clearLocal = () => {
    this.removeAll(2)
  }

  this.checkBrowser = () => {
    if (!window.sessionStorage || !window.localStorage) {
      console.log('当前浏览器不支持Storage！')
      throw new Error('浏览器不支持')
    }
  }
  this.getItem = (key, lx = 1) => {
    let val
    if (lx === 1) {
      val = sessionStorage.getItem(key)
    } else if (lx === 2) {
      val = localStorage.getItem(key)
    }
    return val
  }
  this.removeItem = (key, lx = 1) => {
    if (lx === 1) {
      sessionStorage.removeItem('key')
    } else {
      localStorage.removeItem('key')
    }
  }
  this.removeAll = (lx = 1) => {
    if (lx === 1) {
      sessionStorage.clear()
    } else {
      localStorage.clear()
    }
  }
  this.getValue = (val) => {
    if (val === '') return ''
    if (val === 'true' || val === 'false' || val === 'null' || val === 'undefind' || val === 'NaN') {
      if (val === 'false') {
        return false
      }
      if (val === 'null') {
        return null
      }
      if (val === 'undefind') {
        return void 0
      }
      if (val === 'NaN') {
        return NaN
      }
      return true
    }
    let val2 = +val
    if (typeof val2 === 'number' && !Number.isNaN(val2)) {
      return val2
    } else if (Number.isNaN(val2)) {
      try {
        let obj = JSON.parse(val)
        if (isObject(obj)) {
          return obj
        }
      } catch (e) {
        console.log(e.message)
        if (e.message.includes('character')) {
          return val
        } else {
          return null
        }
      }
    }
  }
  this.setItem = (key, val, lx = 1) => {
    if (typeof val === 'undefined') {
      throw new Error('val不能为空')
    }
    if (val instanceof Set || val instanceof WeakSet) {
      throw new Error('不能存储Set或WeakSet')
    }
    if (val instanceof Map || val instanceof WeakMap) {
      throw new Error('不能存储Map或WeakMap')
    }
    if (typeof val === 'symbol') {
      throw new Error('不能存储symbol')
    }
    if (typeof val === 'object' && val !== null) {
      val = JSON.stringify(val)
    }
    if (lx === 1) {
      sessionStorage.setItem(key, val)
    } else {
      localStorage.setItem(key, val)
    }
  }
}
