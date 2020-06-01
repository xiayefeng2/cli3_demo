import { Server, Model } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  let server = new Server({
  // 环境变量
    environment,
    // 数据模型，描述数据结构，用于 Mirage 的 ORM
    models: {
      todo: Model
    },
    // 数据生成器
    seeds (server) {
      server.create('todo', { content: 'Learn Mirage JS' })
      server.create('todo', { content: 'Integrate With Vue.js' })
    },
    // 路由处理
    routes () {
      this.namespace = 'api'

      this.get('/todos', schema => {
        return schema.todos.all()
      })
      // 如果执行这个方法，其他没有匹配的请求路径不会拦截。适合只模拟部分接口的情况
      this.passthrough()
    }
  })

  return server
}
