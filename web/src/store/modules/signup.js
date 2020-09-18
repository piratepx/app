import API from '/@/services/api'

const initialState = () => ({
  status: null,
  record: {
    name: null,
    time_zone: null,
    user: {
      email: null,
    },
  },
  error: null,
})

export const STATUS_SAVING = 'SAVING'
export const STATUS_SUCCESS = 'SUCCESS'
export const STATUS_ERROR = 'ERROR'

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    set(state, { record }) {
      state.record = record
      state.status = STATUS_SUCCESS
      state.error = null
    },
    update(state, { record }) {
      state.record = {
        ...state.record,
        ...record,
        user: {
          ...state.record.user,
          ...record.user,
        },
      }
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
    async save({ commit, state }) {
      if (state.status === STATUS_SAVING) {
        return false
      }

      commit('setStatus', { status: STATUS_SAVING })

      const { project: record, error } = await new API().request('/projects', {
        method: 'POST',
        body: { project: state.record },
      })

      if (error) {
        commit('setError', { error })
      } else {
        commit('set', { record })
      }

      return record
    },
  },
}
