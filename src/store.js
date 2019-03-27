import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    runs: 12,
    pace: 5,
    transition: .5,
    countdown: 5,
    directions: ['fl', 'fr', 'r', 'br', 'bl', 'l'],
    order: 'random',
    reduce: true
  },
  mutations: {
    setRuns(state, val) {
      state.runs = val
    },
    setPace(state, val) {
      state.pace = val
    },
    setTransition(state, val) {
      state.transition = val
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

  }
})
