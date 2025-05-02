<template>
  <el-dialog
    v-model="isAuthFormVisible"
    title="Join Medium Mini"
    :fullscreen="isMobile"
    width="500"
    style="max-width: 500px"
    align-center
  >
    <el-form
      v-if="isSignup"
      :model="signupRuleForm"
      ref="signupRuleFormRef"
      :rules="signupFormRules"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="Email" prop="email">
        <el-input
          :prefix-icon="User"
          v-model="signupRuleForm.email"
          autocomplete="off"
          placeholder="johndoe@example.com"
        />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="signupRuleForm.password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="checkPass">
        <el-input
          :prefix-icon="Lock"
          v-model="signupRuleForm.checkPass"
          autocomplete="off"
          show-password
        />
      </el-form-item>
    </el-form>
    <el-form
      v-else
      :model="loginRuleForm"
      ref="loginRuleFormRef"
      :rules="loginFormRules"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="Email" prop="email">
        <el-input
          :prefix-icon="User"
          v-model="loginRuleForm.email"
          autocomplete="off"
          placeholder="johndoe@example.com"
        />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="loginRuleForm.password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          :loading-icon="Eleme"
          :loading="useAuthStore().isLoading"
          @click="isSignup ? handleSignup(signupRuleFormRef) : handleLogin(loginRuleFormRef)"
          style="
            width: 100%;
            background-color: black;
            color: white;
            padding: 1.3rem;
            border-radius: 20px;
          "
        >
          {{ isSignup ? 'Signup' : 'Login' }}
        </el-button>
      </div>
      <div class="auth-option-container">
        <el-text size="small">{{ isSignup ? 'Already have an account?' : 'No account?' }}</el-text>
        <el-button link type="success" @click="toggleIsSignup()">{{
          isSignup ? 'Login' : 'Signup'
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { onMounted, onUnmounted } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'
import { Lock, User, Eleme } from '@element-plus/icons-vue'

import { v4 as uuidv4 } from 'uuid'

import { useAuthStore } from '@/stores/auth'

const props = defineProps<{ modelValue?: boolean }>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const isAuthFormVisible = ref(props.modelValue)

const isSignup = ref(true)

const isMobile = ref(window.innerWidth < 768)

const handleResize = () => {
  isMobile.value = window.innerWidth < 420
}

watch(isAuthFormVisible, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    isAuthFormVisible.value = newValue ?? false
  },
  { immediate: true },
)

const signupRuleForm = reactive({
  email: '',
  password: '',
  checkPass: '',
})

const signupRuleFormRef = ref<FormInstance>()

const loginRuleForm = reactive({
  email: '',
  password: '',
})

const loginRuleFormRef = ref<FormInstance>()

const validateEmail = (rule: object, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('Please input the email'))
  } else {
    callback()
  }
}

const validatePassword = (rule: object, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (signupRuleForm.checkPass !== '') {
      if (!signupRuleFormRef.value) return
      signupRuleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePassword2 = (rule: object, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== signupRuleForm.password) {
    callback(new Error('Passwords do not match!'))
  } else {
    callback()
  }
}

const signupFormRules = reactive<FormRules<typeof signupRuleForm>>({
  email: [{ validator: validateEmail, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  checkPass: [{ validator: validatePassword2, trigger: 'blur' }],
})

const loginFormRules = reactive<FormRules<typeof loginRuleForm>>({
  email: [{ validator: validateEmail, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

const handleSignup = async (formEl: FormInstance | undefined) => {
  console.log(formEl)

  if (!formEl) {
    console.log('invalid')
    return
  }

  formEl.validate(async (valid) => {
    if (valid) {
      const isSuccess = await useAuthStore().signup({ id: uuidv4(), ...signupRuleForm })
      if (isSuccess) {
        isSignup.value = false
        formEl.resetFields()
      } else {
        return
      }
    } else {
      console.log('error submit!')
    }
  })
}

const handleLogin = async (formEl: FormInstance | undefined) => {
  console.log(formEl)

  if (!formEl) {
    console.log('invalid')
    return
  }

  formEl.validate(async (valid) => {
    if (valid) {
      await useAuthStore().login(loginRuleForm)
      formEl.resetFields()
    } else {
      console.log('error submit!')
    }
  })
}

const toggleIsSignup = () => {
  isSignup.value = !isSignup.value
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.auth-option-container {
  padding-block: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
