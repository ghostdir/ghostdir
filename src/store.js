import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pace: 5,
    runs: 12,
    countdown: 5,
    directions: ['fl', 'fr', 'r', 'br', 'bl', 'l'],
    order: 'random',
    reduce: true
  },
  mutations: {
    setPace(state, val) {
      state.pace = val
    },
    setRuns(state, val) {
      state.runs = val
    },
    setCountdown(state, val) {
      state.countdown = val
    },
    setDirections(state, val) {
      state.directions = val
    },
    setOrder(state, val) {
      state.order = val
    },
    setReduce(state, val) {
      state.reduce = val
    }
  },
  getters: {
    runTime(state) {
      return state.pace * 1000
    }
  }
})
