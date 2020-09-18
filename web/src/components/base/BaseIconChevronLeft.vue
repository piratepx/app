<template>
  <base-icon :width="width" :height="height">
    <path d="M20 30 L8 16 20 2" />
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
