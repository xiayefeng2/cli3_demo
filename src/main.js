import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './vuex'
import VueI18n from 'vue-i18n'
// import VueMobileEvent from 'vue-mobile-event'

import Title from 'plugin/title'
import VueIconFont from 'plugin/icon'

import '@/assets/svg-icons'

import '@/directive/directive' // register global directives
import '@/directive/reg_component' // register global base component
import '@/filter' // register global filters
import '@/setting' // global setting(inclue errorHandle , fastClick, vConsole and so on)

import '@/utils/test1' // test file

Vue.use(VueI18n)
Vue.use(Title)
Vue.use(VueIconFont)
// Vue.use(VueMobileEvent)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
