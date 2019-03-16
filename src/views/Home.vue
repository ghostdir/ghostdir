<template>
  <v-container v-if="!started">
    <v-card
      class="mx-auto" max-width="600" flat>
      <v-subheader class="subheading font-weight-medium text-uppercase">
        Pace
      </v-subheader>
      <v-card-text>
        <v-layout justify-space-between mb-3>
          <v-flex text-xs-left>
            <span class="subheading font-weight-light">
              {{pace}}
            </span>
            <span class="caption font-weight-light mr-1">
              seconds
            </span>
          </v-flex>
          <v-flex text-xs-right>
            <span class="subheading font-weight-light">
              {{Math.round(60/pace)}}
            </span>
            <span class="caption font-weight-light mr-1">runs/minute</span>
          </v-flex>
        </v-layout>
        <v-slider
          v-model="pace" min="2" max="10" step="0.5" always-dirty>
          <template v-slot:prepend>
            <v-icon @click="pace--">
              remove
            </v-icon>
          </template>
          <template v-slot:append>
            <v-icon @click="pace++">
              add
            </v-icon>
          </template>
        </v-slider>
      </v-card-text>

      <v-subheader class="subheading font-weight-medium text-uppercase">
        Runs
      </v-subheader>
      <v-card-text>
        <v-layout justify-space-between mb-3>
          <v-flex text-xs-left>
            <span class="subheading font-weight-light">
              {{runs}}
            </span>
            <span class="caption font-weight-light mr-1">
              run{{runs === 1 ? '' : 's'}}
            </span>
          </v-flex>
          <v-flex text-xs-right>
            <span class="subheading font-weight-light">
              {{Math.round(pace * runs)}}
            </span>
            <span class="caption font-weight-light mr-1">
              seconds
            </span>
          </v-flex>
        </v-layout>
        <v-slider
          v-model="runs" min="1" max="50" step="1" always-dirty>
          <template v-slot:prepend>
            <v-icon @click="runs--">
              remove
            </v-icon>
          </template>
          <template v-slot:append>
            <v-icon @click="runs++">
              add
            </v-icon>
          </template>
        </v-slider>
      </v-card-text>

      <v-subheader class="subheading font-weight-medium text-uppercase">
        Countdown
      </v-subheader>
      <v-card-text>
        <v-layout justify-space-between mb-3>
          <v-flex text-xs-left>
            <span class="subheading font-weight-light">
              {{countdown}}
            </span>
            <span class="caption font-weight-light mr-1">
              seconds
            </span>
          </v-flex>
        </v-layout>
        <v-slider
          v-model="countdown" min="0" max="120" step="1" always-dirty>
          <template v-slot:prepend>
            <v-icon @click="countdown--">
              remove
            </v-icon>
          </template>
          <template v-slot:append>
            <v-icon @click="countdown++">
              add
            </v-icon>
          </template>
        </v-slider>
      </v-card-text>
      
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

const noSleep = new NoSleep()

export default {
  components: {
    Director
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
