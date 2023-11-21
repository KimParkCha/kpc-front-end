<script setup lang="ts">
import { ref, watch, defineComponent } from 'vue'
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

const labels = ['2022.12', '2023.01', '2023.05', '2023.06']
const props = defineProps(['data'])
console.log(props.data)

watch(props, (receivedData) => {
  // labels = props.data.tradeYear
})

const data = {
  labels: labels,
  datasets: [
    {
      label: '상한가',
      backgroundColor: 'rgba(255,99,132)',
      borderColor: 'rgba(255,99,132)',
      data: [1.1, 1.6, 1.8, 2.3, 1.7]
    },
    {
      label: '하한가',
      backgroundColor: 'rgba(20,50,90)',
      borderColor: 'rgba(255,99,132)',
      data: [0.9, 1.8, 2.4, 2.8, 3.2]
    }
  ]
}

const config = {
  type: 'line',
  data: data,
  options: {}
}

onMounted(() => {
  const canvasTag = document.getElementById('myChart')
  const myChart = new Chart(canvasTag, config)
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
