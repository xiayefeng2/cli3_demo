import cookies from './cookies'
import Storage from './store'
import log from './log'
const util = {
  log,
  cookies,
  store: new Storage()
}
const _toString = Object.prototype.toString
const _has = Object.prototype.hasOwnProperty
// const encode = encodeURIComponent

export function isMobile () {
  const agent = navigator.userAgent
  return (
    agent.match(/Android/i) ||
    agent.includes('iPhone') ||
    agent.includes('iPad')
  )
}

export function len (str) {
  return [...str].length
}

export const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj))()

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
  return list.filter(f)[0]
}

export function hasOwn (obj, key) {
  return _has.call(obj, key)
}

export const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

export function calcBaseRem () {
  let docEl = document.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = null
  if (isMobile()) {
    recalc = function () {
      let clientWidth = docEl.clientWidth
      if (typeof clientWidth === 'undefined') return
      docEl.style.fontSize = clientWidth / 7.5 + 'px'
    }
  } else {
    recalc = function () {
      let clientWidth = docEl.clientWidth
      if (clientWidth === undefined) return
      if (clientWidth <= 720) {
        docEl.style.fontSize = '18px'
      } else if (clientWidth > 720 && clientWidth <= 1200) {
        docEl.style.fontSize = '16px'
      } else {
        docEl.style.fontSize = '14px'
      }
    }
  }

  if (!document.addEventListener) return
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
}

export function isFunction (val) {
  return typeof val === 'function'
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isSimpleData (val) {
  return !(val instanceof Object)
}

// 扁平化数组
export function flatArray (arr) {
  if (Array.isArray(arr)) {
    return arr.flat(Infinity)
  }
}

// 检测属性是否在原型链上
export function hasPrototypeProperty (object, name) {
  return !Object.hasPrototypeProperty(name) && name in object
}

export function randomColor () {
  let rand = Math.floor(selectFrom(0, 1) * 0xffffff).toString(16)
  if (rand.length === 6) {
    return '#' + rand
  } else {
    return randomColor()
  }
}

/**
 * 获取指定范围的随机数
 * @param {最小值} lowerValue
 * @param {最大值} upperValue
 */
export function selectFrom (lowerValue, upperValue) {
  const chooices = upperValue - lowerValue + 1
  return Math.floor(Math.random() * chooices + lowerValue)
}

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function isNum (val) {
  // return typeof val === 'number' && !isNaN(val)
  if (typeof val !== 'number') {
    return false
  }
  return Number.isSafeInteger(parseInt(val))
}
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function getToday (operate = '-') {
  if (typeof operate !== 'string') {
    throw new Error('连接符必须为字符串')
  }
  let today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  return year + operate + twoBit(month) + operate + twoBit(day)
}

export function dateFormat ({ date = new Date(), format = 'yyyy-MM-dd' } = {}) {
  if (date instanceof Date) {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  } else {
    console.log('params error!')
  }
}

function twoBit (num) {
  return num < 10 ? '0' + num : num
}

export function RemoveArrItem () {
  let arr = []
  arr.push.apply(arr, arguments)
  arr.remove = function (item) {
    if (arr.indexOf(item) === -1) {
      return Array.from(arr)
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item && !isNaN(item)) {
        arr.splice(i, 1)
        break
      } else if (isNaN(arr[i]) && isNaN(item)) {
        arr.splice(i, 1)
        break
      }
    }
    return Array.from(arr)
  }
  return arr
}

export function getExtension (str) {
  return str
    .split('.')
    .pop()
    .toLowerCase()
}

export function getAge (birth) {
  // birth = birth.replace(/-/g, "/");
  if (!birth) {
    return
  }
  let t1 = new Date(birth)
  let t2 = new Date()
  let y2 = t2.getFullYear()
  let m2 = t2.getMonth()
  let y = y2 - t1.getFullYear()
  let m = m2 - t1.getMonth()
  let d = t2.getDate() - t1.getDate()
  let md1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let md2 = md1.slice()
  md2[1] += 1

  function isleap (x) {
    return (x % 4 === 0 && x % 100 !== 0) || x % 400 === 0
  }
  var num = 0
  while (d < 0) {
    if (m2 === 0 && !num) {
      m2 = 12
      num++
    }
    m2--
    d += isleap(y2) ? md2[m2] : md1[m2]
    m--
  }
  while (m < 0) {
    m += 12
    y--
  }
  var obj = {}
  obj.year = y
  obj.month = m
  obj.day = d
  return obj
}

export function ageToDate (y, m = 0, d = 0) {
  var year = y
  var day = d
  var month = m
  var date = new Date()
  var day2 = date.getDate()
  day = day2 - day
  date.setDate(day)
  var month2 = date.getMonth()
  month2 = month2 - month
  date.setMonth(month2)
  var year2 = date.getFullYear()
  year2 = year2 - year
  date.setFullYear(year2)
  // console.log(date)
  return dateFormat({
    date
  })
}

export function getOneMonth (initial = false) {
  let str2
  let str1
  let date = new Date()
  if (initial) {
    let month = date.getMonth() - 1
    let year = date.getFullYear()
    let date1 = new Date(year, month, 1)
    let date2 = new Date(year, month + 1, 0)
    // console.log(date1, date2)
    str1 = dateFormat({
      date: date1
    })
    str2 = dateFormat({
      date: date2
    })
  } else {
    let day = date.getDate()
    let date1 = new Date().setDate(day - 1)
    str2 = dateFormat({
      date: new Date(date1)
    })
    let month = date.getMonth()
    let year = date.getFullYear()
    month = month - 1
    if (month < 0) {
      month = 12
      year = year - 1
    }
    let date2 = date.setFullYear(year, month)
    str1 = dateFormat({
      date: new Date(date2)
    })
  }
  // console.log(str1, str2)
  return [str1, str2]
}

export function isDev () {
  return process.env.NODE_ENV === 'development'
}

export function isProd () {
  return process.env.NODE_ENV === 'production'
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText = '标题') {
  window.document.title = titleText
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'phone-menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('phone-menu-link'))
}

util.parseBoolean = function (str) {
  var ret = false

  try {
    ret = JSON.parse(str)
  } catch (e) {}

  return ret
}

util.getBase64Image = function (imgUrl, callback) {
  const image = new Image()
  image.crossOrigin = ''
  image.src = imgUrl

  image.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    const ext = image.src
      .substring(image.src.lastIndexOf('.') + 1)
      .toLowerCase()
    const dataURL = canvas.toDataURL('image/' + ext)
    callback && callback(dataURL)
  }
}
export default util
