<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ data: Object })
const emit = defineEmits(['selectedComplex'])
const datas = ref([])

watch(
  props.data,
  () => {
    datas.value = props.data
    console.log(props.data)
  },
  {
    immediate: true
  }
)

const onClickCard = (item) => {
  emit('selectedComplex', {
    item: item
  })
}
</script>
<template>
  <v-card
    outlined
    hover
    v-for="item in data"
    :key="item.id"
    class="ma-3 pa-3"
    @click="onClickCard(item)"
  >
    <v-card-title class="card-list">
      <h4>
        {{ item.complexName }}
      </h4></v-card-title
    >
    <v-card-subtitle
      ><h5>{{ item.cortarAddress }}</h5>
    </v-card-subtitle>
  </v-card>
</template>
<style>
.v-card-title {
  font-size: 25px;
}
</style>
