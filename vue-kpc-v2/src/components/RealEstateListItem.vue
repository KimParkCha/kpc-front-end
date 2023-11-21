<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ data: Object })
const emit = defineEmits(['selectedComplex'])
const datas = ref([])

watch(props.data, () => {
  datas.value = props.data
  console.log(props.data)
})

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
    <v-card-title>
      {{ item.complexName }}
    </v-card-title>
    <v-card-subtitle>{{ item.cortarAddress }} </v-card-subtitle>
  </v-card>
</template>
