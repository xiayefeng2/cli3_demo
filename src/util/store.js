import { isObject } from './index'

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
    if(!key) {
      console.log('key值无效')
      return
    }
    this.setItem(key, val)
  }

  this.setLocal = (key, val) => {
    if(!key) {
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
        if (e.includes('in JSON')) {
          return val
        }
      }
    }
  }
  this.setItem = (key, val, lx = 1) => {
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
