import cookies from './cookies'
import Store from './local_store'
import log from './log'
import IndexedDB from './indexDB2'
// import MyEvent from './myEvent'

let store
if (Store.instance) {
  store = Store.instance
} else {
  store = Store.instance = new Store()
}
// console.log(Store.instance)
const db = new IndexedDB()
/* const event = new MyEvent()
event.on('sendMsg', (first, ...args) => {
  console.log(first)
  console.log(args)
})
event.once('sendVal', (val) => {
  console.log(val)
})
setTimeout(() => {
  event.emit('sendMsg', 'update')
  event.emit('sendVal', 25)
  event.emit('sendVal', 26)
}, 5000) */
const utils = {
  log,
  cookies,
  store,
  db
}
const _toString = Object.prototype.toString
const _has = Object.prototype.hasOwnProperty
const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
// const encode = encodeURIComponent

export const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length

export function isMobile () {
  const agent = navigator.userAgent
  return (
    agent.match(/Android/i) ||
    agent.includes('iPhone') ||
    agent.includes('iPad')
  )
}

export function throttle (func, timeFrame) {
  let lastTime = 0
  return function (...args) {
    let now = +new Date()
    if (now - lastTime >= timeFrame) {
      func(...args)
      lastTime = now
    }
  }
}

export function debounce (func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    timeout != null && clearTimeout(timeout)
    if (immediate && !timeout) {
      func.apply(context, args)
    }
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }, wait)
  }
}

export function savePicture (Url) {
  var blob = new Blob([''], { type: 'application/octet-stream' })
  var url = URL.createObjectURL(blob)
  var a = document.createElement('a')
  a.href = Url
  a.download = Url.replace(/(.*\/)*([^.]+.*)/ig, '$2').split('?')[0]
  var e = document.createEvent('MouseEvents')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
  URL.revokeObjectURL(url)
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
  return obj != null && _has.call(obj, key)
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

function checkedType (target) {
  return _toString.call(target).slice(8, -1)
}

// 实现深度克隆---对象/数组
export function clone (target) {
  // 判断拷贝的数据类型
  // 初始化变量result 成为最终克隆的数据
  let result
  let targetType = checkedType(target)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return target
  }
  // 遍历目标数据
  for (let i in target) {
    // 获取遍历数据结构的每一项值。
    let value = target[i]
    // 判断目标结构里的每一值是否存在对象/数组
    if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
      // 对象/数组里嵌套了对象/数组
      // 继续遍历获取到value值
      result[i] = clone(value)
    } else {
      // 获取到value值是基本的数据类型或者是函数。
      result[i] = value
    }
  }
  return result
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

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

