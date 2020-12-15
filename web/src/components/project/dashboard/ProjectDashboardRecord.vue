<template>
  <div>
    <h2 class="font-semibold break-words mb-1">{{ identifier }}</h2>
    <project-dashboard-scrollable
      class="pb-3"
      :scroll-id="scrollId"
      :scroll-left="scrollLeft"
      @scroll="$emit('scroll', $event)"
    >
      <project-dashboard-record-count
        v-for="(date, index) of dates"
        :key="date.getTime()"
        :is-today="index === 0"
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
    scrollId: {
      type: Number,
      default: null,
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
