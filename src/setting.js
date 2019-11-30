import Vue from 'vue'
import { openVc } from '@/global_config'
import { isDev } from '@/utils'
import FastClick from 'fastclick'
// const FastClick = require('fastclick')

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
  // document.body.addEventListener('touchmove', console.log)
}

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log(err)
  console.log(info)
}
Vue.config.productionTip = false
if (isDev() && openVc) {
  /*  const VConsole = require('vconsole/dist/vconsole.min.js')
  const vConsole = new VConsole() // eslint-disable-line */
}
