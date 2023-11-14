<script setup>
import { reactive } from 'vue'
import userAPI from '@/api/user'
import { useRouter} from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const store = useUserStore()

const { user: globalUser, token: globalToken } = storeToRefs(store)
const {login: globalLogin} = store

console.log(globalUser.value)
console.log(globalToken.value)
globalLogin(globalUser.value)
console.log(globalUser.value)
console.log(globalToken.value)


const router = useRouter()
const user = reactive({})
const login = () => {
  userAPI.loginUser(
    user,
    ({ data }) => {
      console.log(data.response)
      console.log(data.message)
      console.log(data.data)
      if (data.response == 'success') {
        localStorage.setItem('token', data.data)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push({ name: 'home' })
      }
      if (data.response == 'error') {
        alert(data.message)
        router.push({ name: 'login' })
      }
    },
    () => {
      console.log('로그인 실패')
    }
  )
}
</script>

<template>
  <v-sheet :elevation="12" class="mx-auto">
    <v-card class="mx-auto px-6 py-8">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model.lazy="user.email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model.lazy="user.password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="light-blue"
          size="large"
          type="submit"
          variant="elevated"
          @click="login"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.v-sheet {
  height: 200px;
  width: 500px;
  margin-bottom: 200px;
  /* background-color: #27262c; */
}
</style>
