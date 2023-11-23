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
const fname = ref('logo')

const createFn = () => {
  router.push('/create')
}

const getImageUrls = (name) => {
  return new URL(`/src/assets/${name}.svg`, import.meta.url).href
}
</script>

<template>
  <div style="display: inline-flex">
    <div>
      <!-- <v-img :src="getImageUrls(fname)" :width="500" :height="500" class="ms-2"></v-img> -->
    </div>
    <v-sheet :elevation="12" class="mx-auto">
      <v-card width="500" class="mx-auto px-6 py-8">
        <h2 class="mb-12">로그인</h2>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field
            v-model.lazy="loginUser.email"
            class="mb-2"
            clearable
            label="이메일"
          ></v-text-field>

          <v-text-field
            class="password"
            v-model.lazy="loginUser.password"
            clearable
            label="비밀번호"
            type="password"
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
  </div>
</template>

<style scoped>
.v-sheet {
  margin-top: 200px;
  margin-bottom: 400px;
  /* background-color: #27262c; */
}

.v-card {
  background-color: #fff;
}

.v-img {
  margin: 100px;
}
</style>
