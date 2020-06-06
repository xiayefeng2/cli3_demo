<template>
  <div class="top-head-wrap">
    <button @click="goAbout">
      点击我
    </button>
  </div>
</template>

<script>
export default {
  created () {
    console.log('top header created')
  },
  mounted () {
    console.log('top header mounted')
  },
  methods: {
    goAbout () {
      this.$router.push('/about/3')
    }
  }
}
</script>

<style lang="scss" scoped>
.top-head-wrap {
  height: 80px;
}
</style>
