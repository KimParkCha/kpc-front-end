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
  <v-sheet width="400" class="mx-auto">
    <v-form ref="form">
      <v-text-field
        v-model="user.email"
        :counter="10"
        :rules="nameRules"
        label="이메일"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        type="password"
        :counter="10"
        :rules="nameRules"
        label="비밀번호"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.passwordCheck"
        type="password"
        :counter="15"
        :rules="nameRules"
        label="비밀번호 확인"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.name"
        :counter="10"
        :rules="nameRules"
        label="이름"
        required
      ></v-text-field>

      <v-checkbox
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="개인정보 수집에 동의하십니까?"
        required
      ></v-checkbox>

      <div class="d-flex flex-column">
        <v-btn color="light-blue" class="mt-4" size="large" @click="register"> 가입하기 </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.v-text-field {
  background-color: #fff;
}
.v-form {
  background-color: #fff;
}
</style>
