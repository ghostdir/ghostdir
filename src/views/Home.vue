<template>
  <v-container v-if="!started">

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

      <v-expansion-panel popout>
        <v-expansion-panel-content>
          <template v-slot:header>
            More Options
          </template>

          <slider
            v-model="countdown" :min="0" :max="120" :step="1"
            title="Countdown" :unit="`second${countdown == 1 ? '' : 's'}`"/>

          <directions-control
            v-model="directions"
            :order.sync="order"
            :reduce.sync="reduce"
            title="Directions"/>
          
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
    <v-btn
      fab fixed dark bottom right large color="blue"
      :disabled="directions.length < 1"
      @click="start">
      <v-icon>play_arrow</v-icon>
    </v-btn>

  </v-container>
  <Director
    v-else
    @click="stop"
    @end="stop"
    :directions="directions" :order="order" :reduce="reduce"
    :runs="runs" :run-time="runTime" :countdown="countdown"/>
</template>
<script>
import NoSleep from 'nosleep.js'
import Director from '../components/Director'
import Slider from '../components/Slider'
import DirectionsControl from '../components/DirectionsControl'

const noSleep = new NoSleep()

export default {
  components: {
    Director,
    Slider,
    DirectionsControl
  },
  data() {
    return {
      started: false
    }
  },
  computed: {
    pace: {
      get() {
        return this.$store.state.pace
      },
      set(val) {
        this.$store.commit('setPace', val)
      }
    },
    runs: {
      get() {
        return this.$store.state.runs
      },
      set(val) {
        this.$store.commit('setRuns', val)
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
    runTime() {
      return this.pace * 1000
    }
  },
  destroyed() {
    this.stop()
  },
  methods: {
    start() {
      this.started = true
      noSleep.enable()
    },
    stop() {
      this.started = false
      noSleep.disable()
    }
  }
}
</script>
<style>

</style>
