<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ data: Object })

const datas = ref([])

watch(props.data, () => {
  datas.value = props.data
  console.log(props.data)
})
</script>
<template>
  <v-card outlined hover v-for="item in data" :key="item.id" class="ma-3 pa-3">
    <v-card-title>
      {{ item.complexName }}
    </v-card-title>
    <v-card-subtitle>{{ item.cortarAddress }} </v-card-subtitle>
  </v-card>
</template>