utils.testFn = function ({ success, fail, time = 500 }) {
  setTimeout(() => {
    success.call(this)
  }, time)
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

function twoBit (num) {
  return num < 10 ? '0' + num : num
}

export function RemoveArrItem () {
  let arr = []
  arr.push.apply(arr, arguments)
  arr.remove = function (item) {
    if (!arr.includes(item)) {
      return Array.from(arr)
    }
    /* for (let i = 0; i < arr.length;) {
      if (arr[i] === item && !isNaN(item)) {
        arr.splice(i, 1)
      } else if (isNaN(arr[i]) && isNaN(item)) {
        arr.splice(i, 1)
      } else {
        i++
      }
    } */
    do {
      let idx = arr.findIndex(item2 => item2 === item)
      idx > -1 && arr.splice(idx, 1)
    } while (arr.includes(item))
    return Array.from(arr)
  }
  return arr
}

export function oneByone (arr, fn) {
  let promise = Promise.resolve()
  for (let [idx, item] of arr.entries()) {
    promise = promise.then(() => fn.call(this, item, idx))
  }
  return promise
}

export function getExtension (str) {
  return str
    .split('.')
    .pop()
    .toLowerCase()
}

export const getOffset = el => {
  const {
    top,
    left
  } = el.getBoundingClientRect()
  const {
    scrollTop,
    scrollLeft
  } = document.body
  return {
    top: top + scrollTop,
    left: left + scrollLeft
  }
}
export const isMobile2 = () => 'ontouchstart' in window

export function notAllowPaste () {
  const html = document.querySelector('html')
  html.oncopy = () => false
  html.onpaste = () => false
}

export function inputFilter () {
  const input = document.querySelector('input[type="text"]')
  const clearText = target => {
    const {
      value
    } = target
    target.value = value.replace(/[^\u4e00-\u9fa5]/g, '')
  }
  input.onfocus = ({ target }) => {
    clearText(target)
  }
  input.onkeyup = ({ target }) => {
    clearText(target)
  }
  input.onblur = ({ target }) => {
    clearText(target)
  }
  input.oninput = ({ target }) => {
    clearText(target)
  }
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

export function uniqueArr (arr) {
  return Array.from(new Set(arr))
}

export function isDev () {
  return process.env.NODE_ENV === 'development'
}

export function isProd () {
  return process.env.NODE_ENV === 'production'
}

export function grayTheme () {
  let classList = document.body.classList
  if (!classList.contains('gray-theme')) {
    classList.add('gray-theme')
  }
}

export function everyYear44 () {
  let date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month === 4 && [4].includes(day)) {
    grayTheme()
  }
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
utils.title = function (titleText = '标题') {
  window.document.title = titleText
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
utils.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'phone-menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('phone-menu-link'))
}

utils.parseBoolean = function (str) {
  var ret = false
  try {
    ret = JSON.parse(str)
  } catch (e) {}

  return ret
}

utils.getBase64Image = function (imgUrl, callback, idx) {
  const image = new Image()
  image.crossOrigin = ''
  image.src = imgUrl

  image.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    let quality = 0.8
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    const ext = image.src
      .substring(image.src.lastIndexOf('.') + 1)
      .toLowerCase()
    const dataURL = canvas.toDataURL('image/' + ext, quality)
    callback && callback(dataURL, idx)
  }
}

utils.now = Date.now

utils.throttle = function (func, wait) {
  var lastTime = 0
  var timer = null
  var args
  var later = () => {
    lastTime = utils.now()
    timer = null
    func.apply(null, args)
  }
  return function () {
    var now = utils.now()
    args = arguments
    var remaining = wait - (now - lastTime)
    // console.log(remaining)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      func.apply(null, args)
    } else if (!timer) {
      timer = setTimeout(later, remaining)
    }
    // console.log('lastTime:' + lastTime)
  }
}

utils.debounce = function (func, wait, immediate) {
  var lastTime, timer, args, result
  var later = function () {
    var last = utils.now() - lastTime
    if (last < wait) {
      timer = setTimeout(later, wait - last)
    } else {
      timer = null
      if (!immediate) {
        result = func.apply(null, args)
      }
    }
  }

  return function () {
    args = arguments
    lastTime = utils.now()
    var callNow = immediate && !timer
    if (!timer) {
      timer = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(null, args)
    }
    return result
  }
}

export function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export function once (fn) {
  var called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

export function submitNoRepeat (fn) {
  let isSending = false
  const cb = function () {
    isSending = false
  }
  return function () {
    let arr = Array.from(arguments)
    if (!isSending) {
      isSending = true
      arr.push(cb)
      fn.apply(this, arr)
    }
  }
}

export function submitNoRepeatAndDebounce (fn, wait) {
  let isSending = false
  let lastTime
  const cb = function () {
    isSending = false
  }
  return function () {
    let arr = Array.from(arguments)
    if (!isSending) {
      arr.push(cb)
      let now = utils.now()
      if (wait && lastTime) {
        if (now - lastTime > wait) {
          fn.apply(this, arr)
          lastTime = now
        }
      } else {
        fn.apply(this, arr)
        lastTime = now
      }
      isSending = true
    }
  }
}

export const compose = function () {
  let args = Array.from(arguments)
  return function (x) {
    return args.reduceRight(function (res, cb) {
      return cb(res)
    }, x)
  }
}

export const compose2 = (...args) => x => args.reduceRight((res, cb) => cb(res), x)

export function fibonacci (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}

export function toBinary (string) {
  const codeUnits = new Uint16Array(string.length)
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i)
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer))
}

export function string2base64 (str) {
  const converted = toBinary(str)
  return btoa(converted)
}

