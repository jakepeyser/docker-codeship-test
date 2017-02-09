export default {
  state: {
    testing: true
  },

  actions: {
    TOGGLE_TESTING: ({ commit }) => {
      commit('TOGGLE_TESTING');
    }
  },

  mutations: {
    TOGGLE_TESTING: (state) => state.testing = !state.testing
  },

  getters: {
    isTesting: (state) => {
      return state.testing;
    }
  }
}
