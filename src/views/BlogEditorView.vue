<template>
  <div class="blog-post-form-container">
    <el-form :model="blogPostForm" label-width="80px" ref="blogPostFormRef" :rules="blogFormRules">
      <el-form-item label="Title" prop="title">
        <el-input v-model="blogPostForm.title" placeholder="Enter title" />
      </el-form-item>
      <el-form-item label="Content" prop="content">
        <QuillEditor
          v-model:content="blogPostForm.content"
          content-type="html"
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

import { ElForm, type FormRules } from 'element-plus';
import { Eleme } from '@element-plus/icons-vue';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { v4 as uuidv4 } from 'uuid';

import { useAuthStore } from '@/stores/auth';
import { useBlogStore } from '@/stores/blog';
import type { Blog, BlogForm } from '@/models';

const authStore = useAuthStore();
const blogStore = useBlogStore();

const user = authStore.user;

const blogPostFormRef = ref<InstanceType<typeof ElForm> | null>(null);

const quillRef = ref<InstanceType<typeof QuillEditor> | null>(null);

const blogPostForm = reactive<BlogForm>({
  title: '',
  content: '',
});

const validateTitle = (rule: object, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('Please input the title'));
  } else {
    callback();
  }
};

const validateContent = (rule: object, value: string, callback: (error?: Error) => void) => {
  const wordCount = value?.trim().split(/\s+/).filter(Boolean).length;
  if (value === '') {
    callback(new Error('Please input the content'));
  } else if (wordCount < 20) {
    callback(new Error('Content must be at least 20 words.'));
  } else {
    callback();
  }
};

const blogFormRules = reactive<FormRules<typeof blogPostForm>>({
  title: [{ validator: validateTitle, trigger: 'blur' }],
  content: [{ validator: validateContent, trigger: 'blur' }],
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
    const now = new Date().toISOString();

    const fullBlog: Blog = {
      ...blogPostForm,
      id: uuidv4(),
      authorId: user.id,
      createdAt: now,
    };

    const isSuccess = await blogStore.saveBlog(fullBlog);

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
