<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-card class="mx-auto" max-width="400">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle class="text-h5">
              간편하게 로그인하고
            </v-list-item-subtitle>
            <v-list-item-title>다양한 서비스를 이용하세요</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-form class="mt-12">
          <v-text-field label="Email" name="Email" outlined type="text" />
          <v-spacer></v-spacer>
          <v-text-field
            id="password"
            label="Password"
            name="password"
            outlined
            type="password"
          />
        </v-form>

        <v-divider></v-divider>

        <v-btn text>아이디 찾기</v-btn>
        <v-btn text>비밀번호 찾기</v-btn>
        <v-btn text>회원가입 하기</v-btn>

        <v-btn class="mt-12" block outlined large>시작하기</v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginVue',
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
}
</script>
