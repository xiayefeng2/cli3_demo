<template>
  <div
    class="sheet-wrap"
    v-if="showAction"
    @click.stop="closeMask"
    @touchmove.prevent.stop="cancleBubble"
  >
    <div
      class="item-wrap"
      :class="[{'item-show':showAction}, position==='bottom'?'item-wrap-bottom':'item-wrap-top']"
    >
      <h3
        class="top-title"
        v-if="hasTitle"
        @click.stop="stopBubble"
      >{{ actionTitle }}
        <icon
          class="ali-icon"
          name="close"
        />
      </h3>
    </div>
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
</style>
