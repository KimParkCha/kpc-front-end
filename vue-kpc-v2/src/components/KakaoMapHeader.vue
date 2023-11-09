<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search'])

const keyword = ref("")

const search = () => {
    console.log(keyword.value)
    emit("search", keyword)
}
</script>

<template>
    <div>
      <v-tabs bg-color="#BBDEFB" fixed-tabs>
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
            label="원하는 매물을 검색해보세요"
            prepend-inner-icon="mdi-map-marker"
            variant="outlined"
            clearable
            rounded
            v-model.lazy="keyword"
          ></v-text-field>
            <!-- <v-text-field
              v-on:keyup.enter="search($event)"
              dense
              filled
              rounded
              prepend-inner-icon="mdi-magnify"
              label="원하는 매물을 검색해보세요."
              clearable
              v-model.lazy="keyword"
            ></v-text-field> -->
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
    </div>
</template>
<style scoped>
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