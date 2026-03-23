import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@opensig/opendesign/es/index.css'
import '@opensig/opendesign-token/themes/e.light.token.css'
import '@opensig/opendesign-token/themes/e.dark.token.css'
import './assets/global.scss'
import '@/composables/useTheme'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
