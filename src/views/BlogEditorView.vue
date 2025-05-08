<template>
  <div class="blog-post-form-container">
    <el-form
      :model="blogPostForm"
      label-width="80px"
      ref="blogPostFormRef"
      :rules="blogFormRules"
      label-position="top"
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="blogPostForm.title" placeholder="Enter title" />
      </el-form-item>
      <el-form-item prop="img_url">
        <template #label>
          Image Link
          <el-popover placement="bottom" title="Image Preview" :width="200" trigger="click">
            <img :src="blogPostForm.img_url" alt="Preview" style="width: 100%" />
            <template #reference>
              <el-button :disabled="!blogPostForm.img_url" type="text" size="small"
                >(Preview here.)</el-button
              >
            </template>
          </el-popover>
        </template>
        <el-input v-model="blogPostForm.img_url" placeholder="Enter image link" />
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

      <el-form-item label="Tags" prop="tags">
        <div class="tags">
          <el-tag
            v-for="tag in blogPostForm.tags"
            :key="tag"
            type="success"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputTagVisible"
            ref="InputRef"
            v-model="inputTagValue"
            class="w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">
            + New Tag
          </el-button>
        </div>
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
import { reactive, ref, nextTick } from 'vue';

import { ElForm, type FormRules } from 'element-plus';
import type { InputInstance } from 'element-plus';
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
  tags: ['Technology', 'Science', 'Life'],
  img_url: '',
});

const inputTagValue = ref('');
const inputTagVisible = ref(false);
const InputRef = ref<InputInstance>();

const handleClose = (tag: string) => {
  blogPostForm.tags.splice(blogPostForm.tags.indexOf(tag), 1);
};

const showInput = () => {
  inputTagVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputTagValue.value) {
    blogPostForm.tags.push(inputTagValue.value);
  }
  inputTagVisible.value = false;
  inputTagValue.value = '';
};

const validateTitle = (rule: object, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('Please input the title'));
  } else {
    callback();
  }
};

const validateImgUrl = (rule: object, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('Please input the image link'));
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

const validateTags = (rule: object, value: string, callback: (error?: Error) => void) => {
  if (!value.length) {
    callback(new Error('Please input atleast 1 tag'));
  } else {
    callback();
  }
};

const blogFormRules = reactive<FormRules<typeof blogPostForm>>({
  title: [{ required: true, validator: validateTitle, trigger: 'blur' }],
  img_url: [{ required: true, validator: validateImgUrl, trigger: 'blur' }],
  content: [{ required: true, validator: validateContent, trigger: 'blur' }],
  tags: [{ required: true, validator: validateTags, trigger: 'blur' }],
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  /* border: 2px solid red; */
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
