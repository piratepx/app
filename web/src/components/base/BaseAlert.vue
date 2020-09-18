<template>
  <div
    class="bg-gray-200 font-semibold px-5 py-2"
    :class="{
      'bg-green-600': success,
      'bg-red-600': error,
      'bg-orange-600': warning,
      'text-white': success || error || warning,
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
