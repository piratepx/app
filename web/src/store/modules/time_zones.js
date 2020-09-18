import API from '/@/services/api'

const initialState = () => ({
  status: null,
  records: null,
  error: null,
})

export const STATUS_FETCHING = 'FETCHING'
export const STATUS_SUCCESS = 'SUCCESS'
export const STATUS_ERROR = 'ERROR'

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    set(state, { records }) {
      state.records = records
      state.status = STATUS_SUCCESS
      state.error = null
    },
    setError(state, { error }) {
      state.error = error
      state.status = STATUS_ERROR
    },
    setStatus(state, { status }) {
      state.status = status
    },
    reset(state) {
      Object.assign(state, initialState())
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.status === STATUS_FETCHING) {
        return false
      }

      commit('setStatus', { status: STATUS_FETCHING })

      const { time_zones: records, error } = await new API().request(
        '/time_zones'
      )

      if (error) {
        commit('setError', { error })
      } else {
        commit('set', { records })
      }

      return records
    },
  },
}
