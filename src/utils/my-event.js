import { Subject, Observer } from './observer'

export default class MyEvent extends Subject {
  constructor (props) {
    super(props)
    let select = props.select
    if (typeof select === 'string') {
      this.ele = document.querySelector(select)
    } else if (select instanceof HTMLElement && select.nodeType === 1) {
      this.ele = select
    } else {
      throw new TypeError('props of select must be string or HTMLElement')
    }
    this.tapLastTime = null
    if (props.tapTime) {
      this.tapTime = props.tapTime
    }
    if (props.longTapTime) {
      this.longTapTime = props.longTapTime
    }
    if (props.desX) {
      this.desX = props.desX
    }
    if (props.desY) {
      this.desY = props.desY
    }
    if (props.minMoveDes) {
      this.minMoveDes = props.minMoveDes
    }

    if (props.destory && typeof props.destory === 'function') {
      props.destory().then(() => {
        this.notify()
      }).catch(err => {
        console.log(err)
      })
    }
  }

  tapTime = 200 // 点击事件触发的最大时间 ms
  longTapTime = 400 // 长按事件触发的等待时间 ms
  desX = 30 // 滑动时X轴方向最大偏移量 px
  desY = 30 // 滑动时Y轴方向最大偏移量 px
  minMoveDes = 50 // 最小移动距离 px

  tap (handler) {
    let startTime, endTime
    let that = this
    let touchFn = function (e) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          break
        case 'touchend':
          endTime = new Date().getTime()
          if (endTime - startTime < that.tapTime) {
            if (!that.tapLastTime || endTime - that.tapLastTime > 600) { // 防止重复提交
              that.tapLastTime = +new Date()
              handler.call(this, e)
            }
          }
          break
        default:
          startTime = new Date().getTime()
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)
    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  longTap (startHandle, endHandle) {
    let startTime, endTime, timerId, startX, startY, endY
    let isLongPress = false
    let that = this
    let touchFn = function (e) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          timerId = setTimeout(() => {
            startHandle.call(this, e)
            isLongPress = true
            timerId = null
          }, that.longTapTime)
          break
        case 'touchmove':
          let isMove = Math.abs(e.changedTouches[0].clientX - startX) > this.desX || Math.abs(e.changedTouches[0].clientY - startY) > this.desY
          startTime = new Date().getTime()
          if (isMove && !isLongPress) {
            timerId && clearTimeout(timerId)
            timerId = setTimeout(() => {
              startHandle.call(this, e)
              isLongPress = true
              timerId = null
            }, that.longTapTime)
          }
          break
        case 'touchend':
          endTime = new Date().getTime()
          endY = e.changedTouches[0].clientY
          // console.log(endY, startY)
          // console.log('Y:' + (startY - endY))
          // console.log('time:' + (endTime - startTime))
          if (endTime - startTime < that.longTapTime) {
            timerId && clearTimeout(timerId)
          } else if (endHandle && (startY - endY < that.desY)) {
            endHandle.call(this, e)
          }
          // clearTimeout(timerId)
          break
        default:
          clearTimeout(timerId)
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchmove', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchmove', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  leftSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e) {
      // console.log(e.type)
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          if (Math.abs(startY - endY) < that.desY && startX - endX > that.minMoveDes) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  rightSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          if (Math.abs(startY - endY) < that.desY && endX - startX > that.minMoveDes) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  upSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e) {
      // console.log(e.type)
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          /* console.log('X:' + Math.abs(startX - endX))
          console.log('Y:' + (startY - endY)) */
          if ((Math.abs(startX - endX) < that.desX && startY - endY > that.minMoveDes)) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }
  downSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e) {
      console.log(e.type)
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          console.log('X:' + Math.abs(startX - endX))
          console.log('Y:' + (endY - startY))
          if (Math.abs(startX - endX) < that.desX && endY - startY > that.minMoveDes) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }
}
