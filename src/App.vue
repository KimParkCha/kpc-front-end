<template>
  <v-app>
    <core-app-bar />
    <core-view />
    <core-footer author="현우" />
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

  data: () => ({
    //
  }),
}
</script>
