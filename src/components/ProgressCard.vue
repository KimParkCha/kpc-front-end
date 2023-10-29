<template>
  <v-card rounded-pill width="200px" height="100px">
    <v-card-title>{{ title }}</v-card-title>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
      color="red"
      height="30"
    ></v-progress-linear>
  </v-card>
</template>
<script>
export default {
  name: 'ProgressCard',
  data() {
    return {
      value: 0,
      bufferValue: 100,
      interval: 0,
    }
  },
  props: {
    title: String,
    progressVal: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    value() {
      if (this.value > this.progressVal) clearInterval(this.interval)
    },
  },
  mounted() {
    this.startBuffer()
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    startBuffer() {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.value += 5
      }, 100)
    },
  },
}
</script>
<style></style>
