export default class MyEvent {
  constructor (props) {
    let select = props.select
    if (typeof select === 'string') {
      this.ele = document.querySelector(select)
    } else if (select instanceof HTMLElement && select.nodeType === 1) {
      this.ele = select
    } else {
      throw new TypeError('props of select must be string or HTMLElement')
    }
    this.tapLastTime = null
  }
  tap (handler) {
    let startTime, endTime
    let touchFn = function (e) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          break
        case 'touchend':
          endTime = new Date().getTime()
          if (endTime - startTime < 200) {
            if (!this.tapLastTime || endTime - this.tapLastTime > 600) { // 防止重复提交
              this.tapLastTime = +new Date()
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
  }

  longTap (startHandle, endHandle) {
    let startTime, endTime, timerId, startX, startY
    let isLongPress = false
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
          }, 500)
          break
        case 'touchmove':
          let isMove = Math.abs(e.changedTouches[0].clientX - startX) > 10 || Math.abs(e.changedTouches[0].clientY - startY) > 10
          startTime = new Date().getTime()
          if (isMove && !isLongPress) {
            timerId && clearTimeout(timerId)
            timerId = setTimeout(() => {
              startHandle.call(this, e)
              isLongPress = true
              timerId = null
            }, 500)
          }
          break
        case 'touchend':
          endTime = new Date().getTime()
          if (endTime - startTime < 500) {
            timerId && clearTimeout(timerId)
          } else if (endHandle) {
            endHandle.call(this, e)
          }
          clearTimeout(timerId)
          break
        default:
          clearTimeout(timerId)
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchmove', touchFn)
    this.ele.addEventListener('touchend', touchFn)
  }

  leftSlip (handler) {
    let startX, startY, endX, endY
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
          if (Math.abs(startY - endY) < 30 && startX - endX > 50) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)
  }

  rightSlip (handler) {
    let startX, startY, endX, endY
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
          if (Math.abs(startY - endY) < 30 && endX - startX > 50) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)
  }

  upSlip (handler, sort) {
    let startX, startY, endX, endY
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
          console.log('Y:' + (startY - endY))
          if ((Math.abs(startX - endX) < 40 && startY - endY > 50) || (sort && startY - endY > 60)) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)
  }
  downSlip (handler) {
    let startX, startY, endX, endY
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
          if (Math.abs(startX - endX) < 30 && endY - startY > 50) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)
  }
}
