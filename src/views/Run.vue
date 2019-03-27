<template>
  <Director
    :directions="directions" :order="order" :reduce="reduce"
    :runs="runs" :pace="pace" :transition="transition" :countdown="countdown"
    @click="stop"
    @end="stop"/>
</template>
<script>
import { mapState } from 'vuex'
import NoSleep from 'nosleep.js'
import Director from '../components/Director'

export default {
  components: {
    Director
  },
  data() {
    return {
      noSleep: new NoSleep()
    }
  },
  computed: {
    ...mapState([
      'directions',
      'order',
      'reduce',
      'runs',
      'pace',
      'transition',
      'countdown'
    ])
  },
  mounted() {
    this.noSleep.enable()
  },
  beforeDestroy() {
    this.noSleep.disable()
  },
  methods: {
    stop() {
      this.$router.go(-1)
    }
  }
}

</script>
<style>

</style>

