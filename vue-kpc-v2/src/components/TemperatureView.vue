<script setup>
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
  value.value = 0
  timerId = setInterval(() => {
    value.value += 1
  }, 10)
}

watch(value, () => {
  if (value.value >= recievedData.value) {
    clearInterval(timerId)
  }
})
</script>

<template>
  <v-card elevated hover class="ma-2 pa-6 rounded-xl" width="400">
    <div class="temperature-container">
      <v-btn size="x-large" @click="progressAnimate"
        ><h4 style="color: rgb(230, 67, 67)">온도 확인하기</h4></v-btn
      >
      <div class="thermometer">
        <div class="thermometer-body">
          <progress max="100" :value="value" id="th-animated"></progress>
        </div>
      </div>
    </div>
  </v-card>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=PT+Sans);

.temperature-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.thermometer {
  position: relative;
  height: 72px;
  margin: 15px;
}

.thermometer-body {
  width: 260px;
  height: 32px;
  position: absolute;
  left: -96px;
  top: 16px;
  background-color: #bdc3c7;
  border-radius: 0 22px 22px 0;
  border: 5px solid #c0392b;
  border-left: none;
}
.primary .thermometer-body {
  border-color: #c0392b;
}
.thermometer-body:before {
  content: ' ';
  width: 64px;
  height: 64px;
  position: absolute;
  top: -21px;
  left: -55px;
  z-index: -1;
  background: #e74c3c;
  border-radius: 50%;
  border: 5px solid #c0392b;
  box-shadow: inset 0 0 0 4px #bdc3c7;
}
.primary .thermometer-body:before {
  background: #e74c3c;
  border-color: #c0392b;
}

progress[value] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  width: 250px;
  height: 16px;
  position: relative;
  top: 1px;
  left: -0.5px;
  background-color: #fff;
  color: #fff;
  border-radius: 0 16px 16px 0;
}
progress[value]::-webkit-progress-bar {
  background-color: #fff;
  border-radius: 0 16px 16px 0;
}
progress[value]::-webkit-progress-value {
  background-color: #e74c3c;
  border-radius: 0 32px 8px 0;
}
.primary progress[value]::-webkit-progress-value {
  background-color: #e74c3c;
}
progress[value]::-moz-progress-bar {
  background-color: #e74c3c;
  border-radius: 0 32px 8px 0;
}
.primary progress[value]::-moz-progress-bar {
  background-color: #9b59b6;
}

progress[value='100']::-webkit-progress-value {
  border-radius: 0 16px 16px 0;
}
progress[value='100']::-moz-progress-bar {
  border-radius: 0 16px 16px 0;
}

progress[value='0']::-webkit-progress-bar:before {
  content: '0%';
  position: absolute;
  top: -2px;
  left: -40px;
}

progress[value='25']::-webkit-progress-bar:before {
  content: '25%';
  position: absolute;
  top: -2px;
  left: -40px;
}

progress[value='50']::-webkit-progress-bar:before {
  content: '50%';
  position: absolute;
  top: -2px;
  left: -40px;
}

progress[value='75']::-webkit-progress-bar:before {
  content: '75%';
  position: absolute;
  top: -2px;
  left: -40px;
}

progress[value='100']::-webkit-progress-bar:before {
  content: '100%';
  position: absolute;
  top: -2px;
  left: -40px;
}
</style>
