<template>
  <div>Welcome</div>
  <el-button
    type="danger"
    :loading-icon="Eleme"
    :loading="useAuthStore().isLoading"
    @click="useAuthStore().logout()"
    >Logout</el-button
  >
</template>

<script setup lang="ts">
import { Eleme } from '@element-plus/icons-vue'

import { useAuthStore } from '@/stores/auth'
</script>

<style scoped></style>
