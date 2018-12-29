<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Icon
      class="ali-icon"
      name="pengyouquan"
    />
    <BaseIconSvg name="add" />
    <VTitle>{{ title }}</VTitle>
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
    return {
      title: '',
      showSelect: false,
      list: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  mounted () {
    this.title = '我的主页'
  },
  methods: {
    showFaAction () {
      utils.log.default('哈哈哈')
      this.showSelect = true
    },
    stopBubble () {
      return false
    },
    closeMask () {
      this.showSelect = false
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
    min-height: 700px;
  }
  .ali-icon {
    font-size: dw(72);
  }
  .list-wrap{
    font-size: dw(36);
    max-height: dw(400);
    overflow-y: scroll;
  }
  .list {
    height: dw(80);
    line-height: dw(80);
    background:#fff;
    border-bottom:1px solid #efefef;
  }
</style>
