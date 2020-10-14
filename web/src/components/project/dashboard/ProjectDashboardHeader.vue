<template>
  <project-dashboard-scrollable
    class="sticky top-0 bg-gray-100 mb-5 border-b border-gray-900 py-3 text-center text-xs"
    :scroll-left="scrollLeft"
    @scroll="$emit('scroll', $event)"
  >
    <li
      v-for="(date, index) of datesFormatted"
      :key="date"
      class="flex-1"
      :class="{ 'font-semibold': index === 0 }"
    >
      {{ date }}
    </li>
  </project-dashboard-scrollable>
</template>

<script>
import ProjectDashboardScrollable from '/@/components/project/dashboard/ProjectDashboardScrollable.vue'

export default {
  components: {
    ProjectDashboardScrollable,
  },
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
    dates: {
      type: Array,
      required: true,
    },
    scrollLeft: {
      type: Number,
      default: 0,
    },
  },
  emits: ['scroll'],
  computed: {
    dateTimeFormat() {
      return new Intl.DateTimeFormat(undefined, {
        timeZone: this.currentProject.time_zone,
        month: 'numeric',
        day: 'numeric',
      })
    },
    datesFormatted() {
      const dates = [...this.dates].reverse()
      let previousMonth

      return dates
        .map((date) => {
          const parts = this.dateTimeFormat.formatToParts(date)
          const month = parts.find((part) => part.type === 'month').value

          if (month === previousMonth) {
            return parts.find((part) => part.type === 'day').value
          }

          previousMonth = month

          return parts.map((part) => part.value).join('')
        })
        .reverse()
    },
  },
}
</script>
