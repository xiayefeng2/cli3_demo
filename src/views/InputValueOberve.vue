<template>
  <div class="main-wrap">
    <input
      type="text"
      id="txt"
      @input="changeText"
    >
  </div>
</template>

<script>
export default {
  mounted () {
    let obj = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
    Object.defineProperty(HTMLInputElement.prototype, 'value', {
      get: function () {
        return obj.get.call(this)
      },
      set: function (val) {
        this.setAttribute('data-val', val)
        obj.set.call(this, val)
        // this.set(val)
      }
    })
  },
  methods: {
    changeText (e) {
      const input = e.target
      input.setAttribute('data-val', input.vulue)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
