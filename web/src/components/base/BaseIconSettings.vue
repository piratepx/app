<template>
  <base-icon :width="width" :height="height">
    <path
      d="M13 2 L13 6 11 7 8 4 4 8 7 11 6 13 2 13 2 19 6 19 7 21 4 24 8 28 11 25 13 26 13 30 19 30 19 26 21 25 24 28 28 24 25 21 26 19 30 19 30 13 26 13 25 11 28 8 24 4 21 7 19 6 19 2 Z"
    />
    <circle cx="16" cy="16" r="4" />
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
