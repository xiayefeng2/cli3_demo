const date = new Date()
const val = new Intl.DateTimeFormat('zh-u-ca-chinese-nu-hanidec').format(date)
console.log(val)
var options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }
let val2 = Intl.DateTimeFormat.call(this, 'cmn-Hans-CN', options).format(date)
console.log(val2)

var options2 = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }
val2 = new Intl.DateTimeFormat('cmn-Hans-CN', options2).format(date)
console.log(val2)
