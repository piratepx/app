<template>
  <div
    ref="scrollable"
    class="overflow-x-auto"
    :style="{ direction: 'rtl' }"
    @scroll="scroll"
  >
    <ol class="flex" :style="{ minWidth: '1100px' }">
      <slot />
    </ol>
  </div>
</template>

<script>
let id = 0

export default {
  props: {
    scrollId: {
      type: Number,
      default: null,
    },
    scrollLeft: {
      type: Number,
      default: 0,
    },
  },
  emits: ['scroll'],
  data() {
    return {
      id: id++,
    }
  },
  watch: {
    scrollLeft(value) {
      if (this.scrollId !== this.id) {
        this.$refs.scrollable.scrollLeft = value
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollable.scrollLeft = this.scrollLeft
    })
  },
  methods: {
    scroll($event) {
      let scrollLeft = $event.target.scrollLeft

      if (this.scrollLeft === scrollLeft) {
        return
      }

      this.$emit('scroll', {
        scrollId: this.id,
        scrollLeft,
      })
    },
  },
}
</script>
