<script setup>
import { reactive } from 'vue'
import userAPI from '../api/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = reactive({ user_id: '', name: '', email: '', password: '', passwordCheck: '' })
const register = () => {
  userAPI.registUser(
    user,
    () => {
      console.log(user)
      router.push({ name: 'home' })
    },
    () => {
      alert('회원가입 실패입니다.')
      console.log('회원가입 실패입니다.')
    }
  )
}
</script>

<template>
  <v-sheet :elevation="12" class="mx-auto fade-view">
    <v-card width="500" class="mx-auto px-6 py-8">
      <h2 class="mb-12">회원가입</h2>
      <v-form ref="form">
        <v-text-field v-model="user.email" :counter="20" label="이메일" required></v-text-field>

        <v-text-field
          class="password"
          v-model="user.password"
          type="password"
          :counter="10"
          label="비밀번호"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.passwordCheck"
          class="password"
          type="password"
          :counter="15"
          label="비밀번호 확인"
          required
        ></v-text-field>

        <v-text-field v-model="user.name" :counter="10" label="이름" required></v-text-field>

        <v-checkbox
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="개인정보 수집에 동의하십니까?"
          required
        ></v-checkbox>

        <div class="d-flex flex-column">
          <v-btn color="light-blue" class="mt-4" size="large" @click="register"> 가입하기 </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style>
.v-sheet {
  margin-top: 300px;
}
.password {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.v-text-field {
  background-color: #fff;
}
.v-form {
  background-color: #fff;
}
</style>
