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
import _ from 'lodash'

let task

export default {
  components: {
    Message,
    Sign    
  },
  props: {
    directions: {
      type: Object,
      default() {
        return {
          fl: false,
          fr: false,
          r: true,
          br: false,
          bl: false,
          l: true
        }
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
    },
    dirArray() {
      const val = []
      const ord = ['fl', 'fr', 'r', 'br', 'bl', 'l']
      _.forEach(ord, (dir) => {
        if (this.directions[dir]) {
          val.push(dir)
        }
      })
      return val
    }
  },
  data() {
    return {
      count: this.countdown,
      run: 0,
      direction: null,
      index: this.order === 'anticlockwise' ? 2 : -1
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
          this.index = _.random(0, this.dirArray.length - 1)
        } else {
          this.index = (this.index + (this.order === 'anticlockwise' ?
                        -1 : 1)) % this.dirArray.length
          this.index = (this.index < 0 ?
                        this.index + this.dirArray.length : this.index)
        }

        setImmediate(() => {
          this.direction = this.dirArray[this.index]
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
