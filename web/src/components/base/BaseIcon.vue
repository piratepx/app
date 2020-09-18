<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon inline"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    :stroke-width="strokeWidth"
    :width="width"
    :height="height"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
    strokeWidth: {
      type: Number,
      default: 3,
    },
  },
}
</script>
