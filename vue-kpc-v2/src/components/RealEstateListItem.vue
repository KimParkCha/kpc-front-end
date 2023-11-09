<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ data: Object })

const datas = ref([])

watch(props.data, () => {
    datas.value = props.data
    console.log(props.data)
})
</script>
<template>
<v-card v-for="item in data" :key="item.id"
    class="mx-auto"
  >
    <v-img
      :src="item.avatar"
      height="200px"
      cover
    ></v-img>

    <v-card-title>
      {{ item.title }}
    </v-card-title>

    <v-card-subtitle :v-slot="item.subtitle">
    </v-card-subtitle>

  </v-card>
</template>
<style scoped>
</style>