function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
  this.sayHello = function () {
    console.log(`hell ${this.name}`)
  }
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}

var obj = new SuperType('xiao ming')
// console.log(obj.hasOwnProperty('sayName'))
// obj.sayHello()
// obj.sayName()
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key)
  } else {
    console.log(`key: ${key}`)
  }
}
