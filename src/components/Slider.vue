<template>
  <v-card flat>
    <v-subheader class="subheading font-weight-medium text-uppercase">
      {{title}}
    </v-subheader>
    <v-card-text>
      <v-layout justify-space-between mb-3>
        <v-flex text-xs-left>
          <span class="subheading font-weight-light">
            {{value}}
          </span>
          <span class="caption font-weight-light mr-1">
            {{unit}}
          </span>
        </v-flex>
        <v-flex text-xs-right>
          <span class="subheading font-weight-light">
            {{secondaryValue}}
          </span>
          <span class="caption font-weight-light mr-1">
            {{secondaryUnit}}
          </span>
        </v-flex>
      </v-layout>
      <v-slider
        :value="value" :min="min" :max="max" :step="step" always-dirty
        @input="$emit('input', $event)">
        <template v-slot:prepend>
          <v-icon @click="$emit('input', value - 1)">
            remove
          </v-icon>
        </template>
        <template v-slot:append>
          <v-icon  @click="$emit('input', value + 1)">
            add
          </v-icon>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      required: true
    },
    unit: {
      type: String
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    secondaryValue: {
      type: Number
    },
    secondaryUnit: {
      type: String
    }
  },
  data() {
    return {

    }
  }

}
</script>
<style>

</style>
