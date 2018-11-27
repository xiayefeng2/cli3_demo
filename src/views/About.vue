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
    <sheet-action :show-action="showSelect">
      <ul @click.stop="stopBubble"><li
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
  }
  .ali-icon{
    font-size: 30px;
  }
</style>
