<template>
  <div id="app">
    <div id="nav">
      <RouterLink to="/">
        Home
      </RouterLink> |
      <RouterLink to="/about">
        About
      </RouterLink>
    </div>
    <RouterView
      name="head"
      v-if="isRouterAlive"
    />

    <router-view />
  </div>
</template>
<script>
import { calcBaseRem } from '@/utils'
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {

  },
  mounted () {
    console.log('App Mounted')
    calcBaseRem()
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  }
}
</script>
<style lang="scss">
@import '~@/style/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: dw(32);
  overflow: auto;
  height: 100%;
}
</style>
