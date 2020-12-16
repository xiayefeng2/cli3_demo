const fs = require('fs')
const handlebars = require('handlebars')

let refresh = async () => {
  const list = fs.readdirSync('../src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').tolowerCase(),
      file: v
    }))

  // 生成路由定义
  compile({ list }, '../src/router.js', '../template/router.js.hbs')

  // 生成菜单
  compile({ list }, '../src/App.vue', '../template/App.vue.hbs')

  /**
     * 模板编译
     * @param {*} meta 数据定义
     * @param {*} filePath 目标文件
     * @param {*} templatePath 模板文件
     */
  function compile (meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(filePath, result)
      console.log(`${filePath} 创建成功`)
    }
  }
}

module.exports = refresh
