<template>
  <v-container fluid fill-height @click="toggle">
    <Message
      v-if="countdown > 0"
      :message="countdown"/>
    <Sign
      v-else
      :direction="direction"
      :bounce-after="runTime - splitTime"
      :bounce-for="splitTime"/>
  </v-container>
</template>
<script>
import Message from '../components/Message'
import Sign from '../components/Sign'

// eslint-disable-next-line
let task, idx = 0
const directions = ['fl', 'fr', 'r', 'br', 'bl', 'l']

export default {
  components: {
    Message,
    Sign    
  },
  props: {
    splitTime: {
      type: Number,
      default: 800
    },
    runTime: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      countdown: 10,
      direction: null
    }
  },
  mounted() {
    this.next()
  },
  methods: {
    next() {
      if (this.countdown > 0) {
        task = setTimeout(() => {
          this.countdown--
          this.next()
        }, 1000)
      } else {
        this.direction = null
        setImmediate(() => this.direction = directions[idx])
        //idx = (idx + 1) % directions.length
        idx = Math.floor(Math.random() * directions.length)
        task = setTimeout(this.next, this.runTime)
      }
    },
    toggle() {
      // if (task) {
      //   clearTimeout(task)
      //   task = undefined
      // } else {
      //   task = setTimeout(this.next, 0)
      // }
    }
  }
}
</script>
<style>

</style>
