<template>
  <div class="box">
    <div
      class="wrap"
      @click="clickEvent"
    />
    <div class="btn" />
    <div
      class="btn2"
      v-event:tap="tapEvent"
      v-event:longTap="longTapEvent"
    >
      暗室逢灯单发顺丰
    </div>
  </div>
</template>

<script>
import MyEvent from '@/utils/my-event.js'
import utils from '@/utils'

export default {
  data () {
    return {
      utilEvent: null
    }
  },
  mounted () {
    var myUtilEvent = new MyEvent({ select: '.wrap' })
    this.utilEvent = myUtilEvent
    myUtilEvent.tap(this.tapWrap)
    myUtilEvent.longTap(this.longTap)
    myUtilEvent.leftSlip(this.leftSlip)
    myUtilEvent.rightSlip(this.rightSlip)
    myUtilEvent.upSlip(this.upSlip)
    myUtilEvent.downSlip(this.downSlip)
    var btnEvent = new MyEvent({ select: '.btn' })
    btnEvent.upSlip(this.upSlip2, true)
    btnEvent.longTap(this.longTap2, this.longTapEnd)
  },
  methods: {
    tapWrap () {
      utils.log.default('tap 事件发生了' + +new Date())
    },
    longTap () {
      utils.log.default('longTap 事件发生了')
    },
    longTap2 () {
      utils.log.default('longTap2 事件发生了')
    },
    longTapEnd () {
      utils.log.default('longTapEnd 事件发生了')
    },
    leftSlip () {
      utils.log.default('leftSlip 事件发生了')
    },
    rightSlip () {
      utils.log.default('rightSlip 事件发生了')
    },
    upSlip () {
      utils.log.default('upSlip 事件发生了')
    },
    upSlip2 () {
      utils.log.default('upSlip2 事件发生了')
    },
    downSlip () {
      utils.log.default('downSlip 事件发生了')
    },
    clickEvent () {
      utils.log.default('点击事件发生了' + +new Date())
    },
    destory () {
      return Promise.resolve(1)
    },
    pageDestory () {
      this.destory()
    },
    tapEvent () {
      utils.log.default('2222222222')
    },
    longTapEvent () {
      utils.log.default('3333333')
    },
    endHandle () {
      utils.log.default('6666666')
    }
  },
  beforeDestroy () {
    // console.log(this.observer)
    // this.utilEvent && this.utilEvent.notify && this.utilEvent.notify()
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: dw(400);
  height: dw(400);
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.box{
  position: relative;
  height: calc(100% - .8rem);
}
.btn{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.btn2{
  margin-top: .5rem;
  height: .8rem;
  @extend %unselected;
}
</style>
