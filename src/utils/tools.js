
const ua = navigator.userAgent
const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]

// 身份证校验
export const isCardID = (sId) => {
  if (!/(^\d{17}(\d|X|x)$)/.test(sId)) {
    console.log('你输入的身份证长度或格式错误')
    return false
  }
  // 身份证城市
  var aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  if (!aCity[parseInt(sId.substr(0, 2))]) {
    console.log('你的身份证地区非法')
    return false
  }

  // 出生日期验证
  var sBirthday = (sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))).replace(/-/g, '/')
  var d = new Date(sBirthday)
  if (sBirthday !== (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate())) {
    console.log('身份证上的出生日期非法')
    return false
  }

  // 身份证号码校验
  var sum = 0
  var weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var codes = '10X98765432'
  for (var i = 0; i < sId.length - 1; i++) {
    sum += sId[i] * weights[i]
  }
  var last = codes[sum % 11] // 计算出来的最后一位身份证号码
  if (sId[sId.length - 1] !== last) {
    console.log('你输入的身份证号非法')
    return false
  }

  return true
}

export const numberToChinese = (num) => {
  var AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  var BB = ['', '十', '百', '仟', '萬', '億', '点', '']
  var a = ('' + num).replace(/(^0*)/g, '').split('.')
  var k = 0
  var re = ''
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$')
          .test(a[0])) { re = BB[4] + re }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== '0' && a[0].charAt(i + 1) === '0') { re = AA[0] + re }
    if (a[0].charAt(i) !== '0') { re = AA[a[0].charAt(i)] + BB[k % 4] + re }
    k++
  }

  if (a.length > 1) { // 加上小数部分(如果有小数部分)
    re += BB[6]
    for (let i = 0; i < a[1].length; i++) { re += AA[a[1].charAt(i)] }
  }
  if (re === '一十') { re = '十' }
  if (re.match(/^一/) && re.length === 3) { re = re.replace('一', '') }
  return re
}

export const changeToChinese = (Num) => {
  // 判断如果传递进来的不是字符的话转换为字符
  if (typeof Num === 'number') {
    Num = String(Num)
  };
  Num = Num.replace(/,/g, '') // 替换tomoney()中的“,”
  Num = Num.replace(/ /g, '') // 替换tomoney()中的空格
  Num = Num.replace(/￥/g, '') // 替换掉可能出现的￥字符
  if (isNaN(Num)) { // 验证输入的字符是否为数字
    // alert("请检查小写金额是否正确");
    return ''
  };
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  var part = String(Num).split('.')
  var newchar = ''
  // 小数点前进行转化
  for (var i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return ''
      // 若数量超过拾亿单位，提示
    }
    var tmpnewchar = ''
    var perchar = part[0].charAt(i)
    switch (perchar) {
      case '0':
        tmpnewchar = '零' + tmpnewchar
        break
      case '1':
        tmpnewchar = '壹' + tmpnewchar
        break
      case '2':
        tmpnewchar = '贰' + tmpnewchar
        break
      case '3':
        tmpnewchar = '叁' + tmpnewchar
        break
      case '4':
        tmpnewchar = '肆' + tmpnewchar
        break
      case '5':
        tmpnewchar = '伍' + tmpnewchar
        break
      case '6':
        tmpnewchar = '陆' + tmpnewchar
        break
      case '7':
        tmpnewchar = '柒' + tmpnewchar
        break
      case '8':
        tmpnewchar = '捌' + tmpnewchar
        break
      case '9':
        tmpnewchar = '玖' + tmpnewchar
        break
      default:
        break
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + '元'
        break
      case 1:
        if (perchar !== '0') tmpnewchar = tmpnewchar + '拾'
        break
      case 2:
        if (perchar !== '0') tmpnewchar = tmpnewchar + '佰'
        break
      case 3:
        if (perchar !== '0') tmpnewchar = tmpnewchar + '仟'
        break
      case 4:
        tmpnewchar = tmpnewchar + '万'
        break
      case 5:
        if (perchar !== '0') tmpnewchar = tmpnewchar + '拾'
        break
      case 6:
        if (perchar !== '0') tmpnewchar = tmpnewchar + '佰'
        break
      case 7:
        if (perchar !== '0') tmpnewchar = tmpnewchar + '仟'
        break
      case 8:
        tmpnewchar = tmpnewchar + '亿'
        break
      case 9:
        tmpnewchar = tmpnewchar + '拾'
        break
    }
    newchar = tmpnewchar + newchar
  }
  // 小数点之后进行转化
  if (Num.indexOf('.') !== -1) {
    if (part[1].length > 2) {
      // alert("小数点之后只能保留两位,系统将自动截断");
      part[1] = part[1].substr(0, 2)
    }
    for (i = 0; i < part[1].length; i++) {
      tmpnewchar = ''
      perchar = part[1].charAt(i)
      switch (perchar) {
        case '0':
          tmpnewchar = '零' + tmpnewchar
          break
        case '1':
          tmpnewchar = '壹' + tmpnewchar
          break
        case '2':
          tmpnewchar = '贰' + tmpnewchar
          break
        case '3':
          tmpnewchar = '叁' + tmpnewchar
          break
        case '4':
          tmpnewchar = '肆' + tmpnewchar
          break
        case '5':
          tmpnewchar = '伍' + tmpnewchar
          break
        case '6':
          tmpnewchar = '陆' + tmpnewchar
          break
        case '7':
          tmpnewchar = '柒' + tmpnewchar
          break
        case '8':
          tmpnewchar = '捌' + tmpnewchar
          break
        case '9':
          tmpnewchar = '玖' + tmpnewchar
          break
      }
      if (i === 0) tmpnewchar = tmpnewchar + '角'
      if (i === 1) tmpnewchar = tmpnewchar + '分'
      newchar = newchar + tmpnewchar
    }
  }
  // 替换所有无用汉字
  while (newchar.search('零零') !== -1) { newchar = newchar.replace('零零', '零') }
  newchar = newchar.replace('零亿', '亿')
  newchar = newchar.replace('亿万', '亿')
  newchar = newchar.replace('零万', '万')
  newchar = newchar.replace('零元', '元')
  newchar = newchar.replace('零角', '')
  newchar = newchar.replace('零分', '')
  if (newchar.charAt(newchar.length - 1) === '元') {
    newchar = newchar + '整'
  }
  return newchar
}

// 是否是爬虫
export const isSpider = () => {
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
}

export function catchError () {
  window.onerror = function (msg, source, lineNo, colNo, error) {
    console.log(error)
    return true
  }
  window.addEventListener('error', function (error) {
    console.log(error)
    return true
  }, true)
  window.addEventListener('unhandledrejection', function (e) {
    // e.preventDefault()
    console.log(e)
    return true
  })
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
