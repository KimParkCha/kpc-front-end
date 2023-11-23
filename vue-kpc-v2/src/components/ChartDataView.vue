<script setup lang="ts">
import { ref, watch, defineComponent, toRaw } from 'vue'
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

let labels = []
let price = []
let rowPrice = []
const yearMonth = ref([])

const props = defineProps(['data', 'real'])

let myChart
watch(props, (receivedData) => {
  //////////////////////////////// 실거래가격 ////////////////////////////////
  const reals = toRaw(receivedData.real)
  const datas = toRaw(receivedData.data)
  console.log(receivedData.data)
  const numberDatas = reals.map((str) => {
    return Number(str)
  })

  data.datasets[0].data = numberDatas.reverse()

  data.labels = datas
  data.labels.sort()

  console.log(data.labels)
  myChart.update()
})

const data = {
  labels: labels,
  datasets: [
    {
      label: '실거래가',
      backgroundColor: 'rgba(255,99,132)',
      borderColor: 'rgba(255,99,132)',
      data: price
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
  <div class="chart">
    <div class="mtitle"><h2>매매 실거래가</h2></div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<style>
.chart {
  width: 400px;
  margin-right: 50px;
}

.title {
  margin-right: 50px;
}
</style>
