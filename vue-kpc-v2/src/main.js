import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        variables: {}, // ✅ this property is required to avoid Vuetify crash

        colors: {
          //green: '#00ff00' // cannot use primary color names here, so use a custom color name (such as 'greenish')
          greenish: colors.blue.lighten3,
          // Workaround: Custom colors seem to erase default colors, so we need to include the default colors (of `light` or `dark` theme)
          background: colors.blue.lighten4,
          surface: colors.blue.lighten4,
          primary: colors.blue.lighten4,
          'primary-darken-1': colors.blue.lighten3,
          secondary: colors.blue.lighten3,
          'secondary-darken-1': colors.blue.lighten3,
          error: colors.blue.lighten3,
          info: colors.blue.lighten3,
          success: colors.blue.lighten3,
          warning: colors.blue.lighten3
        }
      },
      darkBlue: {
        dark: true,
        variables: {}, // ✅ this property is required to avoid Vuetify crash

        colors: {
          //green: '#00ff00' // cannot use primary color names here, so use a custom color name (such as 'greenish')
          greenish: colors.blue.lighten3,
          // Workaround: Custom colors seem to erase default colors, so we need to include the default colors (of `light` or `dark` theme)
          background: colors.blue.lighten3,
          surface: colors.blue.lighten3,
          primary: colors.blue.lighten3,
          'primary-darken-1': colors.blue.lighten3,
          secondary: colors.blue.lighten3,
          'secondary-darken-1': colors.blue.lighten3,
          error: colors.blue.lighten3,
          info: colors.blue.lighten3,
          success: colors.blue.lighten3,
          warning: colors.blue.lighten3
        }
      }
    }
  }
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
