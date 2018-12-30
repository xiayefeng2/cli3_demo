<template>
  <div
    class="action-sheet-wrap"
    v-if="showAction"
    @click.stop="closeMask"
    @touchmove.stop.prevent="cancleBubble"
  >
    <Transition name="action-box">
      <div
        class="item-wrap"
        :class="[{'item-show':showAction}, position==='bottom'?'item-wrap-bottom':'item-wrap-top']"
        @touchmove.stop="stopBubble"
      >
        <h3
          class="top-title"
          v-if="hasTitle"
          @click.stop="stopBubble"
        >
          <span>{{ actionTitle }}</span>
          <span
            class="close-btn"
            @click="closeMask"
          >
            <Icon
              class="ali-icon"
              name="close"
            />
          </span>
        </h3>
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script>
import { ModalHelper } from './preventScroll'
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
      // alert(1)
      return false
    },
    closeMask () {
      // console.log(1)
      this.$emit('close-mask')
    },
    stopBubble () {
      return false
    }
  },
  watch: {
    showAction (newValue, oldValue) {
      if (newValue) {
        ModalHelper.afterOpen()
      } else {
        ModalHelper.beforeClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.action-sheet-wrap {
  @extend %fix;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;

  .item-wrap {
    @extend %abs;
    left: 0;
    width: 100%;
    transition: all 0.2s;
  }
  .item-wrap-bottom {
    bottom: 0;
    animation: dialogShow 0.2s;
  }
  .item-wrap-top {
    top: 0;
    animation: dialogShow2 0.2s;
  }
   .item-wrap.item-show {
    // transform: translate3d(0, 0, 0);
    transition: transform 0.2s;
  }

  .top-title {
    @extend %rel;
    text-align: center;
    font-size: dw(32);
    height: dw(100);
    line-height: dw(100);
    background: #fff;
    border-bottom: 1px solid #e8e8ed;

    .close-btn {
      @extend %abs;
      right: dw(10);
      top: 50%;
      width: dw(80);
      height: dw(80);
      transform: translateY(-50%);
      line-height: dw(80);

      &:active{
        background:#ccc;
      }
    }
    .ali-icon {
      font-size: dw(48);
      margin: dw(16) auto;
    }
  }
}
</style>
