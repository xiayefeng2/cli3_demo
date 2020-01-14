<template>
  <div class="form-submit-wrap">
    <button @click="submit('a', 1)">
      点击我
    </button>
  </div>
</template>

<script>
import { submitNoRepeat } from '@/utils'
export default {
  methods: {
    submit: submitNoRepeat(function (a, b, cb) {
      /* let arr = Array.from(arguments)
      let cb = arr.pop()
      let [a] = arr */
      console.log(b)
      setTimeout(() => {
        console.log(a)
        cb()
      }, 2000)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
