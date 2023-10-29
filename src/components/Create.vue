<template>
  <v-container style="width: 35%; margin-top: 10%">
    <div class="text-h4">
      <v-icon large> mdi-account </v-icon>
      사용자등록
    </div>
    <div class="mt-4">
      <v-text-field label="Insert Username" v-model="name" />
    </div>
    <v-btn color="primary" @click="createUser()"> 등록 </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'ComponentCreate',
  data() {
    return {
      name: '',
    }
  },
  methods: {
    createUser() {
      if (!this.name) {
        alert('사용자이름을 입력해주세요')
        return
      }
      alert(this.name + '님을 등록합니다.')
    },
  },
}
</script>

<style></style>
