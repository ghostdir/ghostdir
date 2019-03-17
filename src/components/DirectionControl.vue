<template>
  <v-btn
    v-model="value"
    @click="$emit('input', !value)"
    fab :depressed="!!value">
    <v-avatar>
      <img :src="image"/>
    </v-avatar>
  </v-btn>
</template>
<script>
export default {
  props: {
    direction: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
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
  }
}
</script>
<style>

</style>
