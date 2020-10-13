<template>
  <signup-index
    :record="record"
    :status="status"
    :time-zones="timeZones"
    :time-zones-status="timeZonesStatus"
    @update="update({ record: $event })"
    @save="save"
  />
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import SignupIndex from '/@/components/signup/SignupIndex.vue'

export default {
  components: {
    SignupIndex,
  },
  computed: {
    ...mapState('signup', ['status', 'record']),
    ...mapState('timeZones', {
      timeZones: 'records',
      timeZonesStatus: 'status',
    }),
    localTimeZone() {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone
    },
  },
  created() {
    if (this.localTimeZone) {
      this.update({ record: { time_zone: this.localTimeZone } })
    }

    if (this.$route.query.email) {
      this.update({ record: { user: { email: this.$route.query.email } } })
    }

    this.fetchTimeZones()
  },
  methods: {
    ...mapMutations('signup', ['update']),
    ...mapActions('signup', {
      saveAction: 'save',
    }),
    ...mapActions('timeZones', {
      fetchTimeZones: 'fetch',
    }),
    async save() {
      const project = await this.saveAction()

      if (!project) {
        return
      }

      this.$router.push(`/${project.secret}`)
    },
  },
  pageTitle: 'Signup',
}
</script>
