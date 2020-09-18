import { createStore } from 'vuex'

import counts from '/@/store/modules/counts'
import projects from '/@/store/modules/projects'
import signup from '/@/store/modules/signup'
import timeZones from '/@/store/modules/time_zones'

export default createStore({
  modules: {
    counts,
    projects,
    signup,
    timeZones,
  },
})
