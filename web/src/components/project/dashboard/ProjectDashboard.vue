<template>
  <template v-if="!records">
    <base-center v-if="isFetching">Loading...</base-center>
    <base-center v-if="isError">
      <base-alert error>Whoops! Something went wrong.</base-alert>
    </base-center>
  </template>
  <template v-if="records">
    <template v-if="!records.size">
      <project-dashboard-welcome :current-project="currentProject" />
    </template>
    <template v-if="records.size">
      <h1 class="text-xl font-semibold text-gray-600 text-center truncate mb-1">
        {{ currentProject.name }}
      </h1>
      <project-dashboard-header
        :current-project="currentProject"
        :dates="dates"
        :scroll-id="scrollId"
        :scroll-left="scrollLeft"
        @scroll="$emit('scroll', $event)"
      />
      <div class="space-y-3">
        <project-dashboard-record
          v-for="[identifier, identifierRecords] of records"
          :key="identifier"
          :current-project="currentProject"
          :dates="dates"
          :identifier="identifier"
          :max-count="maxCount"
          :records="identifierRecords"
          :scroll-id="scrollId"
          :scroll-left="scrollLeft"
          @scroll="$emit('scroll', $event)"
        />
      </div>
    </template>
  </template>
</template>

<script>
import BaseAlert from '/@/components/base/BaseAlert.vue'
import BaseCenter from '/@/components/base/BaseCenter.vue'
import ProjectDashboardHeader from '/@/components/project/dashboard/ProjectDashboardHeader.vue'
import ProjectDashboardRecord from '/@/components/project/dashboard/ProjectDashboardRecord.vue'
import ProjectDashboardWelcome from '/@/components/project/dashboard/ProjectDashboardWelcome.vue'
import { STATUS_ERROR, STATUS_FETCHING } from '/@/store/modules/counts'

export default {
  components: {
    BaseAlert,
    BaseCenter,
    ProjectDashboardHeader,
    ProjectDashboardRecord,
    ProjectDashboardWelcome,
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
    maxCount: {
      type: Number,
      default: null,
    },
    records: {
      type: Map,
      default: null,
    },
    scrollId: {
      type: Number,
      default: null,
    },
    scrollLeft: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: null,
    },
  },
  emits: ['scroll'],
  computed: {
    isError() {
      return this.status === STATUS_ERROR
    },
    isFetching() {
      return this.status === STATUS_FETCHING
    },
  },
}
</script>
