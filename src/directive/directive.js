import Vue from 'vue'
import MyEvent from '@/utils/my-event'
import { domToString } from '@/utils'

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
const cache = {}
Vue.directive('event', {
  inserted: function (el, binding, vNode) {
    // console.log(vNode.context)
    let myEvent
    let elText = domToString(el)
    if (!cache[elText]) {
      cache[elText] = new MyEvent({
        select: el,
        destory () {
          return new Promise((resolve, reject) => {
            vNode.context.$once('hook:beforeDestroy', function () {
              delete cache[elText]
              elText = null
              resolve()
            })
            vNode.context.$on('error', function (err) {
              reject(err)
            })
          })
        }
      })
    }
    myEvent = cache[elText]
    // console.log(myEvent)
    if (!myEvent[binding.arg]) {
      throw new Error(`no such ${binding.arg} evnet type`)
    }
    if (typeof binding.value !== 'function') {
      throw new TypeError(`expression must be function`)
    }
    myEvent[binding.arg](binding.value)
  }
})
