<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
import { calcBaseRem } from 'util'
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
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
