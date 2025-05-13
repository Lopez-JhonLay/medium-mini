<template>
  <div style="width: 100%">
    <el-header>
      <h2>Medium<sup>mini</sup></h2>
      <div class="features">
        <el-icon :size="20"><Search /></el-icon>
        <router-link to="/write-blog-post">
          <el-icon :size="20"><Edit /></el-icon>
        </router-link>
        <el-popover ref="popover" placement="bottom-end" :width="200" trigger="click">
          <div class="popover-content">
            <el-button
              type="danger"
              :loading-icon="Eleme"
              :loading="authStore.isLoading"
              @click="authStore.logout()"
              >Logout</el-button
            >
          </div>
          <template #reference>
            <el-button link @click="visible = !visible">
              <el-image
                style="width: 30px; height: 30px; border-radius: 50%; border: 1px solid black"
                :src="userImage"
                fit="fill"
              />
            </el-button>
          </template>
        </el-popover>
      </div>
    </el-header>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useAuthStore } from '@/stores/auth';

import { Eleme } from '@element-plus/icons-vue';

import userImage from '../assets/user-img.jpg';

const authStore = useAuthStore();

const visible = ref(false);
</script>

<style scoped>
:deep(.el-header) {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-inline: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-header sup) {
  font-size: 0.8rem;
  font-weight: normal;
}

:deep(.el-button) {
  width: 100%;
}

.features {
  display: flex;
  align-items: center;
  gap: 2rem;
}

a {
  color: black;
}
</style>
