<template>
  <el-popover placement="right" width="200" trigger="manual" v-model:visible="visible">
    <img src="https://via.placeholder.com/150" alt="Preview" style="width: 100%" />
    <template #reference>
      <slot name="trigger"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { defineExpose, ref } from 'vue';

const visible = ref(false);

defineExpose({
  show: () => (visible.value = true),
  hide: () => (visible.value = false),
  toggle: () => (visible.value = !visible.value),
});
</script>

<style scoped></style>
