<script setup>
import '@/assets/test.css'
import { ref } from 'vue'
const value = ref(0)
let timerId = null
const progressAnimate = () => {
  const btn = document.getElementById('btn')
  setInterval(() => {
    const progress = document.getElementById('th-animated')
    value.value += 1
  }, 100)
  btn.disabled = true
}
</script>

<template>
  <div class="wrapper">
    <div class="thermometer">
      <div class="thermometer-body">
        <progress max="100" value="25"></progress>
      </div>
    </div>
    <div class="thermometer">
      <div class="thermometer-body">
        <progress max="100" value="75"></progress>
      </div>
    </div>
    <div class="thermometer">
      <div class="thermometer-body">
        <progress max="100" value="100"></progress>
      </div>
    </div>
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
