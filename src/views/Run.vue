<template>
  <Director
    :directions="directions" :order="order" :reduce="reduce"
    :runs="runs" :run-time="runTime" :countdown="countdown"
    @click="stop"
    @end="stop"/>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Director from '../components/Director'

export default {
  components: {
    Director
  },
  computed: {
    ...mapState([
      'directions',
      'order',
      'reduce',
      'runs',
      'countdown'
    ]),
    ...mapGetters([
      'runTime'
    ])
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

