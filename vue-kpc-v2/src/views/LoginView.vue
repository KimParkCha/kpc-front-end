<script setup>
import { ref, reactive } from 'vue'
import userAPI from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/menu'

const userStore = useUserStore()

const { isLogin } = storeToRefs(userStore)
const { login, getUserInfo } = userStore
const { changeMenuState } = useMenuStore()

const loginUser = ref({
  email: '',
  password: ''
})

const router = useRouter()
const user = reactive({})
const loginFn = async () => {
  console.log(loginUser.value.email)
  console.log(loginUser.value.password)
  console.log('login ing!!!! !!!')

  await login(loginUser.value)

  let token = sessionStorage.getItem('accessToken')

  console.log('111. ', token)
  console.log('isLogin: ', isLogin.value)
  if (isLogin.value) {
    console.log('로그인 성공')
    // getUserInfo(token)
    changeMenuState()
    router.push('/')
  } else {
    console.log('로그인 실패')
    alert('회원정보를 다시 입력해주세요')
    router.push('/login')
  }
}

const createFn = () => {
  router.push('/signup')
}
</script>

<template>
  <v-sheet :elevation="12" class="mx-auto fade-view">
    <v-card width="400" class="mx-auto px-6 py-8">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model.lazy="loginUser.email"
          class="mb-2"
          clearable
          label="이메일"
        ></v-text-field>

        <v-text-field
          v-model.lazy="loginUser.password"
          clearable
          label="비밀번호"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :loading="loading"
          block
          color="light-blue"
          size="large"
          type="submit"
          variant="elevated"
          @click="loginFn"
        >
          로그인
        </v-btn>
        <br />
        <v-btn
          :loading="loading"
          block
          color="light-blue"
          size="large"
          type="submit"
          variant="elevated"
          @click="createFn"
        >
          회원가입
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.v-card {
  background-color: #fff;
}
</style>
