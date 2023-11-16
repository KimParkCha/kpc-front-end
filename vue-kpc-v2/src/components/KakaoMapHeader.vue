<script setup>
import { ref, reactive, watch } from 'vue'
import regionAPI from '@/api/realEstate'
const emit = defineEmits(['search'])

const keyword = ref('')
const items = ref([])
const autoSearchList = ref(false)

let timerId = null
const snackbarData = reactive({
  snackbar: false,
  text: '검색어에 해당하는 지역 정보가 존재하지 않습니다.',
  timeout: 2000
})

const fetchEntriesDebounced = () => {
      items.value = null
      clearTimeout(timerId)
      // 0.5초 동안 동작이 없으면 completeSearch 함수 호출
      timerId = setTimeout(() => {
        // maybe : this.fetch_data()
        console.log("api 호출")
       
        completeSearch()
      }, 500)
}
const completeSearch = () => {
  let str = keyword.value
  str = str.trim()                                                
  const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|+]/.test(str);    
  if(!reg && str !== ""){

    regionAPI.getRegions(
      keyword.value,
      (data) => {
        if (data.data.length == 0) {
          console.log('데이터 없음')
          snackbarData.snackbar = true
        }
        items.value = data.data
      },
      () => {}
    )
  }
}

watch(keyword, (newVal) => {
  if (newVal) {
    fetchEntriesDebounced()
  } else {
    items.value = []
  }
})
const updateStatus = (status) => {
    autoSearchList.value = status
}
const clickItem = (item) => {
  emit('search', item)
  keyword.value = ""
}
</script>

<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab>아파트, 오피스텔</v-tab>
      <v-tab>빌라, 주택</v-tab>
      <v-tab>원룸, 투룸</v-tab>
      <v-tab>상가</v-tab>
      <v-tab>내가 찜한 지역</v-tab>
    </v-tabs>
    <v-col class="container" align="center" justify="center">
      <v-row align="center">
        <v-col cols="12" sm="6" md="4" align="center">
    <v-text-field
        v-model.lazy="keyword"
        filled
        rounded
        dense
        variant="solo"
        @focus="updateStatus(true)"
    >
    </v-text-field>
    <transition name="top-slide" mode="in-out">
      <div class="justify-center align-center flex-column d-flex">
        <v-list class="pa-0 ma-0 search-list" :v-show="autoSearchList.value" light>
          <v-list-item-group>
              <v-list-item
              v-for="(item,index) in items"
                     :key="index" 
                     @click="clickItem(item)"
                  class="top-list"
                  :class="{ 'on-hover': hover }">
                <v-list-item-content class="pl-0">
                  <v-list-item-title :title="item.cortarName">
                    <span > {{item.cortarName}} </span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-divider></v-divider> 
              </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </transition>
  </v-col>
        <v-chip-group v-model="amenities" column multiple>
          <v-chip large filter outlined> 아파트 </v-chip>
          <v-chip large filter outlined> 아파트 분양권 </v-chip>
          <v-chip large filter outlined> 재건축 </v-chip>
          <v-chip large filter outlined> 오피스텔 </v-chip>
          <v-chip large filter outlined> 오피스텔 분양권 </v-chip>
        </v-chip-group>
      </v-row>
    </v-col>
    <v-snackbar v-model="snackbarData.snackbar" :timeout="snackbarData.timeout">
      {{ snackbarData.text }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbarData.snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style scoped>
.v-list {
  z-index: 3333;
  position: absolute;
  width: 400px;
  border-radius: 10px;
  top: 210px;
}

.v-tabs {
  margin: 10px;
}
.v-chip-group {
  margin-bottom: 24px;
}
.container {
  background-color: '#BBDEFB';
}
</style>
