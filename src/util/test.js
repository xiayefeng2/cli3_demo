/* 本文件用来学习、测试及练习用 */
import {
  hasOwn
} from 'index'
// 构造函数原型模式
function Person () {}
Person.prototype = {
  name: 'JeeK',
  age: 29,
  job: 'Software Engineer',
  sayName: function () {
    alert(this.name)
  }
}
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
})

function margeObj () {
  const arr = [{
    x: 'aa',
    y: 'bb'
  }, {
    x: 'aa',
    z: 'cc'
  }, {
    x: 'zz',
    y: 'dd'
  }, {
    x: 'aa',
    d: 33
  },
  {
    x: 'zz',
    c: 55
  }
  ]
  const obj = {}
  const arr2 = []
  /*
   ** method1
  for (let i = 0; i < arr.length;) {
    if (arr2.includes(arr[i].x)) {
      for (let j = 0; j < i; j++) {
        if (arr[j].x === arr[i].x) {
          arr[j] = Object.assign(arr[j], arr[i])
          arr.splice(i, 1)
          break
        }
      }
    } else {
      arr2.push(arr[i].x)
      i++
    }
  } */
  for (let i = 0; i < arr.length;) {
    if (hasOwn(obj, arr[i].x)) {
      arr[obj[arr[i].x]] = { ...arr[obj[arr[i].x]], ...arr[i] }
      arr.splice(i, 1)
    } else {
      obj[arr[i].x] = i
      i++
    }
  }
  console.log(arr)
}
margeObj()
