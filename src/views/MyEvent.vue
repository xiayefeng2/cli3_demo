<template>
  <div
    class="wrap"
    @click="clickEvent"
  />
</template>

<script>
import MyEvent from '@/utils/my-event.js'

export default {
  data () {
    return {
    }
  },
  mounted () {
    var myUtilEvent = new MyEvent({ select: '.wrap' })
    myUtilEvent.tap(this.tapWrap)
    myUtilEvent.longTap(this.longTap)
    myUtilEvent.leftSlip(this.leftSlip)
    myUtilEvent.rightSlip(this.rightSlip)
    myUtilEvent.upSlip(this.upSlip)
    myUtilEvent.downSlip(this.downSlip)
  },
  methods: {
    tapWrap () {
      console.log('tap 事件发生了' + +new Date())
    },
    longTap () {
      console.log('longTap 事件发生了')
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

.wrap{
  width: dw(400);
  height: dw(400);
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