export function utf16to8 (str) {
  var out, i, len, c

  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

export function utf8to16 (str) {
  var out, i, len, c
  var char2, char3

  out = ''
  len = str.length
  i = 0
  while (i < len) {
    c = str.charCodeAt(i++)
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1)
        break
      case 12: case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++)
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
        break
      case 14:
        // 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = str.charCodeAt(i++)
        char3 = str.charCodeAt(i++)
        out += String.fromCharCode(((c & 0x0F) << 12) |
  ((char2 & 0x3F) << 6) |
  ((char3 & 0x3F) << 0))
        break
    }
  }

  return out
}

export function base64encode (str) {
  var out, i, len
  var c1, c2, c3

  len = str.length
  i = 0
  out = ''
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt((c1 & 0x3) << 4)
      out += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
      out += base64EncodeChars.charAt((c2 & 0xF) << 2)
      out += '='
      break
    }
    c3 = str.charCodeAt(i++)
    out += base64EncodeChars.charAt(c1 >> 2)
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6))
    out += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return out
}

export function base64decode (str) {
  var c1, c2, c3, c4
  var i, len, out

  len = str.length
  i = 0
  out = ''
  while (i < len) {
  /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c1 === -1)
    if (c1 === -1) { break }

    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c2 === -1)
    if (c2 === -1) { break }

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))

    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff
      if (c3 === 61) { return out }
      c3 = base64DecodeChars[c3]
    } while (i < len && c3 === -1)
    if (c3 === -1) { break }

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2))

    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff
      if (c4 === 61) { return out }
      c4 = base64DecodeChars[c4]
    } while (i < len && c4 === -1)
    if (c4 === -1) { break }
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
  }
  return out
}

// 判断是否是微信
export function isWeixin () {
  var ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) === 'micromessenger'
};

// 获取微信版本号
export function getWxVersion () {
  if (!isWeixin()) {
    return 0
  }
  let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i)
  return wechatInfo[1]
}

export function returnFileSize (number) {
  if (number < 1024) {
    return number + 'bytes'
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB'
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB'
  }
}

utils.memoize = function (func, hasher) {
  let memoize = function (key) {
    let cache = memoize.cache
    let address = '' + (hasher ? hasher.apply(this, arguments) : key)
    if (!hasOwn(cache, address)) {
      cache[address] = func.apply(this, arguments)
    }
    return cache[address]
  }
  memoize.cache = {}
  return memoize
}

// 加入收藏夹
export function addFavorite (sURL, sTitle) {
  try {
    window.external.addFavorite(sURL, sTitle)
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, '')
    } catch (e) {
      alert('加入收藏失败，请使用Ctrl+D进行添加')
    }
  }
}

// 为元素添加on方法
Element.prototype.on = Element.prototype.addEventListener

NodeList.prototype.on = function (event, fn) {
  []['forEach'].call(this, function (el) {
    el.on(event, fn)
  })
  return this
}

// 为元素添加trigger方法
Element.prototype.trigger = function (type, data) {
  var event = document.createEvent('HTMLEvents')
  event.initEvent(type, true, true)
  event.data = data || {}
  event.eventName = type
  event.target = this
  this.dispatchEvent(event)
  return this
}

NodeList.prototype.trigger = function (event) {
  []['forEach'].call(this, function (el) {
    el['trigger'](event)
  })
  return this
}

export function scrollBottom (select) {
  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
  if (scrollHeight) {
    window.scrollTo(0, scrollHeight)
  } else if (select) {
    let container = document.querySelector(select)
    container.scrollTop = container.scrollHeight
  }
}

export function isScrollBottom (select, offset = 50) {
  let element
  if (typeof select === 'string') {
    element = document.querySelector(select)
  } else if (select instanceof HTMLElement && select.nodeType === Node.ELEMENT_NODE) {
    element = select
  }

  return element.scrollHeight - element.scrollTop <= element.clientHeight + offset
}

export function isInViewPort (element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const {
    top,
    right,
    bottom,
    left
  } = element.getBoundingClientRect()

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  )
}

