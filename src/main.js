import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'

import regDirective from './directive/directive'
import regComponent from './directive/reg_component'
import Title from 'plugin/title'

const FastClick = require('fastclick')

regDirective()
regComponent()

FastClick.attach(document.body)
Vue.use(VueI18n)
Vue.use(Title)
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log(err)
  console.log(info)
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
