import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './vuex'
import VueI18n from 'vue-i18n'

import Title from 'plugin/title'
import VueIconFont from 'plugin/icon'

import '@/assets/svg-icons'
import '../public/font/iconfont'

import '@/directive/directive'
import '@/directive/reg_component'
import '@/filter'
import '@/setting' // 全局设置及配置

import '@/util/test'

Vue.use(VueI18n)
Vue.use(Title)
Vue.use(VueIconFont)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
