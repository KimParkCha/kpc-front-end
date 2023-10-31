<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6"
          >오늘의 부동산 온도 정보를 확인하세요!</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-list class="transparent">
      <v-list-item v-for="item in news" :key="item.title">
        <v-list-item-title>{{ item.title }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn block text>전체 뉴스정보 확인하기</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'NewsListCard',
  data() {
    return {
      news: [
        {
          title: '尹 "미래세대에 빚 넘기면 안돼…약자보호·성장동력에 예산투입"',
          icon: 'mdi-white-balance-sunny',
        },
        {
          title: '이번엔 전청조 모친이 스토킹…남현희가 경찰에 신고',
          icon: 'mdi-white-balance-sunny',
        },
        {
          title:
            '[이·팔 전쟁] "지상전 예상보다 느리게 전개"…이스라엘 속도조절 이유',
          icon: 'mdi-cloud',
        },
      ],
    }
  },
}
</script>

<style></style>
