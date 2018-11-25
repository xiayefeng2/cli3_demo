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
       <div>哈哈哈</div>
    </sheet-action>
  </div>
</template>
<script>
import SheetAction from 'components/common/SheetAction'
export default {
  data () {
    return {
      title: '',
      showSelect: false,
    }
  },
  mounted () {
    this.title = '我的主页'
  },
  methods: {
    showFaAction() {
      
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
