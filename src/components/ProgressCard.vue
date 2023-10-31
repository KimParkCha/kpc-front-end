<template>
  <div>
    <v-card width="500" height="200" outlined>
      <v-card-title class="text-white">{{ title }}</v-card-title>
      <v-card-text>
        <v-progress-linear
          v-model="value"
          :buffer-value="bufferValue"
          color="red"
          rounded
          height="30"
        ></v-progress-linear
      ></v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'ProgressCard',
  data() {
    return {
      value: 0,
      bufferValue: 0,
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
        this.bufferValue += 8
      }, 100)
    },
  },
}
</script>
<style>
.v-sheet.v-card {
  padding: 20px;
  border-radius: 25px;
}
.v-progress-linear {
  border-radius: 25px;
}
</style>
