<template>
  <div class="photo-wrap">
    <h1 class="title">
      {{ isdetected }}
    </h1>
    <video
      width="320"
      height="320"
      ref="videoDom"
      id="video_cam"
      preload
      autoplay
      loop
      muted
    />
    <canvas
      width="320"
      height="320"
      ref="canvasDOM"
      id="face_detect"
    />
    <img
      :src="faceImg"
      alt="#"
    >
    <input
      type="file"
      accept="audio/*"
      capture="user"
    >
  </div>
</template>

<script>
import tracking from 'tracking'
import { isEmpty } from '@/utils'
export default {
  data () {
    return {
      videoEl: null,
      canvasEL: null,
      autoCaptureTrackTraking: false,
      count: 0,
      userMediaConstraints: {
        audio: false,
        video: {
          width: {
            min: 320,
            ideal: 1280,
            max: 1920
          },
          height: {
            min: 240,
            ideal: 720,
            max: 1080
          },
          facingMode: 'user'
        }
      },
      isdetected: '请您保持脸部在画面中央',
      faceImg: ''
    }
  },
  mounted () {
    // The getUserMedia interface is used for handling camera input.
    // Some browsers need a prefix so here we're covering all the options
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
    // this.init()
  },
  methods: {
    async init () {
      this.videoEl = this.$refs.videoDom
      this.canvasEL = this.$refs.canvasDOM
      await navigator.mediaDevices
        .getUserMedia(this.userMediaConstraints)
        .then(this.getMediaStreamSuccess)
        .catch(this.getMediaStreamError)
      await this.onPlay()
    },
    async onPlay () {
      this.onTrackTracking()
    },
    onTrackTracking () {
      const context = this
      const video = this.videoEl
      const canvas = this.canvasEL
      const canvasContext = canvas.getContext('2d')
      let tracker = new tracking.ObjectTracker('face')

      video.pause()
      video.src = ''
      tracker.setInitialScale(4)
      tracker.setStepSize(2)
      tracker.setEdgesDensity(0.1)
      tracking.track('#video_cam', tracker, { camera: true })
      tracker.on('track', function (event) {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        event.data.forEach(function ({ x, y, width, height }) {
          canvasContext.strokeStyle = '#a64ceb'
          canvasContext.strokeRect(x, y, width, height)
          canvasContext.font = '11px Helvetica'
          canvasContext.fillStyle = '#fff'
          let snapData = canvasContext.toDataURL('image/jpg')
          console.log(snapData)
          this.faceImg = 'data:image/jpg;base64,' + snapData
        })

        if (!isEmpty(event.data) && context.count <= 10) {
          if (context.count < 0) context.count = 0
          context.count += 1
          // debugHelper.log(context.count)
          if (context.count > 10) {
            context.isdetected = '已检测到人脸，正在登录'
            // context.$router.push({ name: 'pwdlogin' })
          }
        } else {
          context.count -= 1
          if (context.count < 0) context.isdetected = '请您保持脸部在画面中央'
          // this.isdetected = '已检测到人脸，正在登录'
        }
      })
    },
    getMediaStreamSuccess (stream) {
      window.stream = stream // make stream available to browser console
      this.videoEl.srcObject = stream
      // this.$store.commit('setVideoCanvasObject', this.videoEl)
    },
    // 视频媒体流失败
    getMediaStreamError (error) {
      alert('视频媒体流获取错误' + error)
    },
    // 结束媒体流
    stopMediaStreamTrack () {
      clearInterval(this.timeInterval)
      if (typeof window.stream === 'object') {
        this.videoEl.srcObject = null
        // this.$store.commit('setVideoCanvasObject', '')
        window.stream.getTracks().forEach(track => track.stop())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-wrap{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.title{
  height: .8rem;
  line-height: .8rem;
  font-size: .32rem;
  text-align: center;
}
</style>
