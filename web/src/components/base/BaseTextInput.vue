<template>
  <input
    class="bg-transparent border-2 focus:border-gray-900 outline-none rounded-none px-3 py-1"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
}
</script>
