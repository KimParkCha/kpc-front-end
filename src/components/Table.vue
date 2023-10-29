<template>
  <v-container fluid style="width: 60%; margin-top: 5%" tag="section">
    <div class="pa-5 black--text">
      <div class="text-h4">
        <v-icon large> mdi-account-multiple </v-icon>
        사용자목록
      </div>
      <div class="text-caption ml-1 mt-1"></div>
    </div>
    <v-data-table
      :headers="getTableHeaders()"
      :items="users"
      :items-per-page="5"
    />
  </v-container>
</template>

<script>
export default {
  name: 'ComponentTable',
  data() {
    return {
      users: [],
    }
  },
  methods: {
    getTableHeaders() {
      return [
        {
          sortable: false,
          text: '번호',
          value: 'id',
          class: 'blue lighten-5',
          align: 'center',
        },
        {
          sortable: false,
          text: '이름',
          value: 'name',
          class: 'blue lighten-5',
          align: 'center',
        },
      ]
    },
    getTableItems() {
      let mockUsers = this.getMockUsers()
      for (var value of mockUsers) {
        this.users.push({ id: value.id, name: value.name })
      }
    },
    getMockUsers() {
      // 서버가 존재하지않아 mockUser를 하드코딩합니다.
      return [
        {
          id: 1,
          name: 'James',
        },
        {
          id: 2,
          name: 'Tom',
        },
      ]
    },
  },
  mounted() {
    this.getTableItems()
  },
}
</script>

<style></style>
