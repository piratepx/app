<template>
  <div>
    <div class="font-semibold mb-1">{{ identifier }}</div>
    <project-dashboard-scrollable
      class="pb-3"
      :scroll-left="scrollLeft"
      @scroll="$emit('scroll', $event)"
    >
      <project-dashboard-record-count
        v-for="date of dates"
        :key="date.getTime()"
        :max-count="maxCount"
        :record="findRecord(date)"
      />
    </project-dashboard-scrollable>
  </div>
</template>

<script>
import ProjectDashboardRecordCount from '/@/components/project/dashboard/ProjectDashboardRecordCount.vue'
import ProjectDashboardScrollable from '/@/components/project/dashboard/ProjectDashboardScrollable.vue'
import toISODateString, { dateTimeFormat } from '/@/lib/to_iso_date_string'

export default {
  components: {
    ProjectDashboardRecordCount,
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
    identifier: {
      type: String,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    records: {
      type: Map,
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
      return dateTimeFormat(this.currentProject.time_zone)
    },
  },
  methods: {
    findRecord(date) {
      return this.records.get(
        toISODateString({ date, format: this.dateTimeFormat })
      )
    },
  },
}
</script>
