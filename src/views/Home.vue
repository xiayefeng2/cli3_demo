<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <div class="btn-wrap">
      <button @click="login">登录</button><button
        class="refresh-btn"
        @click="reload"
      >刷新</button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import util from 'util'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {

  },
  inject: ['reload'],
  methods: {
    login () {
      this.$router.push('/login')
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
    margin-left: dw(30);
  }
</style>
