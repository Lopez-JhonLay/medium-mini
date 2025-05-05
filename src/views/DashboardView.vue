<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h2>Medium<sup>mini</sup></h2>
        <div class="features">
          <el-icon :size="20"><Search /></el-icon>
          <el-icon :size="20"><Edit /></el-icon>
          <el-popover ref="popover" placement="bottom-end" :width="200" trigger="click">
            <div class="popover-content">
              <el-button
                type="danger"
                :loading-icon="Eleme"
                :loading="useAuthStore().isLoading"
                @click="useAuthStore().logout()"
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
    </el-container>
    <el-divider></el-divider>
    <el-main>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="For you" name="for-you">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Eleme } from '@element-plus/icons-vue'

import PostItem from '@/components/PostItem.vue'

import { useAuthStore } from '@/stores/auth'

import userImage from '../assets/user-img.jpg'

const visible = ref(false)
const activeTab = ref('for-you')
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

.features {
  display: flex;
  align-items: center;
  gap: 2rem;
}

:deep(.el-divider) {
  margin: 0;
}

:deep(.el-main) {
  width: 100%;
  max-width: 1440px;
  border: 2px solid red;
  margin: 0 auto;
  padding-inline: 0.8rem;
}
</style>
