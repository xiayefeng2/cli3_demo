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
/* Element.prototype.trigger = function (type, data) {
  var event = document.createEvent('HTMLEvents')
  event.initEvent(type, true, true)
  event.data = data || {}
  event.eventName = type
  event.target = this
  this.dispatchEvent(event)
  return this
} */
window.addEventListener('storage', () => {
  // When local storage changes, dump the list to
  // the console.
  console.log(JSON.parse(window.localStorage.getItem('sampleList')))
})
export default {
  mounted () {
    let obj = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
    Object.defineProperty(HTMLInputElement.prototype, 'value', {
      get: function () {
        return obj.get.call(this)
      },
      set: function (val) {
        this.setAttribute('data-val', val)
        /* let event = new InputEvent('input')
        this.dispatchEvent(event, val) */
        obj.set.call(this, val)
        // this.set(val)
      }
    })
    document.getElementById('txt').value = 'adasf'
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
