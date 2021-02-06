import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default function registerComponent (Vue) {
  /**
   * 参数说明：
   * 1. 其组件目录的相对路径
   * 2. 是否查询其子目录
   * 3. 匹配基础组件文件名的正则表达式
   **/
  const modules = require.context('../components', false, /Base[A-Z]\w+\.(vue|js)$/)
  modules.keys().forEach(fileName => {
    // 获取组件配置
    const component = modules(fileName)
    // 获取组件名称，去除文件名开头的 `./` 和结尾的扩展名
    // const name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    const name = upperFirst(
      camelCase(
        // 获取和目录深度无关的文件名
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    // 注册全局组件
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    Vue.component(name, component.default || component)
  })
}
