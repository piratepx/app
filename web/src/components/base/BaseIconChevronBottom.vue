<template>
  <base-icon :width="width" :height="height">
    <path d="M30 12 L16 24 2 12" />
  </base-icon>
</template>

<script>
import BaseIcon from '/@/components/base/BaseIcon.vue'

export default {
  components: {
    BaseIcon,
  },
  props: {
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
  },
}
</script>
