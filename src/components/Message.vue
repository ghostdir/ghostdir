<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <div>
        <h1 class="display-4 blue--text">{{message}}</h1>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    message: {
      type: [String, Number],
      default: "Message"
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>

</style>
