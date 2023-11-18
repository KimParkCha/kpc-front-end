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

// console.log(globalUser.value)
// console.log(globalToken.value)
// globalLogin(globalUser.value)
// console.log(globalUser.value)
// console.log(globalToken.value)

const router = useRouter()
const user = reactive({})
const loginFn = async () => {
  // console.log(loginUser.value.email)
  // console.log(loginUser.value.password)
  // console.log('login ing!!!! !!!')

  await login(loginUser.value)

  let token = sessionStorage.getItem('accessToken')

  // console.log('111. ', token)
  // console.log('isLogin: ', isLogin)
  if (isLogin) {
    // console.log('로그인 성공아닌가???')
    getUserInfo(token)
    changeMenuState()
    router.push('/')
  } else {
    console.log('로그인 실패')
    router.push('/login')
  }
}

const create = () => {
  router.push('/create')
}
</script>

<template>
  <v-sheet :elevation="12" class="mx-auto">
    <v-card class="mx-auto px-6 py-8">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model.lazy="loginUser.email"
          class="mb-2"
          clearable
          label="이메일"
        ></v-text-field>

        <v-text-field
          v-model.lazy="loginUser.password"
          :rules="[required]"
          clearable
          label="패스워드"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          block
          color="light-blue"
          size="large"
          type="submit"
          variant="elevated"
          @click="loginFn"
        >
          로그인
        </v-btn>
        <br>
        <v-btn
          :disabled="!form"
          block
          color="light-blue"
          size="large"
          type="submit"
          variant="elevated"
          @click="create"
        >
          회원가입
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

.v-card{
  background-color: #fff;
}
</style>
