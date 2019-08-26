import { a } from './b'
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
    if (key === 'printName') {
      return target[key].bind(target)
    }
  }
})
const { printName } = proxy
// printName.call(logger)
printName()

function wait () {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main () {
  console.time()
  const x = wait()
  const y = wait()
  const z = wait()
  await x
  await y
  await z
  console.timeEnd()
}
main()
