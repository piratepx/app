<template>
  <project-dashboard
    :current-project="currentProject"
    :dates="dates"
    :max-count="maxCount"
    :records="recordsGroupedAndSorted"
    :scroll-id="scrollId"
    :scroll-left="scrollLeft"
    :status="status"
    @scroll="scroll"
  />
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import ProjectDashboard from '/@/components/project/dashboard/ProjectDashboard.vue'

export default {
  components: {
    ProjectDashboard,
  },
  data() {
    return {
      scrollId: null,
      scrollLeft: 0,
    }
  },
  computed: {
    ...mapState('projects/current', {
      currentProject: 'record',
    }),
    ...mapState('counts', ['status']),
    ...mapGetters('counts', ['recordsGroupedAndSorted', 'maxCount']),
    dates() {
      const start = new Date()

      return [...Array(30).keys()].map((i) => {
        const date = new Date(start)

        date.setDate(start.getDate() - i)

        return date
      })
    },
  },
  created() {
    this.fetch()
  },
  methods: {
    ...mapActions('counts', ['fetch']),
    scroll({ scrollId, scrollLeft }) {
      this.scrollId = scrollId
      this.scrollLeft = scrollLeft
    },
  },
  pageTitle() {
    return this.currentProject.name
  },
}
</script>
