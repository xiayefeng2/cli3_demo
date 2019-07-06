import { a } from './b'
console.log('333333333')
console.log(a)
class Logger {
  printName (name = 'there') {
    this.print(`Hello ${name}`)
  }

  print (text) {
    console.log(text)
  }
}

const logger = new Logger()
var proxy = new Proxy(logger, {
  get: function (target, key) {
    if (key === 'printName')
      return target[key].bind(target)
    }
})
const {printName} = proxy
// printName.call(logger)
printName()