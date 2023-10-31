<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <core-app-bar />
    <core-view />
    <core-footer author="개노답 삼형제" />
  </v-app>
</template>

<script>
import CoreAppBar from '@/components/core/AppBar'
import CoreView from '@/components/core/View'
import CoreFooter from '@/components/core/Footer'

export default {
  name: 'App',

  components: {
    CoreAppBar,
    CoreView,
    CoreFooter,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
  },

  data: () => ({
    //
  }),
}
</script>
