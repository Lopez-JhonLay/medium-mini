import './assets/main.css';

import { createApp, watch } from 'vue';

import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';

import router from './router';

import { useAuthStore } from './stores/auth';
import { useBlogStore } from './stores/blog';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

const [authStore, blogStore] = [useAuthStore(), useBlogStore()];

const [authSavedState, blogSaveState] = [
  localStorage.getItem('users'),
  localStorage.getItem('blogs'),
];

if (authSavedState && blogSaveState) {
  authStore.$patch(JSON.parse(authSavedState));
  blogStore.$patch(JSON.parse(blogSaveState));
}

watch(
  () => authStore.$state,
  (state) => {
    localStorage.setItem('users', JSON.stringify(state));
  },
  { deep: true },
);

watch(
  () => blogStore.$state,
  (state) => {
    localStorage.setItem('blogs', JSON.stringify(state));
  },
  { deep: true },
);

app.mount('#app');
