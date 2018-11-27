<template>
  <div

    class="action-sheet-wrap"

    v-if="showAction"
    @click.stop="closeMask"
    @touchmove.prevent.stop="cancleBubble"
  >

    <transition name="action-box">
      <div
        class="item-wrap"
        :class="[{'item-show':showAction}, position==='bottom'?'item-wrap-bottom':'item-wrap-top']"
      >
        <h3
          class="top-title"
          v-if="hasTitle"
          @click.stop="stopBubble"
        ><span>{{ actionTitle }}</span>
          <span class="close-btn"><icon
            class="ali-icon"
            name="close"
          /></span>
        </h3>
        <slot />
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  data () {
    return {
      hasTitle: this.position === 'bottom'
    }
  },
  props: {
    showAction: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom'
    },
    actionTitle: {
      type: String,
      default: ''
    },
    hasCloseBtn: {
      type: Boolean,
      default: true
    }
  },
  computed: {},
  methods: {
    cancleBubble (e) {
      return false
    },
    closeMask () {
      this.$emit('close-mask')
    },
    stopBubble () {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

.action-sheet-wrap{
  @extend %fix;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background: rgba(0, 0, 0, .4);
  z-index: 5;

  .item-wrap{
    @extend %abs;
    left:0;
    width:100%;
    transition: transform 0.3s;
  }
  .item-wrap-bottom{
    bottom:0;
  }
  .item-wrap-top{
    top:0;
  }
  .action-box-enter{
    &.item-wrap-bottom {
      transform: translate3d(0, 100%, 0);
    }

    &.item-wrap-top {
      transform: translate3d(0, -100%, 0);
    }
  }

  .item-wrap.item-show {
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s;

  }

  .top-title{
    @extend %rel;
    text-align: center;
    font-size: dw(32);
    height: dw(100);
    line-height: dw(100);
    background: #fff;
    border-bottom: 1px solid #e8e8ed;

    .close-btn {
      @extend %abs;
      right: dw(20);
      top: 50%;
      width: dw(60);
      height: dw(60);
      transform: translateY(-50%);
      line-height: dw(60);
    }
    .ali-icon {
      font-size: dw(42);
    }
  }
}

</style>
