<template>
  <div class="media-wrap">
    <audio
      class="audio"
      loop
      preload
      controls
      src="https://wxu.sjfx.top/benpaobaxiongdi.mp3"
    />
    <video
      src="https://wxu.sjfx.top/05423786b7ea5dce1bc31f09bdf49679.mp4"
      class="video"
      controls
      preload
    />
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {
    let audio = document.querySelector('.audio')
    console.log(audio)
    setTimeout(() => {
      console.log(audio.duration)
      console.log(audio.currentTime)
    }, 500)
  },
  beforeDestroy () {
    let audio = document.querySelector('.audio')
    console.log(audio)
    /* audio.addEventListener('playing', function () {
      console.log('语音播放中')
      // classListIcon.add('hide-icon')
      // classListImg.remove('hide-icon')
    }, { once: true })
    if (!audio.paused) {
      audio.pause()
    } */
  },
  watch: {},
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
