import Icon from './IconFont.vue'

const icon = {
  install (Vue, options = {}) {
    Vue.component('IconFont', Icon)
  }
}

export default icon
