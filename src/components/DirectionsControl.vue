<template>
  <v-card flat>
    <v-subheader class="subheading font-weight-medium text-uppercase">
      {{title}}
    </v-subheader>
    <v-card-text>
      <v-layout row justify-center wrap>
        <v-flex xs4 sm2>
          <direction-control
            v-model="value.fl" direction="fl"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="value.fr" direction="fr"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="value.bl" direction="bl"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="value.br" direction="br"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="value.l" direction="l"/>
        </v-flex>
        <v-flex xs4 sm2>
          <direction-control
            v-model="value.r" direction="r"/>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-text>
      <v-radio-group
        :value="order"
        @change="(e) => $emit('update:order', e)">
        <v-radio value="random" label="Random order"/>
        <v-radio value="clockwise" label="Clockwise order"/>
        <v-radio value="anticlockwise" label="Anticlockwise order"/>
      </v-radio-group>
      <v-switch
        :input-value="reduce"
        @change="(e) => $emit('update:reduce', e)"
        label="Reduce time of lateral moves by 30%"/>
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
      type: Object,
      default() {
        return {
          fl: true,
          fr: true,
          r: false,
          br: true,
          bl: true,
          l: false
        }
      }
    },
    title: {
      type: String,
      required: true
    },
    order: {
      type: String,
      default: 'anticlockwise'
    },
    reduce: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
<style>

</style>
