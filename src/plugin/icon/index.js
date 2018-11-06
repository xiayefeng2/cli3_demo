import Icon from './IconFont.vue'

const icon = {
  install (Vue, options = {}) {
    Vue.component('icon', Icon)
  }
}

export default icon
