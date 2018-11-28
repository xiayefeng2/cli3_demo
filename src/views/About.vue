<template>
  <div class="about">
    <h1>This is an about page</h1>
    <icon
      class="ali-icon"
      name="pengyouquan"
    />
    <base-icon-svg name="add" />
    <v-title>{{ title }}</v-title>

    <button @click="showFaAction">显示Action</button>
    <sheet-action
      :show-action="showSelect"
      @close-mask="closeMask"
    >
      <ul
        @click.stop="stopBubble"
        class="list-wrap"
      ><li
        class="list"
        v-for="(item, index) of [1, 2, 3, 4, 5]"
        :key="index"
      >{{ item }}</li></ul>
    </sheet-action>
  </div>
</template>
<script>
import SheetAction from 'components/common/SheetAction'
export default {
  data () {
    return {
      title: '',
      showSelect: false
    }
  },
  mounted () {
    this.title = '我的主页'
  },
  methods: {
    showFaAction () {
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
  }
  .ali-icon {
    font-size: dw(30);
  }
  .list-wrap{
    font-size: dw(36);
  }
  .list {
    height: dw(80);
    line-height: dw(80);
    background:#fff;
    border-bottom:1px solid #efefef;
  }
</style>
