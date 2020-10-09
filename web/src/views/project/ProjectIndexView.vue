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
    isShared: {
      type: Boolean,
      required: true,
    },
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
    API.defaultConfig = {
      token: this.isShared ? `shared/${this.secret}` : this.secret,
    }

    this.fetch()
  },
  methods: {
    ...mapActions('projects/current', ['fetch']),
  },
}
</script>
