<template>
  <v-container fluid class="text-center mt-15 py-12">
    <home-banner />
    <progress-card title="오늘 온도 봐보자" progressVal="70" />
    <v-avatar size="250">
      <v-img
      src=https://tistory3.daumcdn.net/tistory/3932093/attach/011129f3c339412f95e66b56125cb452
      />
    </v-avatar>
    <p class="text-h3 blue--text mt-3">vue tutorial</p>
  </v-container>
</template>
<script>
import HomeBanner from './Banner.vue'
import ProgressCard from './ProgressCard.vue'

export default {
  name: 'ComponentHome',
  components: {
    HomeBanner,
    ProgressCard,
  },
}
</script>

<style></style>
