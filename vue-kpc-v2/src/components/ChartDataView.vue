<script setup lang="ts">
import { ref, watch, defineComponent } from 'vue'
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

const labels = ref([])
const yearMonth = ref([])
const price = ref([])
const props = defineProps(['data', 'real'])
let myChart
watch(props, (receivedData) => {
  yearMonth.value = receivedData.data
  // data.datasets = receivedData.real
  console.log(receivedData.real)
  for (let i = 0; i < receivedData.real.length; i++) {
    // data.datasets[i].price = receivedData.real
  }
  console.log(data.datasets)
  // labels.value = yearMonth.value
  for (let i = 0; i < yearMonth.value.length; i++) {
    labels.value.push(yearMonth.value[i])
  }

  labels.value.sort()
  console.log(labels.value)
  data.labels = labels.value

  for (let i = 0; i < labels.value.length; i++) {
    labels.value.splice(0, labels.value.length)
  }
  myChart.update()
  console.log(labels.value)
})

const data = {
  labels: labels.value,
  datasets: [
    {
      label: '상한가',
      backgroundColor: 'rgba(255,99,132)',
      borderColor: 'rgba(255,99,132)',
      price: [4.9, 4.1, 4.0, 4.2]
    },
    {
      label: '하한가',
      backgroundColor: 'rgba(20,50,90)',
      borderColor: 'rgba(20,50,90)',
      price: [0.9, 1.8, 2.4, 2.8, 3.2]
    }
  ]
}

const config = {
  type: 'line',
  data: price,
  options: {}
}

onMounted(() => {
  const canvasTag = document.getElementById('myChart')
  myChart = new Chart(canvasTag, config)
})
</script>

<template>
  <h2>매매 실거래가</h2>
  <div class="chart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<style>
.chart {
  width: 500px;
}
</style>
