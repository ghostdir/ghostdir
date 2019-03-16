<template>
  <div :style="styles.t">
    <v-container fluid fill-height>
      <v-layout
        v-if="direction"
        align-center justify-center
        :class="classes.dir"
        :style="styles.dir">
      </v-layout>
    </v-container>
  </div>
</template>
<script>
let task;

export default {
  props: {
    direction: {
      type: String
    },
    bounceAfter: {
      type: Number
    },
    bounceFor: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      bounce: false
    }
  },
  computed: {
    classes() {
      return {
        dir: {
          bounce: this.bounce
        }
      }
    },
    styles() {
      return {
        dir: {
          'background': `url(${this.image}) center no-repeat`,
          'background-size': 'contain',
          'animation-duration': this.bounce ? `${this.bounceFor / 1000}s` : '0s'
        },
        t: {
          'height': '100%',
          'width': '100%',
          'background': `url(${require('../assets/t.svg')}) center no-repeat`,
          'background-size': 'cover'
        }
      }
    },
    image() {
      switch (this.direction) {
      case 'left':
      case 'l':
        return require('../assets/left.svg')
      case 'right':
      case 'r':
        return require('../assets/right.svg')
      case 'front-left':
      case 'fl':
        return require('../assets/front-left.svg')
      case 'front-right':
      case 'fr':
        return require('../assets/front-right.svg')
      case 'back-left':
      case 'bl':
        return require('../assets/back-left.svg')
      case 'back-right':
      case 'br':
        return require('../assets/back-right.svg')
      default:
        return require('../assets/circle.svg')
      }
    }
  },
  mounted() {
    this.scheduleBounce()
  },
  destroyed() {
    if (task !== undefined) {
      clearTimeout(task)
      task = undefined
    }
  },
  watch: {
    direction() {
      this.scheduleBounce()
    }
  },
  methods: {
    scheduleBounce() {
      if (this.direction && this.bounceAfter) {
      this.bounce = false
        task = setTimeout(() => {
          this.bounce = true
        }, this.bounceAfter)
      }
    }
  }
}
</script>
<style scoped>
.bounce {
    animation-name: bounce-out;
    animation-fill-mode: forwards;
}

@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(0);
    }
}
</style>
