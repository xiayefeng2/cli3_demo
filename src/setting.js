import Vue from 'vue'
import { openVc } from '@/global_config'
import { isDev } from '@/utils'

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log(err)
  console.log(info)
}
Vue.config.productionTip = false

if (isDev()) {
  // makeServer()
  if (openVc) {
    import('vconsole').then(res => {
      // console.log(res)
      const VConsole = res.default
      new VConsole() /* eslint-disable-line */
    })
  }
}
