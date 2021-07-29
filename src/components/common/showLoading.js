import Vue from 'vue'
import MyLoading from './MyLoading.vue'

const Loading = Vue.extend(MyLoading)
let instance
const instances = []
let idx = 0
// const instance = new Loading()

const MuiLoading = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      text: options
    }
  }
  let userOnClose = options.onClose
  let id = 'text' + ++idx

  options.onClose = function () {
    MuiLoading.close(id, userOnClose)
  }
  instance = new Loading({
    data: options
  })

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  let verticalOffset = options.offset || 20
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  instance.top = verticalOffset
  instance.showLoading = true
  instances.push(instance)
  return instance
}

MuiLoading.close = function (id, userOnClose) {
  let len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

export default MuiLoading
