import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import _ from 'lodash'

Vue.use(Vuex)

const storage = new VuexPersistence({
  storage: window.localStorage
})

const defaults = () => {
  return {
    runs: 12,
    pace: 5,
    transition: .5,
    countdown: 5,
    directions: {
      fl: true,
      fr: true,
      r: true,
      br: true,
      bl: true,
      l: true
    },
    order: 'random',
    reduce: true
  }
}

export default new Vuex.Store({
  state: defaults(),
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
    },
    reset(state) {
      _.assign(state, defaults())
    }
  },
  plugins: [
    storage.plugin
  ]
})
