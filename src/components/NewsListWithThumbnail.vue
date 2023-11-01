<template>
  <v-card class="mt-12">
    <v-card-title
      >{{ title }} 지역의 관련 뉴스 정보를 가져와봤어요.</v-card-title
    >
    <v-divider></v-divider>
    <v-row class="mt-6">
      <v-col v-for="n in 5" :key="n">
        <v-item>
          <v-card
            :color="active ? 'primary' : ''"
            class="d-flex align-center"
            height="200"
          >
          </v-card>
        </v-item>
      </v-col>
    </v-row>
    <v-btn class="mt-12" large block>전체 뉴스기사 확인하기</v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'NewsListWithThumbnail',
  props: {
    title: String,
  },
}
</script>

<style></style>
