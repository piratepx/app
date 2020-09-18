<template>
  <project-index :current-project="currentProject" :status="status" />
</template>

<script>
import { mapActions, mapState } from 'vuex'

import API from '/@/services/api'
import ProjectIndex from '/@/components/project/ProjectIndex.vue'

export default {
  components: {
    ProjectIndex,
  },
  props: {
    secret: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('projects/current', ['status']),
    ...mapState('projects/current', {
      currentProject: 'record',
    }),
  },
  created() {
    API.defaultConfig = { token: this.secret }

    this.fetch()
  },
  methods: {
    ...mapActions('projects/current', ['fetch']),
  },
}
</script>
