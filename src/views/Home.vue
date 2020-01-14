<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
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
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import util from 'utils'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    console.log('home created')
  },
  mounted () {
    console.log('home mounted')
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .home{
    margin-bottom: 50px;
  }
  .btn-wrap{
    height: dw(80);
    line-height: dw(80);
  }
  .refresh-btn{
    margin: 0 dw(30);
  }
  .event-btn{
    margin-right: dw(30);
  }
</style>
