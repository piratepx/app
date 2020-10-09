import API from '/@/services/api'

const initialState = () => ({
  status: null,
  record: null,
  error: null,
})

export const STATUS_FETCHING = 'FETCHING'
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
    async fetch({ commit, state }) {
      if (state.status === STATUS_FETCHING) {
        return false
      }

      commit('setStatus', { status: STATUS_FETCHING })

      const { project: record, error } = await new API().request(
        '/projects/current'
      )

      if (error) {
        commit('setError', { error })
      } else {
        commit('set', { record })
      }

      return record
    },
    async save({ commit, state }) {
      if (!state.record || state.status === STATUS_SAVING) {
        return false
      }

      commit('setStatus', { status: STATUS_SAVING })

      const { project: record, error } = await new API().request(
        `/projects/${state.record.id}`,
        {
          method: 'PUT',
          body: { project: state.record },
        }
      )

      if (error) {
        commit('setError', { error })
      } else {
        commit('set', { record })
      }

      return record
    },
    async toggleShared({ commit, state }) {
      if (!state.record || state.status === STATUS_SAVING) {
        return false
      }

      commit('setStatus', { status: STATUS_SAVING })

      const { project: record, error } = await new API().request(
        `/projects/${state.record.id}`,
        {
          method: 'PUT',
          body: {
            project: {
              allow_shared: !state.record.shared_secret,
            },
          },
        }
      )

      if (error) {
        commit('setError', { error })
      } else {
        commit('set', {
          record: {
            ...state.record,
            shared_secret: record.shared_secret,
            updated_at: record.updated_at,
          },
        })
      }

      return record
    },
  },
}
