import Vue from 'vue'
export default function registerDirect () {
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
}
