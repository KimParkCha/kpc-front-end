<script setup lang="ts">
import { ref, watch, defineComponent } from 'vue'
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

let labels = ['']
const yearMonth = ref([])
const price = ref([1])
const props = defineProps(['data', 'real'])
let myChart
watch(props, (receivedData) => {
  //////////////////////////////// 실거래가격 ////////////////////////////////
  data.datasets = receivedData.real
  console.log(receivedData.real)
  for (let i = 0; i < receivedData.real.length; i++) {
    console.log(i)
    let numberValue = receivedData.real[i]
    console.log(parseFloat(numberValue))
    price.value.push(numberValue)
    // price.value.push(receivedData.real[i])
  }
  // price.value = receivedData.real
  // data.datasets = price.value
  console.log(price.value)

  ////
  for (let i = 0; i < receivedData.data.length; i++) {
    labels[i] = receivedData.data[i]
  }

  data.labels = labels.sort()
  console.log(labels)
  myChart.update()
  data.labels = []
})

const data = {
  labels: labels,
  datasets: [
    {
      label: '상한가',
      backgroundColor: 'rgba(255,99,132)',
      borderColor: 'rgba(255,99,132)',
      data: price.value
    },
    {
      label: '하한가',
      backgroundColor: 'rgba(20,50,90)',
      borderColor: 'rgba(20,50,90)',
      data: price.value
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
