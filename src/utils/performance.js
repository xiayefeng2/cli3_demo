export default class Performance {
  constructor () {
    this.paintArr = []
    this.timeObj = null
    this.memory = null
    this.navigationTime = []
    this.getEntriesArr = []
    this.performanceObj = null
  }

  firstPaintAndFirstContentfulPaint () {
    const arr = window.performance.getEntriesByType('paint')
    this.paintArr = arr
    return arr
  }

  getTime () {
    const obj = window.performance.timing
    this.timeObj = Object.assign(obj)
    return obj
  }

  getMemory () {
    const obj = window.performance.memory
    this.memory = Object.assign(obj)
    return obj
  }

  getResource () {
    const arr = window.performance.getEntriesByType('resource')
    return arr
  }

  getEntries () {
    const arr = window.performance.getEntries()
    this.getEntriesArr = arr.slice()
    return arr
  }

  navigationTiming () {
    const arr = window.performance.getEntriesByType('navigation')
    this.navigationTime = arr.slice()
    return arr
  }

  getPerformance () {
    const obj = Object.create(null)
    const pObj = this.navigationTiming()[0]
    obj.redirectCount = performance.navigation.redirectCount // 重定向次数
    obj.redirectTime = pObj.redirectEnd - pObj.redirectStart // 重定向耗时
    obj.DNSTime = pObj.domainLookupEnd - pObj.domainLookupStart // DNS解析耗时
    obj.TCPTime = pObj.connectEnd - pObj.connectStart // TCP 连接耗时
    obj.SSLTime = pObj.connectEnd - pObj.secureConnectionStart // SSL安全连接耗时
    obj.TTFB = pObj.responseStart - pObj.requestStart // 网络请求耗时 (TTFB)
    obj.dataSendTime = pObj.responseEnd - pObj.responseStart // 数据传输耗时
    obj.DOMTime = pObj.domInteractive - pObj.responseEnd // DOM 解析耗时
    obj.resourceTime = pObj.loadEventStart - pObj.domContentLoadedEventEnd // 资源加载耗时
    obj.firstTime = pObj.responseStart - pObj.domainLookupStart // 首包时间
    obj.whiteScreenTime = pObj.responseEnd - pObj.fetchStart // 白屏时间
    obj.firstEableTime = pObj.domInteractive - pObj.fetchStart // 首次可交互时间
    obj.DOMReadyTime = pObj.domContentLoadEventEnd - pObj.fetchStart // DOM Ready 时间
    obj.pageLoadTime = pObj.loadEventStart - pObj.fetchStart // 页面完全加载时间
    obj.headSize = pObj.transferSize - pObj.encodedBodySize // http 头部大小

    return obj
  }

  /**
   *  @param {*} type = 'img' | 'script' | 'link' | 'navigation' | 'css' | 'other'
   *  @return void
   */
  getResourceLoadTime (type = 'img') {
    let arr = this.getEntries()
    arr.forEach(resource => {
      if (resource.initiatorType === type) {
        console.info(`Time taken to load ${resource.name}: `, resource.responseEnd - resource.startTime)
      }
    })
  }
}
