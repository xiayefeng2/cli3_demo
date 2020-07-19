<template>
  <div id="app">
    <div id="nav">
      <RouterLink to="/">
        Home
      </RouterLink> |
      <RouterLink to="/about/1">
        About
      </RouterLink>
    </div>
    <RouterView
      name="head"
      v-if="isRouterAlive"
    />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
import utils, { everyYear44 } from '@/utils'
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
    utils.log.default('App created')
  },
  mounted () {
    utils.log.default('App Mounted')
    // calcBaseRem()
    everyYear44()
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
  #nav{
    height: .8rem;
    line-height: .8rem;
  }
}
</style>
