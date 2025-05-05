<template>
  <el-card style="max-width: 480px; border: none" shadow="never">
    <template #header>
      <div class="card-header" style="border: none">
        <el-image :src="authorImg" fit="fill" class="author-img" />
        <span class="name">John Doe</span>
      </div>
    </template>
    <h3 class="blog-title">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      <p class="blog-content">Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
    </h3>
    <el-image :src="blogImg" fit="contain" class="blog-img" />
    <template #footer>
      <div class="card-footer">
        <el-text>2d ago</el-text>
      </div>
    </template>
  </el-card>
  <br />
  <el-divider></el-divider>
  <br />
</template>

<script setup lang="ts">
import authorImg from '../assets/user-img.jpg'
import blogImg from '../assets/sample-img.jpg'
</script>

<style scoped>
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
  max-width: 120px;
  max-height: 120px;
  border-radius: 4px;
}
</style>
