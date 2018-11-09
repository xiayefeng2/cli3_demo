<template>
  <div class="about">
    <h1>This is an about page</h1>
    <icon
      class="ali-icon"
      name="pengyouquan"
    />
    <base-icon-svg name="add" />
    <v-title>{{ title }}</v-title>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    this.title = '我的主页'
  }
}
</script>
<style lang="scss" scoped>
  .about {
    @extend %abs;
  }
  .ali-icon{
    font-size: 30px;
  }
</style>
