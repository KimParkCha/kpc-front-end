<script setup>
import { ref, watch } from 'vue'
import colors from 'vuetify/lib/util/colors'
import chartDataView from './ChartDataView.vue'
import houseApi from '../api/realEstate.js'

const props = defineProps(['complexNo'])

// const show = ref(false)
const realprice = ref()
console.log('realpriceView 나와라좀')

watch(props, (complexNo) => {
  console.log('complex' + complexNo)
  houseCall(complexNo.complexNo)
  // show.value = true
})

const houseCall = (complexNo) => {
  console.log('realprice call')
  houseApi.getRealPrices(
    complexNo,
    (data) => {
      console.log('실거래가 가져와라잇')
      console.log(data.data)
      realprice.value = data.data
    },
    () => {
      console.log('error')
    }
  )
}
</script>

<template>
  <v-container>
    <div style="display: flex">
      <chartDataView :data="realprice"></chartDataView>

      <!-- <button @click="show = !show">Toggle Slide + Fade</button> -->
      <!-- <Transition name="slide-fade"> -->
      <div>
        <h2>실거래가 정보</h2>
        <v-table>
          <thead>
            <tr>
              <td>계약월</td>
              <td>전세가</td>
            </tr>
          </thead>

          <tbody v-for="price in realprice" :key="price">
            <tr>
              <!-- tradeYear. tradeMonth -->
              <td>{{ price.tradeYear }}.{{ price.tradeMonth }}</td>
              <!-- formattedPrice(tradeDate일, floor층) -->
              <td>
                {{ price.formattedPrice }}({{ price.formattedTradeYearMonth }}일,
                {{ price.floor }}층)
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <!-- </Transition> -->
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
