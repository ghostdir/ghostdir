<template>
  <v-container fluid fill-height @click="(e) => $emit('click', e)">
    <Message
      v-if="count > 0"
      :message="count"/>
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
    },
    countdown: {
      type: Number,
      default: 5
    },
    runs: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      count: this.countdown,
      run: 0,
      direction: null
    }
  },
  mounted() {
    this.next()
  },
  destroyed() {
    if (task !== undefined) {
      clearTimeout(task)
      task = undefined
    }
  },
  methods: {
    next() {
      if (this.count > 0) {
        task = setTimeout(() => {
          this.count--
          this.next()
        }, 1000)
      } else if (this.run < this.runs){
        this.run++
        
        // Resetting and delaying proper set to trigger watchers also
        // when the value does not change (i.e. when giving same
        // direction twice)
        this.direction = null
        //idx = (idx + 1) % directions.length
        idx = Math.floor(Math.random() * directions.length)
        setImmediate(() => this.direction = directions[idx])

        task = setTimeout(() => {
          this.next()
        }, this.runTime)
      } else {
        this.$emit('end')
      }
    }
  }
}
</script>
<style scoped>

</style>
