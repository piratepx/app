<template>
  <div
    ref="scrollable"
    class="overflow-x-auto"
    :style="{ direction: 'rtl' }"
    @scroll="$emit('scroll', $event)"
  >
    <ol class="flex" :style="{ minWidth: '1100px' }">
      <slot />
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    scrollLeft: {
      type: Number,
      default: 0,
    },
  },
  emits: ['scroll'],
  watch: {
    scrollLeft(value) {
      this.$refs.scrollable.scrollLeft = value
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollable.scrollLeft = this.scrollLeft
    })
  },
}
</script>
