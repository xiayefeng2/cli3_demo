import Vue from 'vue'
import MyLoading from './MyLoading.vue'
let el = null

const Loading = Vue.extend(MyLoading)
// const instance = new Loading()
export default {
  vm: new Loading(),
  show (...args) {
    el = this.vm.$mount().$el
    document.body.appendChild(el)
    this.vm.show(...args)
  },
  hide () {
    this.vm.hide()
    el = null
  }
}
