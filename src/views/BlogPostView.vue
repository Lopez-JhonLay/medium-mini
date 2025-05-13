<template>
  <div>
    <HeaderComponent />
    <el-divider></el-divider>
    <el-row>
      <el-col style="margin-top: 1rem">
        <h1>{{ blog?.title }}</h1>
      </el-col>
      <el-col style="display: flex; gap: 10px">
        <el-image :src="authorImg" fit="fill" class="author-img" />
        <el-text>{{ formattedDate }}</el-text>
      </el-col>
      <el-col>
        <el-image :src="blog?.img_url" alt="Blog Img" fit="fill" class="blog-img" />
      </el-col>
      <el-col>
        <div v-html="blog?.content" class="blog-content"></div>
      </el-col>
      <el-col>
        <div class="tags-container">
          <el-tag v-for="tag in blog?.tags" :key="tag" type="success" :disable-transitions="false">
            {{ tag }}
          </el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useRoute } from 'vue-router';

import HeaderComponent from '@/components/HeaderComponent.vue';

import { useBlogStore } from '@/stores/blog';

import dayjs from 'dayjs';

import authorImg from '../assets/user-img.jpg';

const blogStore = useBlogStore();

const route = useRoute();

const postId = route.params.postId as string;

const blog = blogStore.getBlogById(postId);

const formattedDate = dayjs(blog?.createdAt).format('MMMM D, YYYY h:mm A');

onMounted(() => {
  console.log(blog);
});
</script>

<style scoped>
:deep(.el-divider) {
  margin: 0;
}

:deep(.el-row) {
  /* border: 2px solid red; */
  max-width: 750px;
  margin: 0 auto;
  padding: 0.8rem;
  gap: 2rem;
}

/* :deep(.el-col) {
  border: 2px solid pink;
} */

.blog-img {
  width: 100%;
}

.author-img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid black;
}

.blog-content * {
  margin-bottom: 20px;
  color: rgb(44, 44, 44);
  line-height: 2rem;
}

.tags-container {
  display: flex;
  gap: 0.5rem;
}
</style>
