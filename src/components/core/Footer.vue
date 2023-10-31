<template>
  <v-footer absolute>
    <v-spacer />
    <div>
      &copy;
      {{ year }}, Made by <v-icon>mdi-vuetify</v-icon>
      <a href="https://gogoadl.tistory.com/">{{ author }}</a>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'CoreFooter',
  props: {
    author: String,
  },
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.getCurrentYear()
  },
  methods: {
    getCurrentYear() {
      let myDate = new Date()
      this.year = myDate.getFullYear()
    },
  },
}
</script>

<style></style>
