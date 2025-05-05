import './assets/main.css'

import { createApp, watch } from 'vue'

import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'

import router from './router'

import { useAuthStore } from './stores/auth'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

const store = useAuthStore()

const savedState = localStorage.getItem('users')

if (savedState) {
  store.$patch(JSON.parse(savedState))
}

watch(
  () => store.$state,
  (state) => {
    localStorage.setItem('users', JSON.stringify(state))
  },
  { deep: true },
)

app.mount('#app')
