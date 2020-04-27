
var databaseName = 'myIndexedDB'
var version = 1
var db = null
var request = window.indexedDB.open(databaseName, version)

request.onerror = event => {
  console.log('数据库打开报错')
  console.log(event)
}

request.onsuccess = event => {
  db = request.result
  console.log('数据库打开成功')
}

request.onupgradeneeded = function (event) {
  db = event.target.result
}
