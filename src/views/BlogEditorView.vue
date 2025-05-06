<template>
  <div class="blog-post-form-container">
    <el-form :model="blogPostForm" label-width="80px" ref="blogPostFormRef">
      <el-form-item
        label="Title"
        prop="title"
        :rules="[{ required: true, message: 'Title is required' }]"
      >
        <el-input v-model="blogPostForm.title" placeholder="Enter title" />
      </el-form-item>
      <el-form-item
        label="Content"
        prop="content"
        :rules="[{ required: true, message: 'Content is required' }]"
      >
        <QuillEditor
          v-model:content="blogPostForm.content"
          content-type="delta"
          ref="quillRef"
          theme="snow"
          placeholder="Write here..."
          class="quill-editor"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading-icon="Eleme"
          :loading="blogStore.isLoading"
          type="primary"
          class="create-post-btn"
          @click="handleSubmit"
          >Publish</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import { ElForm } from 'element-plus';
import { Eleme } from '@element-plus/icons-vue';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { v4 as uuidv4 } from 'uuid';

import { useAuthStore } from '@/stores/auth';
import { useBlogStore } from '@/stores/blog';

const authStore = useAuthStore();
const blogStore = useBlogStore();

const user = authStore.user;

const blogPostFormRef = ref<InstanceType<typeof ElForm> | null>(null);

const quillRef = ref<InstanceType<typeof QuillEditor> | null>(null);

const blogPostForm = reactive({
  title: '',
  content: '',
});

const validateBlogPostForm = async () => {
  try {
    await blogPostFormRef.value?.validate();
    return true;
  } catch (error) {
    console.log('Validation errors:', error);
    return false;
  }
};

const handleSubmit = async () => {
  const isValid = await validateBlogPostForm();

  if (!isValid) {
    console.log('Form validation failed.');
    return;
  }

  console.log('Form is valid!: ', blogPostForm);

  if (!user) return;

  try {
    const isSuccess = await blogStore.saveBlog({
      id: uuidv4(),
      authorId: user.id,
      createdAt: new Date().toISOString(),
      ...blogPostForm,
    });

    if (!isSuccess) return;

    resetForm();
  } catch (error) {
    console.log('Error: ', error);
  }
};

const resetForm = () => {
  blogPostFormRef.value?.resetFields();
  blogPostForm.content = '';

  // Ensure Quill's editor visually resets
  quillRef.value?.getQuill()?.setText('');
};
</script>

<style scoped>
.blog-post-form-container {
  padding: 2rem;
}

:deep(.el-form) {
  width: 100%;
}

:deep(.ql-toolbar) {
  width: 100%;
}

:deep(.ql-editor) {
  min-height: 200px;
}

:deep(.ql-container) {
  height: auto !important;
}

:deep(.quill-editor) {
  width: 100%;
  display: block;
}
</style>
