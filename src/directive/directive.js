import Vue from 'vue'
// import MyEvent from '@/utils/my-event'

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

/* Vue.directive('event', {
  inserted: function (el, binding, vNode) {
    let myEvent = new MyEvent({ select: el })
    if (!myEvent[binding.arg]) {
      throw new Error(`no such ${binding.arg} evnet type`)
    }
    if (typeof binding.value !== 'function') {
      throw new TypeError(`expression must be function`)
    }
    myEvent[binding.arg](binding.value)
  }
}) */
