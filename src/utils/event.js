;(function (win, doc) {
  var myMobile = function () {
    return myMobile.prototype._init()
  }
  myMobile.prototype = {
    _init: function (select) {
      if (typeof select === 'string') {
        this.ele = doc.querySelector(select)
        return this
      } else {
        throw new TypeError('must be string params')
      }
    },
    tap: function (handler) {
      var startTime, endTime
      var touchFn = function (e) {
        e.preventDefault()
        switch (e.type) {
          case 'touchstart':
            startTime = new Date().getTime()
            break
          case 'touchend':
            endTime = new Date().getTime()
            if (endTime - startTime < 500) {
              handler.call(this, e)
            }
            break
          default:
            startTime = new Date().getTime()
            break
        }
      }
      this.ele.addEventListener('touchstart', touchFn)
      this.ele.addEventListener('touchend', touchFn)
    },
    longTap: function (handler) {
      var startTime, timerId
      var touchFn = function (e) {
        e.preventDefault()
        switch (e.type) {
          case 'touchstart':
            startTime = new Date().getTime()
            timerId = setTimeout(function () {
              handler.call(this, e)
              timerId = null
            }, 500)
            break
          case 'touchmove':
            clearTimeout(timerId)
            // startTime = new Date().getTime()
            break
          case 'touchend':
            /* endTime = new Date().getTime()
						if (endTime - startTime < 500) {
							timerId && clearTimeout(timerId)
            } */
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
  }
  win.$ = win.myMobile = myMobile
})(window, document)
