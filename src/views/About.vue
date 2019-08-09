<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Icon
      class="ali-icon"
      name="pengyouquan"
    />
    <input
      type="text"
      v-model.number="age"
    >
    <button @click="goTable">
      表格
    </button>
    <BaseIconSvg name="add" />
    <Title>{{ title }}</Title>
    <button @click="showFaAction">
      显示Action
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
import utils from '@/utils'
export default {
  data () {
    console.log('data---', this.$route.path)
    return {
      title: '',
      showSelect: false,
      list: [1, 2, 3, 4, 5, 6, 7],
      age: ''
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
  },
  methods: {
    showFaAction () {
      utils.log.default('哈哈哈')
      this.showSelect = true
    },
    stopBubble () {
      return false
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
  .list-wrap{
    font-size: dw(36);
    max-height: dw(400);
    overflow-y: scroll;
    /deep/ .list {
      height: dw(80);
      line-height: dw(80);
      background:#fff;
      border-bottom:1px solid #efefef;
    }
  }

</style>
