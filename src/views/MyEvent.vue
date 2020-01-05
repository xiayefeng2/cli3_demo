<template>
  <div class="box">
    <div
      class="wrap"
      @click="clickEvent"
    />
    <div class="btn" />
  </div>
</template>

<script>
import MyEvent from '@/utils/my-event.js'

export default {
  data () {
    return {}
  },
  mounted () {
    var myUtilEvent = new MyEvent({ select: '.wrap' })
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
      console.log('tap 事件发生了' + +new Date())
    },
    longTap () {
      console.log('longTap 事件发生了')
    },
    longTap2 () {
      console.log('longTap2 事件发生了')
    },
    longTapEnd () {
      console.log('longTapEnd 事件发生了')
    },
    leftSlip () {
      console.log('leftSlip 事件发生了')
    },
    rightSlip () {
      console.log('rightSlip 事件发生了')
    },
    upSlip () {
      console.log('upSlip 事件发生了')
    },
    upSlip2 () {
      console.log('upSlip2 事件发生了')
    },
    downSlip () {
      console.log('downSlip 事件发生了')
    },
    clickEvent () {
      console.log('点击事件发生了' + +new Date())
    }
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
</style>
