<script setup>
import { ref, watch } from 'vue'
import colors from 'vuetify/lib/util/colors'
import chartDataView from './ChartDataView.vue'
import houseApi from '../api/realEstate.js'

const props = defineProps(['complexNo'])

const show = ref(false)
const realprice = ref()
let yearMonth = ref([])
let ym = ref([])
let realpriceData = ref([])
const detail = ref({})

console.log('realpriceView 나와라좀')

watch(props, (complexNo) => {
  console.log('complex' + complexNo)
  houseCall(complexNo.complexNo)
  getDetail(complexNo.complexNo)
  // show.value = true
})

const getDetail = (complexNo) => {
  houseApi.getDetail(
    complexNo,
    (data) => {
      console.log(data)
      detail.value = data.data
    },
    () => {}
  )
}

const houseCall = (complexNo) => {
  console.log('realprice call')
  houseApi.getRealPrices(
    complexNo,
    (data) => {
      console.log('실거래가 가져와라잇')
      console.log(data.data)

      if (data.data == '') {
        show.value = false
        console.log('실거래가 정보가 없습니다.')
      } else {
        show.value = true
        realprice.value = data.data
        console.log(data.data)
        ym.value = []
        yearMonth.value = []
        for (let i = 0; i < data.data.length; i++) {
          ym.value[i] = data.data[i].tradeYear + '.' + data.data[i].tradeMonth
          realpriceData.value[i] =
            data.data[i].dealPrice.toString().substring(0, 1) +
            '.' +
            data.data[i].dealPrice.toString().substring(1, 2)
        }
        for (let j = 0; j < ym.value.length; j++) {
          console.log(j)
          if (!yearMonth.value.includes(ym.value[j])) {
            yearMonth.value.push(ym.value[j])
          }
        }
        // yearMonth.value = [...new Set(ym.value)]
        console.log(yearMonth.value)
        console.log(ym.value)
        console.log(realpriceData.value)
        yearMonth.value.sort()
      }
    },
    () => {
      console.log('error')
    }
  )
}
</script>

<template>
  <v-container v-if="show">
    <div style="display: grid">
      <chartDataView :data="yearMonth" :real="realpriceData"></chartDataView>

      <!-- <button @click="show = !show">Toggle Slide + Fade</button> -->
      <!-- <Transition name="slide-fade"> -->
      <br />
      <div>
        <h2>{{ detail.complexName }} 전세 실거래가</h2>
        <br />
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
              <td v-if="price.dealPrice.toString().length <= 5">
                {{ price.dealPrice.toString().substring(0, 1) }}.{{
                  price.dealPrice.toString().substring(1, 2)
                }}억({{
                  price.formattedTradeYearMonth.substring(price.formattedTradeYearMonth.length - 2)
                }}일, {{ price.floor }}층)
              </td>

              <td v-else>
                {{ price.dealPrice.toString().substring(0, 2) }}
                억
                {{
                  price.dealPrice.toString().substring(2, price.dealPrice.toString().length)
                }}천({{
                  price.formattedTradeYearMonth.substring(price.formattedTradeYearMonth.length - 2)
                }}일, {{ price.floor }}층)
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <!-- </Transition> -->
  </v-container>
  <v-container v-if="!show"> <h2>매물정보가 없습니다.</h2> </v-container>
</template>
<style scoped>
.v-table {
  width: 400px;
}

thead {
  border: 1px solid;
  border-color: v-bind(colors.grey.lighten2);
  background-color: v-bind(colors.blue.lighten4);
  color: v-bind(colors.grey.darken2);
}

th {
  border: 1px solid;
  border-color: v-bind(colors.grey.lighten2);
  background-color: v-bind(colors.shades.white);
  color: v-bind(colors.grey.darken2);
}
td {
  border: 1px solid;
  border-color: v-bind(colors.grey.lighten2);
  background-color: v-bind(colors.shades.white);
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
