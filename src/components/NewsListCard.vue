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
      <v-list-item v-for="item in forecast" :key="item.day">
        <v-list-item-title>{{ item.day }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ item.temp }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text> Full Report </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'NewsListCard',
  data() {
    return {
      labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
      time: 0,
      forecast: [
        {
          day: 'Tuesday',
          icon: 'mdi-white-balance-sunny',
          temp: '24\xB0/12\xB0',
        },
        {
          day: 'Wednesday',
          icon: 'mdi-white-balance-sunny',
          temp: '22\xB0/14\xB0',
        },
        { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
      ],
    }
  },
}
</script>

<style></style>
