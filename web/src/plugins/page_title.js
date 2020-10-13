import { computed, watch } from 'vue'

export default (app, { base = document.title, separator = ' – ' } = {}) => {
  function setPageTitle(pageTitle) {
    const parts = Array.isArray(pageTitle)
      ? [...pageTitle, base]
      : [pageTitle, base]

    document.title = parts.filter(Boolean).join(separator)
  }

  app.mixin({
    created() {
      let pageTitle = this.$options.pageTitle

      if (!pageTitle) {
        return
      }

      if (typeof pageTitle !== 'function') {
        return setPageTitle(pageTitle)
      }

      pageTitle = computed(pageTitle.bind(this))

      watch(pageTitle, setPageTitle)

      setPageTitle(pageTitle.value)
    },
  })
}
