<script setup>
import { ref, watch, defineComponent } from 'vue'
import colors from 'vuetify/lib/util/colors'
import realPriceView from './RealPriceView.vue'
import chartDataView from './ChartDataView.vue'
import houseApi from '../api/realEstate.js'

const props = defineProps(['data'])

const show = ref(true)
const data = ref(null)
console.log(props.data)

watch(props.data, (receivedData) => {
  data.value = receivedData.value
  console.log('realprice watch')
})

const complexNo = 1
const houseCall = () => {
  console.log('realprice call')
  houseApi.getRealPrices(
    complexNo,
    ({ data }) => {
      console.log('실거래가 가져와라잇')
      console.log('data' + data)
    },
    () => {
      console.log('error')
    }
  )
}

houseCall()
</script>

<template>
  <v-container>
    <chartDataView :data="props.data"></chartDataView>

    <button @click="show = !show">Toggle Slide + Fade</button>
    <Transition name="slide-fade">
      <div v-if="show">
        <h2>실거래가 정보</h2>
        <v-table>
          <thead>
            <tr>
              <td>계약월</td>
              <td>전세가</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <!-- tradeYear. tradeMonth -->
              <td>{{ props.data.tradeYear }}.{{ props.data.tradeMonth }}</td>
              <!-- formattedPrice(tradeDate일, floor층) -->
              <td>
                {{ props.data.formattedPrice }}({{ props.data.tradeDate }}일,
                {{ props.data.floor }}층)
              </td>
            </tr>
            <tr>
              <td>2023.05</td>
              <td>1억 9000(26일, 5층)</td>
            </tr>
            <tr>
              <td>2023.01</td>
              <td>1억 3500(26일, 5층)</td>
            </tr>
            <tr>
              <td>2022.12</td>
              <td>1억 1000(26일, 5층)</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </Transition>
  </v-container>
</template>
<style scoped>
thead {
  border: 1px solid;
  border-color: v-bind(colors.grey.lighten2);
  background-color: v-bind(colors.blue.lighten4);
  color: v-bind(colors.grey.darken2);
}

tr {
  border: 1px solid;
  border-color: v-bind(colors.grey.lighten2);
  background-color: v-bind(colors.blue.lighten4);
  color: v-bind(colors.grey.darken2);
}
td {
  border: 1px solid;
  border-color: v-bind(colors.grey.lighten2);
  background-color: v-bind(colors.blue.lighten5);
  color: v-bind(colors.grey.darken2);
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
