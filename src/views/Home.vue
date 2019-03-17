<template>
  <v-container v-if="!started">

    <v-card
      class="mx-auto" max-width="600" flat>
      <option-slider
        v-model="pace" :min="2" :max="10" :step="0.5"
        title="Pace" :unit="`second${pace == 1 ? '' : 's'}`"
        :secondaryValue="Math.round(60 / pace)"
        secondaryUnit="runs/minute"/>

      <option-slider
        v-model="runs" :min="1" :max="50" :step="1"
        title="Runs" :unit="`run${runs == 1 ? '' : 's'}`"
        :secondaryValue="Math.round(pace * runs)"
        secondaryUnit="seconds"/>

      <v-expansion-panel popout>
        <v-expansion-panel-content>
          <template v-slot:header>
            More Options
          </template>
          <option-slider
            v-model="countdown" :min="0" :max="120" :step="1"
            title="Countdown" :unit="`second${countdown == 1 ? '' : 's'}`"/>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-card-text>
        <v-btn
          block large color="blue" @click="start">
          Start
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
  <Director
    v-else
    @click="stop"
    @end="stop"
    :runs="runs" :run-time="runTime" :countdown="countdown"/>
</template>
<script>
import NoSleep from 'nosleep.js'
import Director from '../components/Director'
import OptionSlider from '../components/OptionSlider'

const noSleep = new NoSleep()

export default {
  components: {
    Director,
    OptionSlider
  },
  data() {
    return {
      started: false,
      pace: 5,
      runs: 12,
      countdown: 5
    }
  },
  computed: {
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
