<script setup>
import '@/assets/test.css'
import { ref, watch, onMounted } from 'vue'
import temperatureApi from '../api/temperature.js'
const value = ref(0)
let timerId = null
const recievedData = ref(0)

const temperatureCall = () => {
  temperatureApi.getTemperature(
    (data) => {
      console.log(data.data)
      recievedData.value = data.data
    },
    () => {
      console.log('error')
    }
  )
}

const progressAnimate = () => {
  temperatureCall()
  value.value = 0;
  timerId = setInterval(() => {
    value.value += 1
  }, 10)
  // btn.disabled = true
}

watch(value, () => {
  if (value.value >= recievedData.value) {
    clearInterval(timerId)
  }
})


</script>

<template>
  <div class="wrapper">
    <div class="animated primary">
      <button name="button" id="btn" @click="progressAnimate(30)">Start progress</button>
      <div class="thermometer">
        <div class="thermometer-body">
          <progress max="100" :value="value" id="th-animated"></progress>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
