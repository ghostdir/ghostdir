<template>
  <v-container fluid fill-height @click="(e) => $emit('click', e)">
    <Message
      v-if="count > 0"
      :message="count"/>
    <Sign
      v-else
      :direction="direction"
      :bounce-after="adjustedRunTime - splitTime"
      :bounce-for="splitTime"/>
  </v-container>
</template>
<script>
import Message from '../components/Message'
import Sign from '../components/Sign'

let task, idx = -1

export default {
  components: {
    Message,
    Sign    
  },
  props: {
    directions: {
      type: Array,
      default() {
        return ['fl', 'fr', 'r', 'br', 'bl', 'l']
      }
    },
    order: {
      type: String,
      default: 'random'
    },
    pace: {
      type: Number,
      default: 5
    },
    transition: {
      type: Number,
      default: 0.5
    },
    countdown: {
      type: Number,
      default: 5
    },
    runs: {
      type: Number,
      default: 12
    },
    reduce: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    runTime() {
      return this.pace * 1000
    },
    adjustedRunTime() {
      if (this.reduce && (this.direction == 'r' || this.direction === 'l')) {
        return this.runTime * 0.7
      } else {
        return this.runTime
      }
    },
    splitTime() {
      return this.transition * 1000
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

        if (this.order === 'random') {
          idx = Math.floor(Math.random() * this.directions.length)
        } else {
          idx = (idx + (this.order === 'anticlockwise' ?
                        -1 : 1)) % this.directions.length
          idx = idx < 0 ? idx + this.directions.length : idx
        }

        setImmediate(() => {
          this.direction = this.directions[idx]
          task = setTimeout(() => {
            this.next()
          }, this.adjustedRunTime)
        })
      } else {
        this.$emit('end')
      }
    }
  }
}
</script>
<style scoped>

</style>
