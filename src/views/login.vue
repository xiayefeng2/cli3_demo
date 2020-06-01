<template>
  <div class="login-wrap">
    <div class="user-wrap">
      <input
        type="text"
        placeholder="用户名"
        v-model.lazy="name"
      >
    </div>
    <div class="ps-wrap">
      <input
        type="password"
        placeholder="密码"
        v-model="ps"
      >
    </div>
    <button
      class="login-btn"
      type="button"
    >
      登陆
    </button>
  </div>
</template>

<script>
const md5 = require('js-md5')
export default {
  data () {
    return {
      name: '',
      ps: ''
    }
  },
  created () {
    this.ps = 'wxs2233'
    let ps = md5(this.ps)
    this.creatInterval('world')
    console.log(ps)
  },
  methods: {
    creatInterval (msg) {
      let timer = setInterval(() => {
        console.log(msg)
      }, 1000)
      this.$once('hook:beforeDestroy', function () {
        clearInterval(timer)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-wrap,
  .ps-wrap{
    height: dw(80);
    line-height: dw(80);
  }
</style>
