<template>
  <img v-if="isEnabled" :src="src" />
</template>

<script>
export default {
  data() {
    return {
      timestamp: Date.now(),
    }
  },
  computed: {
    isEnabled() {
      return this.url && this.projectID
    },
    url() {
      return import.meta.env.VITE_PIRATEPX_URL
    },
    projectID() {
      return import.meta.env.VITE_PIRATEPX_PROJECT_ID
    },
    identifier() {
      return this.$route.name
    },
    src() {
      if (!this.isEnabled) {
        return
      }

      const query = new URLSearchParams({
        p: this.projectID,
        i: this.identifier,
        _: this.timestamp,
      })

      return `${this.url}?${query.toString()}`
    },
  },
  watch: {
    $route(to, from) {
      if (!this.isEnabled) {
        return
      }

      if (to.name !== from.name) {
        this.timestamp = Date.now()
      }
    },
  },
}
</script>
