
class Scheduler {
  list = []
  waitList = []
  parallelNum = 2
  add (promiseCreator) {
    if (this.list.length < this.parallelNum) {
      this.list.push(promiseCreator)
      let promise = promiseCreator()
      this.changeList(promise)
      return promise
    } else {
      return new Promise((resolve, reject) => {
        try {
          this.waitList.push({
            promise: promiseCreator,
            cb: resolve
          })
        } catch (err) {
          reject(err)
        }
      })
    }
  }
  changeList (promise) {
    promise.then(() => {
      // console.log(this.waitList)
      if (this.waitList.length > 0) {
        // this.list.splice(idx, 1)
        let obj = this.waitList.shift()
        let result = obj.promise()
        result.then(() => {
          obj.cb()
        })
        this.changeList(result)
      } else {
        this.list.length = 0
      }
    })
  }
}

const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
addTask(700, '5')
addTask(200, '6')
// 2 3 1 4
