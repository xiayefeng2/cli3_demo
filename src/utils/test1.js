function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
  this.sayHello = function () {
    console.log(`hell ${this.name}`)
  }
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}

var obj = new SuperType('xiao ming')
// console.log(obj.hasOwnProperty('sayName'))
// obj.sayHello()
// obj.sayName()
/* for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key)
  } else {
    console.log(`key: ${key}`)
  }
} */
const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
function base64encode (str) {
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

function utf16to8 (str) {
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

// console.log(base64encode(utf16to8('啊啊')))
var str = 'http://aicare.oss-cn-shenzhen.aliyuncs.com/platform/saas/20200307/a8614d40900447e5b7a78d39f4424d77.jpg'

// console.log(str.replace(reg, '$1press_$2'))
// console.log(RegExp.$2)
// console.log(addPressImg(str))
function addPressImg (url) {
  if (!url) return ''
  let reg = /(.*(?<=\\\/\d{8})\/)(.+)$/
  let arr = str.match(reg)
  if (!arr) return str
  return arr[1] + 'press_' + arr[2]
}

/* function isInViewPort (element, parentEl) {
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
} */

console.log('script start')
async function async1 () {
  await async2()
  console.log('async1 end')
}
async function async2 () { console.log('async2 end') }
async1()
setTimeout(function () { console.log('setTimeout') }, 0)
new Promise(resolve => {
  console.log('Promise')
  resolve()
}).then(function () {
  console.log('promise1')
}).then(function () {
  console.log('promise2')
})
console.log('script end')

function lazyMan (name) {
  this.task = []
  this.task.push(() => {
    return new Promise(res => {
      console.log('name:' + name); res()
    })
  })
  let run = () => {
    let sequence = Promise.resolve()
    for (const func of this.task) {
      sequence = sequence.then(() => func())
    }
  }
  setTimeout(() => { run() }, 0)
  this.eat = (str) => {
    this.task.push(() => {
      return new Promise(res => {
        console.log('eat:' + str); res()
      })
    })
    return this
  }
  this.sleep = (time) => {
    this.task.push(() => {
      return new Promise(res => {
        setTimeout(() => {
          console.log(`Wake up after ` + time); res()
        }, time)
      })
    })
    return this
  }
  this.sleepFirst = (time) => {
    this.task.unshift(() => {
      return new Promise(res => {
        setTimeout(() => {
          console.log(`sleepFirst up after ` + time); res()
        }, time)
      })
    })
    return this
  }
  return this
}

lazyMan('xxx').sleep(1000).eat('333').sleepFirst(2000)
