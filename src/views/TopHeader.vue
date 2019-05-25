<template>
  <div class="top-head-wrap">
    <button @click="goAbout">
      点击我
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goAbout () {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
.top-head-wrap {
  height: 80px;
}
</style>
