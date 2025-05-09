<template>
  <div class="common-layout">
    <el-container>
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
    </el-container>
    <el-divider></el-divider>
    <el-main>
      <div class="row-wrapper">
        <el-row justify="center" :gutter="20">
          <el-col :xs="24" :sm="24" :md="16" :lg="16">
            <div class="box">
              <el-tabs v-model="activeTab">
                <el-tab-pane label="For you" name="for-you">
                  <BlogItem v-for="blog in blogsByOthers" :key="blog.id" :blog="blog" />
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :md="8" :lg="8" class="hidden-sm-and-down">
            <div class="box">Right Column</div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Eleme } from '@element-plus/icons-vue';

import BlogItem from '@/components/BlogItem.vue';

import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';
import { useBlogStore } from '@/stores/blog';

import userImage from '../assets/user-img.jpg';

const authStore = useAuthStore();
const blogStore = useBlogStore();

const { blogsByOthers } = storeToRefs(blogStore);

const visible = ref(false);
const activeTab = ref('for-you');
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

:deep(.el-divider) {
  margin: 0;
}

.row-wrapper {
  max-width: 1440px;
  margin: 0 auto;
}

:deep(.el-tabs) {
  width: 100%;
  max-width: fit-content;
}

a {
  color: black;
}

.box {
  padding: 20px;
}
</style>