export function isInView (element, parentEl) {
  var viewWidth = window.innerWidth || document.documentElement.clientWidth
  var viewHeight = window.innerHeight || document.documentElement.clientHeight
  var obj = element.getBoundingClientRect()
  var top = obj.top
  var right = obj.right
  var bottom = obj.bottom
  var left = obj.left

  var targetBottom = viewHeight
  if (parentEl) {
    var obj2 = parentEl.getBoundingClientRect()
    var top2 = obj2.top
    var parentHeight = obj2.height
    targetBottom = top2 + parentHeight
  }

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= targetBottom
  )
}

export function oberverDOM (el) {
  const options = {
    // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
    // 1 表示完全被包含
    threshold: 1.0
  }

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      /* console.log(entry.time) // 触发的时间
      console.log(entry.rootBounds) // 根元素的位置矩形，这种情况下为视窗位置
      console.log(entry.boundingClientRect) // 被观察者的位置举行
      console.log(entry.intersectionRect) // 重叠区域的位置矩形
      console.log(entry.intersectionRatio) // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
      console.log(entry.target) // 被观察者 */
      // console.log(entry.intersectionRatio)
      if (entry.intersectionRatio >= options.threshold) {
        console.log('元素可见了')
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)
  let target
  if (el instanceof HTMLElement && el.nodeType === 1) {
    target = el
  } else {
    target = document.querySelector('.target')
  }
  observer.observe(target)
}

export function addScript (url) {
  var script = document.createElement('script')
  script.src = url
  script.async = false
  document.body.appendChild(script)
  return script
}

export function strHash (input) {
  var I64BIT_TABLE =
 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
  var hash = 5381
  var i = input.length - 1

  if (typeof input === 'string') {
    for (; i > -1; i--) { hash += (hash << 5) + input.charCodeAt(i) }
  } else {
    for (; i > -1; i--) { hash += (hash << 5) + input[i] }
  }
  var value = hash & 0x7FFFFFFF

  var retValue = ''
  do {
    retValue += I64BIT_TABLE[value & 0x3F]
  }
  while ((value >>= 6))

  return retValue
}

export function addScroll (el, objSub, cb) {
  var ele = null
  if (typeof el === 'string') {
    ele = document.querySelector(el)
    if (ele === null) {
      throw new Error('el:' + el + 'is a no valid select')
    }
  } else if (el instanceof HTMLElement && el.nodeType === 1) {
    ele = el
  }

  ele.addEventListener('scroll', function () {
    var active = objSub.node || null
    if (!active) {
      active = document.querySelector(objSub.select)
    }
    if (active) {
      var page = active.dataset.page
      cb && cb(page, active)
    }
  }, false)
}

export function customClose () {
  window.opener = null
  window.open('', '_self')
  window.close()
}

// 利用 CSS3 旋转 对根容器逆时针旋转 90 度
export function detectOrient () {
  var width = document.documentElement.clientWidth
  var height = document.documentElement.clientHeight
  var $wrapper = document.getElementById('J_wrapper')
  var style = ''

  if (width >= height) { // 横屏
    style += 'width:' + width + 'px;' // 注意旋转后的宽高切换
    style += 'height:' + height + 'px;'
    style += '-webkit-transform: rotate(0); transform: rotate(0);'
    style += '-webkit-transform-origin: 0 0;'
    style += 'transform-origin: 0 0;'
  } else { // 竖屏
    style += 'width:' + height + 'px;'
    style += 'height:' + width + 'px;'
    style += '-webkit-transform: rotate(90deg); transform: rotate(90deg);'
    // 注意旋转中点的处理
    style += '-webkit-transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
    style += 'transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
  }
  $wrapper.style.cssText = style
}

export function isMobileUserAgent () {
  return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(
    window.navigator.userAgent.toLowerCase()
  )
}

export function loadStyle (url) {
  try {
    document.createStyleSheet(url)
  } catch (e) {
    var cssLink = document.createElement('link')
    cssLink.rel = 'stylesheet'
    cssLink.type = 'text/css'
    cssLink.href = url
    var head = document.getElementsByTagName('head')[0]
    head.appendChild(cssLink)
  }
}

export default utils
