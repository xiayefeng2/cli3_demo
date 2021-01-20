<template>
  <div class="home">
    <!-- <img
      alt="Vue logo"
      src="../assets/logo.png"
    > -->
    <div class="btn-wrap">
      <button @click="login">
        登录
      </button><button
        class="refresh-btn"
        @click="reload"
      >
        刷新
      </button>
      <button
        class="event-btn"
        @click="eventTest"
      >
        事件
      </button>
      <button
        class="form"
        @click="formSubmit"
      >
        表单
      </button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <marquee>滚动文字</marquee>
    <div class="svg-wrap">
      <svg
        class="svg-icon"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 H 80 V 80 L 40 50 L 0 80 Z" />
        <text
          x="30"
          y="35"
          class="small"
        >热</text>
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import { reqGet } from '@/api/common'
// import util from 'utils'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    console.log('home created')
    /* reqGet('/api', { a: 1, b: 2 }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    }) */
  },
  mounted () {
    console.log('home mounted')
    document.addEventListener('visibilitychange', this.visibilityChange)
    window.addEventListener('pageshow', this.pageShow)
    // console.log(top.window)
  },
  inject: ['reload'],
  methods: {
    login () {
      this.$router.push('/login')
    },
    eventTest () {
      this.$router.push('/event')
    },
    formSubmit () {
      this.$router.push('/form')
    },
    visibilityChange () {
      // 用户离开了当前页面
      if (document.visibilityState === 'hidden') {
        console.log('页面隐藏了')
      }

      // 用户打开或回到页面
      if (document.visibilityState === 'visible') {
        console.log('页面显示了')
      }
    },
    pageShow () {
      console.log('page show')
    }
  },
  beforeDestroy () {
    document.removeEventListener('visibilitychange', this.visibilityChange)
    window.removeEventListener('pageshow', this.pageShow)
  }
}
</script>
<style lang="scss" scoped>
.home {
  margin-bottom: 50px;
}
.btn-wrap {
  height: dw(80);
  line-height: dw(80);
}
.refresh-btn {
  margin: 0 dw(30);
}
.event-btn {
  margin-right: dw(30);
}
.svg-wrap{
  width: 80px;
  height: 80px;
  margin-left: 20px;
  .svg-icon{
    fill: #ccc;
  }
  ::v-deep .small{
    fill: #fff;
    font-size: 20px;
    color: #fff;
  }
}
</style>
