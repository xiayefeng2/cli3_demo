import cookies from './util.cookies'
const util = {
  cookies
}
const _toString = Object.prototype.toString
export function isMobile () {
  let agent = navigator.userAgent
  return (agent.match(/Android/i) || (agent.indexOf('iPhone') !== -1) || (navigator.userAgent.indexOf('iPad') !== -1))
}

export function calcBaseRem () {
  let docEl = document.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = null
  if (isMobile()) {
    recalc = function () {
      let clientWidth = docEl.clientWidth
      if (clientWidth === undefined) return
      docEl.style.fontSize = 16 * (clientWidth / 375) + 'px'
    }
  } else {
    recalc = function () {
      let clientWidth = docEl.clientWidth
      if (clientWidth === undefined) return
      if (clientWidth <= 680) {
        docEl.style.fontSize = '16px'
      } else if (clientWidth > 680 && clientWidth <= 1024) {
        docEl.style.fontSize = '16px'
      } else {
        docEl.style.fontSize = '16px'
      }
    }
  }

  if (document.addEventListener === undefined) return
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
}

export function isFunction (val) {
  return typeof val === 'function'
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function randomColor () {
  let rand = Math.floor(selectFrom(0, 1) * 0xFFFFFF).toString(16)
  if (rand.length === 6) {
    return '#' + rand
  } else {
    randomColor()
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

export default util
