<template>
  <div class="img-water-wrap">
    <input
      type="file"
      accept=".png, .jpg, .jpeg"
      @change="selectImg"
    >
    <div>文件大小: {{ fileSize }}</div>
    <img
      ref="img"
      class="image hide-img"
      src="imgUrl"
      alt="#"
    >
    <img
      class="image"
      ref="resImg"
      src=""
      alt="##"
    >
    <!--  <input
      type="file"
      accept="image/*"
      capture="user"
    >
    <input
      type="file"
      accept="audio/*"
      capture="user"
    >
    <input
      type="file"
      accept="video/*"
      capture="user"
    > -->
  </div>
</template>

<script>
import { returnFileSize } from '@/utils'
export default {
  data () {
    return {
      fileSize: 0,
      imgUrl: '',
      imgWidth: 375,
      imgHeight: 300
    }
  },
  methods: {
    selectImg (e) {
      // console.log(e)
      let that = this
      let target = e.target
      if (target.files.length === 0) {
        return
      }
      let file = target.files[0]
      let img = this.$refs.img
      img.src = window.URL.createObjectURL(file)
      // let width = getComputedStyle(img).width
      img.onload = function () {
        let width = this.width
        that.imgWidth = width
        // let height = getComputedStyle(img).height
        let height = this.height
        that.imgHeight = height
      }

      let fileSize = returnFileSize(file.size)
      this.fileSize = fileSize
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', function (res) {
        let base64 = this.result
        // console.log(base64)
        var canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')
        // 这是上传图像
        var imgUpload = new Image()
        imgUpload.onload = function () {
          // 绘制
          canvas.width = that.imgWidth
          canvas.height = that.imgHeight
          context.drawImage(imgUpload, 0, 0, that.imgWidth, that.imgHeight)
          context.save()
          context.fillStyle = 'red'
          context.font = '18px sans-serif'
          context.translate(50, 40)
          context.rotate(Math.PI / 15)
          context.fillText('我是海贼王，哈哈哈哈哈！', 50, 40)
          context.restore()
          var finalResult = canvas.toDataURL('image/jpeg')
          // img.src = finalResult
          that.$refs.resImg.src = finalResult
        }
        imgUpload.src = base64
      }, false
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.image{
  width: 100vw;
  height: auto;
}
.hide-img{
  position: absolute;
  left: -1000px;
  top: 0;
}
</style>
