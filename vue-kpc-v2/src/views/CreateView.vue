<script setup>

import { reactive } from "vue";
import userAPI from "../api/user";
import { useRouter } from "vue-router";

const router = useRouter();
const user = reactive({user_id: "", name: "", email: "", password: ""});
const login = () => {
  userAPI.registUser(
    user,
    () => {
      console.log(user);
      router.push({ name: "home" });
    },
    () => {
      alert('회원가입 실패입니다.')
      console.log("회원가입 실패입니다."); 
    }
  )  
}

</script>

<template>
    <v-sheet width="400" class="mx-auto">
  
      <v-form ref="form">
        <v-text-field
          v-model="user.user_id"
          :counter="10"
          :rules="nameRules"
          label="아이디"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :counter="10"
          :rules="nameRules"
          label="비밀번호"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="passwordCheck"
          :counter="10"
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

        <v-text-field
          v-model="user.email"
          :counter="10"
          :rules="nameRules"
          label="이메일"
          required
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="개인정보 수집에 동의하십니까?"
          required
        ></v-checkbox>
  
        <div class="d-flex flex-column">
          <v-btn
            color="success"
            class="mt-4"
            block
            @click="login"
          >
            가입하기
          </v-btn>
  
          <v-btn
            color="error"
            class="mt-4"
            block
            @click="reset"
          >
            초기화
          </v-btn>
  
          <v-btn
            color="warning"
            class="mt-4"
            block
            @click="resetValidation"
          >
            유효성 초기화
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </template>

<style scoped>

</style>