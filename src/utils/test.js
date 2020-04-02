/* 本文件用来学习、测试及练习用 */
// import { hasOwn } from './index'
// import _ from 'lodash'

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
  const arr = [
    {
      x: 'aa',
      y: 'bb'
    },
    {
      x: 'aa',
      z: 'cc'
    },
    {
      x: 'zz',
      y: 'dd'
    },
    {
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
  /*
  ** method2
   for (let i = 0; i < arr.length;) {
    if (hasOwn(obj, arr[i].x)) {
      arr[obj[arr[i].x]] = { ...arr[obj[arr[i].x]], ...arr[i] }
      arr.splice(i, 1)
    } else {
      obj[arr[i].x] = i
      i++
    }
  } */
/*   arr.reduce((prev, curr, idx) => {
    if (idx === 1) {
      obj[prev.x] = 0
      arr2.push(prev)
    }
    if (hasOwn(obj, curr.x)) {
      arr2[obj[curr.x]] = { ...arr2[obj[curr.x]], ...curr }
    } else {
      obj[curr.x] = arr2.length
      arr2.push(curr)
    }
    return arr2
  }) */
  /* console.log(arr2)
  console.log(arr) */
}
// margeObj()

// 寄生组合式继承
function inheritPrototype (subType, superType) {
  var prototype = Object.create(superType.prototype) // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function () {
  alert(this.name)
}

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType (name, age) {
  SuperType.call(this, name)
  this.age = age
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType)

// 新增子类原型属性
SubType.prototype.sayAge = function () {
  alert(this.age)
}

var instance1 = new SubType('xyc', 23)
var instance2 = new SubType('lxy', 23)

instance1.colors.push('2') // ["red", "blue", "green", "2"]
instance2.colors.push('3') // ["red", "blue", "green", "3"]

function Shape () {
  this.x = 0
  this.y = 0
}

function Circle () {
  Shape.call(this)
}

/* Circle.prototype = _.create(Shape.prototype, {
  constructor: Circle
}) */

var circle = new Circle()
console.log(circle instanceof Circle)
// => true
console.log(circle instanceof Shape)
// => true

var reg2 = /(\w*\/+)\w*$/
var str2 = 'platform/saas/20200305/f812c3e101e442d39691b0842430c8b0.jpg'
console.log(str2.replace(reg2, '$1' + 'press_'))
