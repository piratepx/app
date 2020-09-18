<template>
  <component
    :is="component"
    v-bind="linkProps"
    class="button inline-flex items-center justify-center bg-gray-200 border-2 border-gray-200 px-3 py-1"
    :class="{
      primary,
      'bg-gray-900': primary,
      'border-gray-900': primary,
      'text-white': primary,
    }"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [String, Object],
      default: undefined,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    component() {
      if (this.isLink) {
        return 'router-link'
      }

      return 'button'
    },
    linkProps() {
      if (!this.isLink) {
        return {}
      }

      return {
        to: this.to,
        exact: this.exact,
      }
    },
    isLink() {
      return this.to !== undefined && !this.disabled
    },
  },
}
</script>

<style scoped>
.button:hover:not(:disabled) {
  @apply bg-gray-300;
  @apply border-gray-300;
}

.button.primary:hover:not(:disabled) {
  @apply bg-gray-700;
  @apply border-gray-700;
}

.button:disabled {
  @apply opacity-25;
  @apply cursor-default;
}

::v-deep(.icon) {
  @apply mr-2;
}
</style>
