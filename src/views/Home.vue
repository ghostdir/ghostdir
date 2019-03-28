<template>
  <v-container>
    <v-card
      class="mx-auto" max-width="600" flat>
      <slider
        v-model="pace" :min="2" :max="10" :step="0.5"
        title="Pace" :unit="`second${pace == 1 ? '' : 's'}`"
        :secondaryValue="Math.round(60 / pace)"
        secondaryUnit="runs/minute"/>

      <slider
        v-model="runs" :min="1" :max="50" :step="1"
        title="Runs" :unit="`run${runs == 1 ? '' : 's'}`"
        :secondaryValue="Math.round(pace * runs)"
        secondaryUnit="seconds"/>

      <slider
        v-model="countdown" :min="0" :max="120" :step="1"
        title="Countdown" :unit="`second${countdown == 1 ? '' : 's'}`"/>

      <v-expansion-panel popout>
        <v-expansion-panel-content>
          <template v-slot:header>
            More Options
          </template>

          <slider
            v-model="transition" :min="0" :max="1" :step="0.1"
            title="Transition Time"
            :unit="`second${transition == 1 ? '' : 's'}`"/>

          <directions-control
            v-model="directions"
            :order.sync="order"
            :reduce.sync="reduce"
            title="Directions"/>
          
        </v-expansion-panel-content>
      </v-expansion-panel>

        <v-btn
          block large dark color="blue" @click="reset">
          Reset to defaults
        </v-btn>
        
    </v-card>

    <v-btn
      fab fixed dark bottom right large color="blue"
      :disabled="!ready"
      @click="start">
      <v-icon>play_arrow</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import Slider from '../components/Slider'
import DirectionsControl from '../components/DirectionsControl'
import _ from 'lodash'

export default {
  components: {
    Slider,
    DirectionsControl
  },
  data() {
    return {

    }
  },
  computed: {
    runs: {
      get() {
        return this.$store.state.runs
      },
      set(val) {
        this.$store.commit('setRuns', val)
      }
    },
    pace: {
      get() {
        return this.$store.state.pace
      },
      set(val) {
        this.$store.commit('setPace', val)
      }
    },
    transition: {
      get() {
        return this.$store.state.transition
      },
      set(val) {
        this.$store.commit('setTransition', val)
      }
    },
    countdown: {
      get() {
        return this.$store.state.countdown
      },
      set(val) {
        this.$store.commit('setCountdown', val)
      }
    },
    directions: {
      get() {
        return this.$store.state.directions
      },
      set(val) {
        this.$store.commit('setDirections', val)
      }
    },
    order: {
      get() {
        return this.$store.state.order
      },
      set(val) {
        this.$store.commit('setOrder', val)
      }
    },
    reduce: {
      get() {
        return this.$store.state.reduce
      },
      set(val) {
        this.$store.commit('setReduce', val)
      }
    },
    ready() {
      return _.filter(this.directions).length > 0
    }
  },
  methods: {
    reset() {
      this.$store.commit('reset')
    },
    start() {
      this.$router.push('run')
    }
  }
}
</script>
<style>

</style>
