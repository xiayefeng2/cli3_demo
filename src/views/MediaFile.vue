<template>
  <div class="media-wrap">
    <audio
      class="audio"
      loop
      preload
      controls
      src="https://wxu.sjfx.top/benpaobaxiongdi.mp3"
    >你的设别不支持audio标签</audio>
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
    return {
      audio: null
    }
  },
  computed: {},
  created () {},
  mounted () {
    let audio = document.querySelector('.audio')
    this.audio = audio
    setTimeout(() => {
      console.log(audio.duration)
      console.log(audio.currentTime)
    }, 500)
  },
  beforeDestroy () {
    console.log('aaa')
    console.log(this.audio)
    if (!this.audio.paused) {
      this.audio.pause()
    }
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
.video{
  width: 100%;
  height: auto;
}
</style>
