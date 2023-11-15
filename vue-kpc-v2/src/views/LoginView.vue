<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
// import {useMenuStore} from '@/stores/menu'

const userStore = useUserStore()

const { user: globalUser, token: globalToken } = storeToRefs(userStore)
const { isLogin } = storeToRefs(userStore)

const { login } = userStore

const loginUser = ref({
  email: '',
  password: ''
})

console.log(globalUser.value)
console.log(globalToken.value)
// globalLogin(globalUser.value)
// console.log(globalUser.value)
// console.log(globalToken.value)

const router = useRouter()
const user = reactive({})
const loginFn = async () => {
  console.log('login ing!!!! !!!')
  await login(loginUser.value)
  let token = sessionStorage.getItem('token')
  console.log('111. ', token)
  console.log('isLogin: ', isLogin)
  if (isLogin) {
    console.log('로그인 성공아닌가???')
    router.push('/')
  } else {
    console.log('로그인 실패')
    router.push('/login')
  }
}
</script>

<template>
  <v-sheet :elevation="12" class="mx-auto">
    <v-card class="mx-auto px-6 py-8">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="user.email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
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
          @click="loginFn"
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
