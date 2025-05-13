<template>
  <div class="common-layout">
    <el-container>
      <HeaderComponent />
    </el-container>
    <el-divider></el-divider>
    <el-main>
      <div class="row-wrapper">
        <el-row justify="center" :gutter="20">
          <el-col :xs="24" :sm="24" :md="16" :lg="16">
            <div class="box">
              <el-tabs v-model="activeTab">
                <el-tab-pane label="For you" name="for-you">
                  <BlogItem v-for="blog in getBlogsByOthers" :key="blog.id" :blog="blog" />
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

import HeaderComponent from '@/components/HeaderComponent.vue';
import BlogItem from '@/components/BlogItem.vue';

import { storeToRefs } from 'pinia';

import { useBlogStore } from '@/stores/blog';

const blogStore = useBlogStore();

const { getBlogsByOthers } = storeToRefs(blogStore);

const activeTab = ref('for-you');
</script>

<style scoped>
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

.box {
  padding: 20px;
}
</style>
