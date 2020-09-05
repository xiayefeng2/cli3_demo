<template>
  <div class="about">
    <h1>This is an about page</h1>
    <IconFont
      class="ali-icon"
      name="pengyouquan"
    />
    <input
      type="text"
      v-model="text"
      @keyup="search"
    >
    <button @click="goTable">
      表格
    </button>
    <BaseIconSvg name="add" />
    <Title>{{ title }}</Title>
    <button @click="showFaAction">
      显示Action
    </button>
    <button @click="downloadImg">
      下载图片
    </button>
    <button @click="uploadImg">
      上传图片
    </button>
    <button @click="getLocation">
      点击我
    </button>
    <button @click="certPerson">
      认证
    </button>
    <button @click="mediaFile">
      多媒体
    </button>
    <button @click="setIndexedDB">
      indexedDB
    </button>
    <button @click="getIndexedDB">
      getData
    </button>
    <button @click="delIndexedDB">
      delData
    </button>
    <button @click="goExcel">
      Excel
    </button>
    <button @click="inputValOberve">
      InputEvent
    </button>
    <div class="show-box">
      {{ positionText }}
    </div>
    <SheetAction
      :show-action="showSelect"
      @close-mask="closeMask"
    >
      <ul
        @click.stop="stopBubble"
        class="list-wrap"
      >
        <li
          class="list"
          v-for="(item, index) of list"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </SheetAction>
    <div class="bottom-btn">
      我是按钮
    </div>
  </div>
</template>
<script>
import SheetAction from 'components/common/SheetAction'
// import html2canvas from 'html2canvas'
import utils, { isInViewPort, oberverDOM } from '@/utils'
import { myFn } from '@/utils/wx'
import bsStore, { getSessionSize, getLocalSize } from 'bs-store'
import { setData, getData, removeData } from '@/utils/indexedDB.js'
// import LZString from 'lz-string'

let delay = Promise.resolve()
let timer = null

