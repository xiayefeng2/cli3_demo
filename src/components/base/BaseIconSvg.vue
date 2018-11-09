<template>
  <svg aria-hidden="true">
    <use :xlink:href="icon" />
  </svg>
</template>

<script>
export default {
  name: 'BaseIconSvg',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    icon () {
      return `#ph-${this.name}`
    }
  }
}
</script>

<style scoped>

</style>
