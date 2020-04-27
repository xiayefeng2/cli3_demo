
const databaseName = 'myIndexedDB'
let db = null
let request = window.indexedDB.open(databaseName)
const keySet = new Set()

request.onerror = event => {
  console.log('数据库打开报错')
  console.log(event)
}

request.onsuccess = event => {
  db = request.result
  readAll()
  console.log('数据库打开成功')
}

request.onupgradeneeded = function (event) {
  db = event.target.result
  if (!db.objectStoreNames.contains('storage')) {
    let objectStore = db.createObjectStore('storage', { keyPath: 'key' })
    objectStore.createIndex('date', 'date', { unique: false })
  }
  readAll()
}

function addData (key, value, express = Date.now()) {
  if (!db) {
    let error = new Error('初始化未完成')
    return Promise.reject(error)
  }
  let request = db.transaction(['storage'], 'readwrite')
    .objectStore('storage')
    .add({ key, value, express, date: new Date() })
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      // console.log('数据写入成功')
      keySet.add(key)
      return resolve(event)
    }

    request.onerror = function (event) {
      console.log('数据写入失败')
      return reject(event)
    }
  })
}

export function setData (key, value, express) {
  if (keySet.has(key)) {
    return updateData.apply(this, arguments)
  } else {
    return addData.apply(this, arguments)
  }
}

export function getData (key) {
  if (!db) {
    let error = new Error('初始化未完成')
    return Promise.reject(error)
  }
  let transaction = db.transaction(['storage'])
  let objectStore = transaction.objectStore('storage')
  let request = objectStore.get(key)
  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      console.log('事务失败')
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

function readAll () {
  let objectStore = db.transaction('storage').objectStore('storage')

  objectStore.openCursor().onsuccess = function (event) {
    let cursor = event.target.result

    if (cursor) {
      keySet.add(cursor.key)
      console.log('key: ' + cursor.key)
      cursor.continue()
    } else {
      console.log(keySet)
      console.log('没有更多数据了！')
    }
  }
}

function updateData (key, value, express = Date.now()) {
  if (!db) {
    let error = new Error('初始化未完成')
    return Promise.reject(error)
  }
  let request = db.transaction(['storage'], 'readwrite')
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

export function removeData (key) {
  if (!keySet.has(key)) {
    return Promise.resolve('数据已删除')
  }
  var request = db.transaction(['storage'], 'readwrite')
    .objectStore('storage')
    .delete(key)

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      keySet.delete(key)
      resolve('数据删除成功')
    }
    request.onerror = function (event) {
      let error = new Error('数据删除失败')
      reject(error)
    }
  })
}