export default {
  data () {
    console.log('data---', this.$route.path)
    return {
      title: '',
      showSelect: false,
      list: [1, 2, 3, 4, 5, 6, 7],
      age: '',
      text: '',
      imageArr: [
        'https://user-gold-cdn.xitu.io/2017/6/22/b0cb03de9bfdeac20adc2381f86160e0?imageView2/1/w/800/h/600/q/85/format/webp/interlace/1',
        'https://user-gold-cdn.xitu.io/2019/10/15/16dcfbdcfd166872?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
        'https://user-gold-cdn.xitu.io/2019/10/15/16dcd7d7f735f0f3?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
      ],
      positionText: '',
      bottomBtn: null
    }
  },
  created () {
    console.log('created---', this.$route.path)
    bsStore.pressState = true
    bsStore.setSession('aaa', 111133)
    console.log(bsStore.getSession('aaa'))
    let size = getSessionSize()
    console.log(size)
    console.log(getLocalSize())
    console.log(this.$route.params)
    var string = { a: 'sdfsadfsadf', b: 153666, c: [1, 2, 3] }
    bsStore.setSession('ccc', string)
    console.log(bsStore.getSession('ccc'))
  },
  mounted () {
    this.title = '我的主页'
    this.bottomBtn = document.querySelector('.bottom-btn')
    oberverDOM(this.bottomBtn)
    let fn = utils.throttle(this.throttle, 200)
    // let fn = utils.debounce(this.debounce, 500)
    window.addEventListener('scroll', fn)
    window.postMessage('adsfas', location.protocol + '//' + location.host)
    // window.addEventListener('scroll', this.throttle)

    /* this.imageArr.map((item, idx) => {
      utils.getBase64Image(item, this.fn, idx)
    }) */
    // console.log(1)
    /* myFn({ id: 'adafd', idx: 0 }).then(res => {
      console.log(res)
    }) */
    this.testAsync([
      {
        time: 300, id: '1'
      },
      {
        time: 200, id: '2'
      },
      {
        time: 1000, id: '3'
      }
    ])
  },
  methods: {
    showFaAction () {
      utils.log.default('哈哈哈')
      this.showSelect = true
    },
    setIndexedDB () {
      setData('mytest', 236333).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    getIndexedDB () {
      getData('mytest').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    delIndexedDB () {
      removeData('mytest').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      removeData(1)
      removeData(2)
    },
    stopBubble () {
      return false
    },
    fn (res, idx) {
      console.log(idx)
      console.log(res)
    },
    changText (e) {
      // console.log(e.code)
    },
    search (e) {
      timer && clearTimeout(timer)
      // console.log(e.which)
      if (e.which === 13) {
        setTimeout(() => {
          console.log(this.text)
        }, 500)
        return
      }
      timer = setTimeout(() => {
        delay = delay.then(() => {
          // this.$emit('search-data', { val: this.inputV })
          setTimeout(() => {
            console.log(this.text)
          }, 500 * Math.random())
        })
        timer = null
      }, 100)
    },
    async testAsync (arr) {
      let arr2 = []
      for (let item of arr) {
        const response = await myFn(item)
        console.log(Date.now())
        arr2.push(response)
      }
      console.log(arr2)
    },
    throttle () {
      isInViewPort(this.bottomBtn)
      // console.log(isInViewPort(this.bottomBtn))
    },
    debounce () {
      console.log('debounce')
      // console.log('time ---->' + Date.now())
    },
    closeMask () {
      this.showSelect = false
    },
    goTable () {
      this.$router.push('/table')
    },
    certPerson () {
      this.$router.push('/photo')
    },
    uploadImg () {
      this.$router.push('/imgUpload')
    },
    mediaFile () {
      this.$router.push('/mediaFile')
    },
    goExcel () {
      this.$router.push('/excel')
    },
    inputValOberve () {
      this.$router.push('/inputOberve')
    },
    downloadImg () {
      let url = 'http://aicare.oss-cn-shenzhen.aliyuncs.com/test/platform/poster/293cb0af34054e40aa6031efa62429ce/user/39025002da964ec9b3e997b0bbc781ae.jpg'
      // savePicture(url)
      /*  html2canvas(document.body).then((canvas) => {
        console.log(canvas)

        const ctx = canvas.toDataURL()
        // console.log(ctx)
        this.downLoad(ctx)
      }) */
      this.downLoad(url)
    },
    downLoad (url) {
      // console.log(url)
      var oA = document.createElement('a')
      oA.download = '扫码关注.jpg'// 设置下载的文件名，默认是'下载'
      oA.href = url
      document.body.appendChild(oA)
      oA.click()
      oA.remove() // 下载之后把创建的元素删除
    },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.positionText += '经度' + position.coords.longitude
          this.positionText += '维度' + position.coords.latitude
          this.positionText += '准确度' + position.coords.accuracy
          this.positionText += '海拔' + position.coords.altitude
          this.positionText += '海拔准确度' + position.coords.altitudeAccuracy
          this.positionText += '行进方向' + position.coords.heading
          this.positionText += '地面速度' + position.coords.speed
          this.positionText += '请求时间' + new Date(position.timestamp)
        }, err => {
          alert(err.code)
        }, {
          enableHighAccuracy: false, // 位置是否精确获取
          timeout: 5000, // 获取位置允许的最长时间
          maximumAge: 1500 // 多久更新获取一次位置
        })
      } else {
        alert('不支持获取位置信息!')
      }
    }
  },
  components: {
    SheetAction
  }
}
</script>
<style lang="scss" scoped>
.about {
  @extend %abs;
  font-size: dw(32);
  min-height: 3000px;
}
.ali-icon {
  font-size: dw(72);
}
.list-wrap {
  font-size: dw(36);
  max-height: dw(400);
  overflow-y: scroll;
  /deep/ .list {
    height: dw(80);
    line-height: dw(80);
    background: #fff;
    border-bottom: 1px solid #efefef;
  }
}
.bottom-btn{
  width: 100%;
  height: dw(80);
  background-color: green;
  color: #fff;
  font-size: dw(36);
  line-height: dw(80);
  @extend %abs;
  left: 0;
  bottom: 0;
}
</style>
