<template>
  <el-card shadow="never" class="blog-card" @click="goToBlogPost(props.blog.id)">
    <template #header>
      <div class="card-header" style="border: none">
        <el-image :src="authorImg" fit="fill" class="author-img" />
        <span class="name">{{ author }}</span>
      </div>
    </template>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16">
        <h3 class="blog-title">
          {{ props.blog.title }}
          <p class="blog-content">{{ previewContent }}</p>
        </h3>
        <div class="tags-container">
          <el-tag v-for="tag in blog.tags" :key="tag" type="success" :disable-transitions="false">
            {{ tag }}
          </el-tag>
        </div>
      </el-col>

      <el-col :xs="24" :sm="8" :md="8">
        <el-image :src="blog.img_url" fit="contain" class="blog-img" />
      </el-col>
    </el-row>
    <template #footer>
      <div class="card-footer">
        <el-text>{{ formattedDate }}</el-text>
      </div>
    </template>
  </el-card>
  <br />
  <el-divider></el-divider>
  <br />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useAuthStore } from '@/stores/auth';

import type { Blog } from '@/models';

import router from '@/router';

import dayjs from 'dayjs';

import authorImg from '../assets/user-img.jpg';

const props = defineProps<{
  blog: Blog;
}>();

const authStore = useAuthStore();

const author = authStore.users
  ?.filter((user) => user.id === props.blog.authorId)
  .map((author) => author.email)[0];

const previewContent = computed(() => {
  const plainText = props.blog.content.replace(/<[^>]*>/g, ' ');
  const words = plainText.trim().split(/\s+/);
  const isTruncated = words.length > 20;
  const shortText = words.slice(0, 20).join(' ');
  return isTruncated ? shortText + '...' : shortText;
});

const formattedDate = dayjs(props.blog.createdAt).format('MMMM D, YYYY h:mm A');

const goToBlogPost = (blogPostId: string) => {
  router.push(`/read-blog-post/${blogPostId}`);
};
</script>

<style scoped>
.blog-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  cursor: pointer;
}

.blog-card:hover {
  background-color: rgb(230, 227, 227);
}

:deep(.el-card__header),
:deep(.el-card__footer) {
  border: none;
  padding: 0;
}

:deep(.el-card__body) {
  padding-inline: 0;
  display: flex;
  align-items: start;
  gap: 0.8rem;
  margin-bottom: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid black;
}

.blog-content {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: grey;
}

.blog-img {
  border-radius: 4px;
  margin-block: 1rem;
}
</style>
