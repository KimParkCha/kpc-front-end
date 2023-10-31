<template>
  <div>
    <v-tabs background-color="#BBDEFB" color="white">
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
            dense
            filled
            rounded
            prepend-inner-icon="mdi-magnify"
            label="원하는 매물을 검색해보세요."
            clearable
          ></v-text-field>
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

<script>
export default {
  name: 'MapHeader',
}
</script>

<style>
.v-tabs {
  margin: 10px;
}
.v-chip-group {
  margin-bottom: 24px;
}
.container {
  color: aqua;
  background-color: '#BBDEFB';
}
</style>
