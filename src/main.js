import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './vuex'
import VueI18n from 'vue-i18n'

import regDirective from './directive/directive'
import regComponent from './directive/reg_component'
import Title from 'plugin/title'
import VueIconFont from 'plugin/icon'
import '@/assets/svg-icons'
import '../public/font/iconfont'

const FastClick = require('fastclick')
const VConsole = require('vconsole/dist/vconsole.min.js')

regDirective()
regComponent()

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
Vue.use(VueI18n)
Vue.use(Title)
Vue.use(VueIconFont)

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log(err)
  console.log(info)
}
Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  var vConsole = new VConsole() // eslint-disable-line
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
