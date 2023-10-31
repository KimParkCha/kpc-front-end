<template>
  <v-carousel hide-delimiters :show-arrows="false">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-row class="fill-height" align="center" justify="left">
        <div class="text-h1">오늘의 부동산 분석 정보를 <br /></div>
        <div class="text-h1">김박차에서 확인 하세요.</div>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'HomeBanner',
  data() {
    return {
      items: [
        {
          src: require('./../assets/banner.jpg'),
        },
      ],
    }
  },
}
</script>

<style>
.text-h1 {
  margin-left: 30px;
  color: white;
  font-weight: bold;
}
</style>
