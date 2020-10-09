<template>
  <project-settings
    :record="record"
    :status="status"
    :time-zones="timeZones"
    :time-zones-status="timeZonesStatus"
    @update="update({ record: $event })"
    @save="save"
    @toggle-shared="toggleShared"
  />
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import ProjectSettings from '/@/components/project/ProjectSettings.vue'

export default {
  components: {
    ProjectSettings,
  },
  computed: {
    ...mapState('projects/current', ['status', 'record']),
    ...mapState('timeZones', {
      timeZones: 'records',
      timeZonesStatus: 'status',
    }),
  },
  created() {
    this.fetchTimeZones()
  },
  methods: {
    ...mapMutations('projects/current', ['update']),
    ...mapActions('projects/current', ['save', 'toggleShared']),
    ...mapActions('timeZones', {
      fetchTimeZones: 'fetch',
    }),
  },
}
</script>
