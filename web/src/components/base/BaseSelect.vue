<template>
  <div class="inline-block relative" :class="containerClass">
    <select
      class="base-select block w-full appearance-none bg-transparent border-2 border-gray-400 focus:border-gray-900 outline-none rounded-none px-3 py-1"
      v-bind="$attrs"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
    </select>
    <div
      class="chevron pointer-events-none absolute inset-y-0 right-0 flex items-center bg-gray-100 border-2 border-gray-400 px-2 text-gray-400"
    >
      <base-icon-chevron-bottom />
    </div>
  </div>
</template>

<script>
import BaseIconChevronBottom from '/@/components/base/BaseIconChevronBottom.vue'

export default {
  components: {
    BaseIconChevronBottom,
  },
  inheritAttrs: false,
  props: {
    containerClass: {
      type: [String, Object, Array],
      default: null,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.base-select:focus + .chevron {
  @apply border-gray-900;
  @apply text-gray-900;
}
</style>
