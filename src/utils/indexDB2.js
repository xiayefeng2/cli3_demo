export default class indexedDB {
  databaseName = 'myIndexedDB'
  db = null
  request = window.indexedDB.open(this.databaseName)
  keySet = new Set()
  constructor () {
    this.init()
  }
  init () {
    this.request.onerror = event => {
      console.log('数据库打开报错')
      console.log(event)
    }

    this.request.onsuccess = event => {
      this.db = this.request.result
      this.readAll()
      console.log('数据库打开成功')
    }

    this.request.onupgradeneeded = (event) => {
      this.db = event.target.result
      if (!this.db.objectStoreNames.contains('storage')) {
        let objectStore = this.db.createObjectStore('storage', { keyPath: 'key' })
        objectStore.createIndex('date', 'date', { unique: false })
      }
    }
  }
  addData (key, value, express = Date.now()) {
    if (!this.db) {
      let error = new Error('初始化未完成')
      return Promise.reject(error)
    }

    let request = this.db.transaction(['storage'], 'readwrite')
      .objectStore('storage')
      .add({ key, value, express, date: new Date() })
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        // console.log('数据写入成功')
        this.keySet.add(key)
        return resolve(event)
      }

      request.onerror = function (event) {
        console.log('数据写入失败')
        return reject(event)
      }
    })
  }
  setData (key, value, express) {
    if (key == null || value == null) {
      let error = new Error(`${this.name} function args error`)
      return Promise.reject(error)
    }
    if (this.keySet.has(key)) {
      return this.updateData(...arguments)
    } else {
      return this.addData(...arguments)
    }
  }

  getData (key) {
    if (!this.db) {
      let error = new Error('初始化未完成')
      return Promise.reject(error)
    }
    let transaction = this.db.transaction(['storage'])
    let objectStore = transaction.objectStore('storage')
    let request = objectStore.get(key)
    return new Promise((resolve, reject) => {
      request.onerror = function (event) {
        // console.log('事务失败')
        let error = new Error(`读取${key}失败`)
        reject(error)
      }
      request.onsuccess = function (event) {
        if (request.result) {
          resolve(request.result.value)
        } else {
          // console.log('未获得数据记录')
          // let error = new Error(`未获得数据记录`)
          resolve(null)
        }
      }
    })
  }

  readAll () {
    let objectStore = this.db.transaction('storage').objectStore('storage')

    objectStore.openCursor().onsuccess = (event) => {
      let cursor = event.target.result
      if (cursor) {
        this.keySet.add(cursor.key)
        cursor.continue()
      } else {
        console.log(this.keySet)
        console.log('没有更多数据了！')
      }
    }
  }
  updateData (key, value, express = Date.now()) {
    if (!this.db) {
      let error = new Error('初始化未完成')
      return Promise.reject(error)
    }
    let request = this.db.transaction(['storage'], 'readwrite')
      .objectStore('storage')
      .put({ key, value, express, date: new Date() })

    return new Promise((resolve, reject) => {
      request.onsuccess = function (event) {
        // console.log('数据更新成功')
        return resolve('数据更新成功')
      }

      request.onerror = function (event) {
        // console.log('数据更新失败')
        let error = new Error('数据更新失败')
        return reject(error)
      }
    })
  }
  removeData (key) {
    if (!this.keySet.has(key)) {
      return Promise.resolve('数据已删除')
    }
    var request = this.db.transaction(['storage'], 'readwrite')
      .objectStore('storage')
      .delete(key)

    return new Promise((resolve, reject) => {
      request.onsuccess = function (event) {
        this.keySet.delete(key)
        resolve('数据删除成功')
      }
      request.onerror = function (event) {
        let error = new Error('数据删除失败')
        reject(error)
      }
    })
  }
}
