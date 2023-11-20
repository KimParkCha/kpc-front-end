<script setup>
import { ref, watch } from 'vue'
import colors from 'vuetify/lib/util/colors'
import realPriceView from './RealPriceView.vue'
import tabTest from './TabTest.vue'

const props = defineProps(['data'])

const show = ref(true)
const data = ref(null)
console.log(props.data)
watch(props.data, (receivedData) => {
  data.value = receivedData.value
})
</script>
<template>
  <v-container>
    <!-- <tabTest></tabTest> -->
    <button @click="show = !show">Toggle Slide + Fade</button>
    <Transition name="slide-fade">
      <div v-if="show">
        <h2>단지 정보</h2>
        <v-tabs>
          <v-tab><h2>단지정보</h2></v-tab>
          <v-tab><h2>실거래가 정보</h2></v-tab>
          <v-tab><h2>뉴스</h2></v-tab>
        </v-tabs>
        <v-table>
          <thead></thead>

          <tbody>
            <tr>
              <th>단지명</th>
              <td>{{ props.data.complexName }}</td>
              <th>단지 주소</th>
              <td>{{ props.data.address }}</td>
            </tr>
            <tr>
              <th>세대수</th>
              <td>{{ props.data.totalHouseholdCount }}</td>
              <th>동수</th>
              <td>{{ props.data.totalDongCount }}</td>
            </tr>
            <tr>
              <th>사용승인일</th>
              <td>{{ props.data.useApproveYmd }}</td>
              <th>저층/최고층</th>
              <td>{{ props.data.lowFloor + '/' + props.data.highFloor + '층' }}</td>
            </tr>
            <tr>
              <th>용적률</th>
              <td>{{ props.data.batlRatio + '%' }}</td>
              <th>건폐율</th>
              <td>{{ props.data.btlRatio + '%' }}</td>
            </tr>
            <tr>
              <th>총 주차대수</th>
              <td>{{ props.data.parkingPossibleCount }}</td>
              <th>세대당 주차대수</th>
              <td>{{ props.data.parkingCountByHousehold }}</td>
            </tr>
            <tr>
              <th colspan="1">건설사</th>
              <td colspan="3">{{ props.data.constructionCompanyName }}</td>
            </tr>
            <tr>
              <th colspan="1">관리사무소</th>
              <td colspan="3">{{ props.data.managementOfficeTelNo }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </Transition>
  </v-container>

  <!-- <realPriceView></realPriceView> -->
</template>

<style scoped>
th {
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
