export default class myEvent {
  eventList = new Map()
  onceList = new Map()
  onceSet = new Set()
  on (event, fn) {
    if (this.onceList.has(event)) {
      this.offOnce(event)
      console.log(`on ${event}事件已经覆盖 once ${event} 事件`)
    }
    if (this.eventList.has(event)) {
      let tips = `已经存在${event}事件，再次绑定将会覆盖之前绑定事件`
      console.log(tips)
    }
    this.eventList.set(event, fn)
  }
  once (event, fn) {
    if (this.eventList.has(event)) {
      this.off(event)
      console.log(`once ${event} 事件已经覆盖 on ${event} 事件`)
    }
    if (this.onceList.has(event)) {
      let tips = `已经存在${event}事件，再次绑定将会覆盖之前绑定事件`
      console.log(tips)
    }
    this.onceSet.add(event)
    this.onceList.set(event, fn)
  }
  emit (event, ...args) {
    if (this.eventList.has(event)) {
      this.eventList.get(event).apply(null, args)
    } else if (this.onceList.has(event)) {
      this.onceList.get(event).apply(null, args)
      this.offOnce(event)
    } else {
      if (this.onceSet.has(event)) {
        console.warn(`once ${event} already called`)
      } else {
        console.warn(`no bind such ${event}`)
      }
    }
  }
  off (event) {
    this.eventList.delete(event)
  }
  offOnce (event) {
    this.onceList.delete(event)
  }
  clear () {
    this.eventList.clear()
  }
}
