<script setup>
import { ref, watch, onMounted, watchEffect } from 'vue'
import colors from 'vuetify/lib/util/colors'
import houseApi from '@/api/realEstate'

const props = defineProps(['complexNo'])
const show = ref(false)
const detail = ref(null)
watch(props, (received) => {
  console.log(received)
  if (received.complexNo !== null) {
    getDetail(received.complexNo)
  } else {
    console.log('null receive')
  }
})

const getDetail = (complexNo) => {
  houseApi.getDetail(
    complexNo,
    (data) => {
      console.log(data)
      detail.value = data.data
      show.value = true
    },
    () => {}
  )
}
</script>
<template>
  <v-container>
    <div v-if="show">
      <v-table>
        <thead></thead>
        <tbody>
          <tr>
            <th>단지명</th>
            <td>{{ detail.complexName }}</td>
            <th>단지 주소</th>
            <td>{{ detail.address }}</td>
          </tr>
          <tr>
            <th>세대수</th>
            <td>{{ detail.totalHouseholdCount }}</td>
            <th>동수</th>
            <td>{{ detail.totalDongCount }}</td>
          </tr>
          <tr>
            <th>사용승인일</th>
            <td>{{ detail.useApproveYmd }}</td>
            <th>저층/최고층</th>
            <td>{{ detail.lowFloor + '/' + detail.highFloor + '층' }}</td>
          </tr>
          <tr>
            <th>용적률</th>
            <td>{{ detail.batlRatio + '%' }}</td>
            <th>건폐율</th>
            <td>{{ detail.btlRatio + '%' }}</td>
          </tr>
          <tr>
            <th>총 주차대수</th>
            <td>{{ detail.parkingPossibleCount }}</td>
            <th>세대당 주차대수</th>
            <td>{{ detail.parkingCountByHousehold }}</td>
          </tr>
          <tr>
            <th colspan="1">건설사</th>
            <td colspan="3">{{ detail.constructionCompanyName }}</td>
          </tr>
          <tr>
            <th colspan="1">관리사무소</th>
            <td colspan="3">{{ detail.managementOfficeTelNo }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div v-else><h2>단지정보가 없습니다.</h2></div>
  </v-container>
</template>

<style scoped>
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
</style>
