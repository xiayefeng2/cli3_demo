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
  </div>
</template>
<script>
import SheetAction from 'components/common/SheetAction'
import html2canvas from 'html2canvas'
import utils from '@/utils'
import { myFn } from '@/utils/wx'

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
      ]
    }
  },
  created () {
    console.log('created---', this.$route.path)
  },
  mounted () {
    this.title = '我的主页'
    // let fn = utils.throttle(this.throttle, 400)
    let fn = utils.debounce(this.debounce, 500)
    window.onscroll = fn
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
        const response = await myFn(item.time)
        arr2.push(response)
      }
      console.log(arr2)
    },
    throttle () {
      console.log('throttle')
      // console.log('time ---->' + Date.now())
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
    downloadImg () {
      // let url = 'http://aicare.oss-cn-shenzhen.aliyuncs.com/test/platform/poster/293cb0af34054e40aa6031efa62429ce/user/39025002da964ec9b3e997b0bbc781ae.jpg'
      // savePicture(url)
      html2canvas(document.body).then((canvas) => {
        console.log(canvas)

        const ctx = canvas.toDataURL()
        // console.log(ctx)
        this.downLoad(ctx)
      })
      // this.downLoad(url)
    },
    downLoad (url) {
      // console.log(url)
      var oA = document.createElement('a')
      oA.download = '扫码关注.jpg'// 设置下载的文件名，默认是'下载'
      oA.href = url
      document.body.appendChild(oA)
      oA.click()
      oA.remove() // 下载之后把创建的元素删除
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
</style>
