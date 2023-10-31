<template>
  <v-parallax dark src="./../assets/banner.jpg">
    <v-row align="center" justify="center">
      <v-col cols="12" align="left">
        <h1 class="text-h2 font-weight-bold mb-4">
          오늘의 부동산 분석 정보를 <br /><br />김박차에서 확인하세요.
        </h1>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  name: 'parallaxBanner',
  data() {
    return {
      image: require('./../assets/banner.jpg'),
    }
  },
}
</script>

<style>
.text-h2 {
  margin-left: 30px;
}
</style>
