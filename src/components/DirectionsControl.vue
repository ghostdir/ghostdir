<template>
  <v-card flat>
    <v-subheader class="subheading font-weight-medium text-uppercase">
      {{title}}
    </v-subheader>
    <v-card-text>
      <v-layout row justify-center wrap>
        <v-flex xs4 sm2>
          <direction-control
            v-model="dir.fl" direction="fl"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="dir.fr" direction="fr"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="dir.bl" direction="fl"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="dir.br" direction="br"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="dir.l" direction="l"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="dir.r" direction="r"/>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import DirectionControl from './DirectionControl'

export default {
  components: {
    DirectionControl
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dir: {
        l: !!this.value && this.value.indexOf('l') >= 0,
        r: !!this.value && this.value.indexOf('r') >= 0,
        fl: !!this.value && this.value.indexOf('fl') >= 0,
        fr: !!this.value && this.value.indexOf('fr') >= 0,
        bl: !!this.value && this.value.indexOf('bl') >= 0,
        br: !!this.value && this.value.indexOf('br') >= 0
      }
    }
  },
  watch: {
    dir: {
      deep: true,
      handler() {
        const val = []
        for (let d in this.dir) {
          if (this.dir[d]) {
            val.push(d)
          }
        }
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style>

</style>
