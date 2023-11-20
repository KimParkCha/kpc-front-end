<script setup>
import { ref } from 'vue'
import realPriceView from './RealPriceView.vue'
import RealEstateDetail from './RealEstateDetail.vue'
import NewsView from './NewsView.vue'

const data = ref({
  tab: null
})
console.log('tab: ' + data.tab)

const detail = {
  complexNo: '14419',
  complexName: '초당유화1차',
  cortarNo: '5115011200',
  realEstateTypeCode: 'APT',
  realEstateTypeName: '아파트',
  detailAddress: '182-2',
  roadAddress: '연당길 94-3',
  latitude: 37.7861,
  longitude: 128.91371,
  totalHouseholdCount: 90,
  totalLeaseHouseholdCount: 0,
  permanentLeaseHouseholdCount: 0,
  nationLeaseHouseholdCount: 0,
  civilLeaseHouseholdCount: 0,
  publicLeaseHouseholdCount: 0,
  longTermLeaseHouseholdCount: 0,
  etcLeaseHouseholdCount: 0,
  highFloor: 14,
  lowFloor: 5,
  useApproveYmd: '19931013',
  totalDongCount: 1,
  maxSupplyArea: 71.15,
  minSupplyArea: 71.15,
  dealCount: 9,
  rentCount: 1,
  leaseCount: 3,
  shortTermRentCount: 0,
  isBookmarked: false,
  batlRatio: '282',
  btlRatio: '26',
  parkingPossibleCount: 30,
  parkingCountByHousehold: 0.33,
  constructionCompanyName: '(주)유화주택건설',
  heatMethodTypeCode: 'HT001',
  heatFuelTypeCode: 'HF007',
  pyoengNames: '71',
  managementOfficeTelNo: '033-653-9687',
  address: '강원도 강릉시 초당동',
  roadAddressPrefix: '강원도 강릉시',
  roadZipCode: '25469'
}

const RealPriceDetail = {
  tradeYear: '2021',
  tradeMonth: '12',
  tradeDate: '14',
  formattedPrice: '1억 4000',
  floor: '4'
}
</script>

<template>
  <v-card>
    <v-tabs v-model="data.tab" bg-color="white">
      <v-tab value="one"><h2>단지 정보</h2></v-tab>
      <v-tab value="two"><h2>실거래가 정보</h2></v-tab>
      <v-tab value="three"><h2>뉴스</h2></v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="data.tab">
        <v-window-item value="one"> <RealEstateDetail :data="detail" /> </v-window-item>

        <v-window-item value="two"> <realPriceView :data="RealPriceDetail" /> </v-window-item>

        <v-window-item value="three"> <NewsView></NewsView> </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
