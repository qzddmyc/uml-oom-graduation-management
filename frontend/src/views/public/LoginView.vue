<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { APP_TITLE, APP_SUBTITLE } from '@/constants/app'
import { FALLBACK_ROLE, ROLE_OPTIONS } from '@/constants/roles'
import { useAppStore } from '@/stores/app'
import { loginWithRole } from '@/api/auth'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const submitting = ref(false)

const form = reactive({
  username: appStore.userName,
  role: appStore.currentRole || FALLBACK_ROLE,
})

async function handleLogin() {
 submitting.value = true
 const session = await loginWithRole({
   username: form.username,
   role: form.role,
 })
 appStore.setSession(session)
 submitting.value = false
 router.push(String(route.query.redirect || '/dashboard'))
}
</script>

<template>
  <section class="login-page">
    <div class="login-intro">
      <p class="login-eyebrow">Prototype Entrance</p>
      <h1>{{ APP_TITLE }}</h1>
      <p class="login-description">
        请选择当前身份进入系统，查看课题申报、过程审核、答辩与成绩管理等核心流程。
      </p>
      <div class="login-palette">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p class="login-subtitle">{{ APP_SUBTITLE }}</p>
    </div>

    <el-card shadow="never" class="login-card">
      <template #header>进入系统</template>
      <el-form label-position="top">
        <el-form-item label="姓名">
          <el-input v-model="form.username" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="当前角色">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option
              v-for="item in ROLE_OPTIONS"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary" class="login-submit" :loading="submitting" @click="handleLogin">登录并进入仪表盘</el-button>
      </el-form>
    </el-card>
  </section>
</template>

<style scoped lang="less">
.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  background:
    radial-gradient(circle at top left, fade(@accent, 12%), transparent 30%),
    linear-gradient(135deg, @paper, lighten(@cream, 3%));
}

.login-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 8vw;
}

.login-eyebrow,
.login-subtitle {
  margin: 0;
  color: @accent;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

h1 {
  margin: 18px 0;
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.1;
  color: @ink;
}

.login-description {
  max-width: 560px;
  margin: 0;
  line-height: 1.8;
  color: @muted;
}

.login-palette {
  display: flex;
  gap: 14px;
  margin: 32px 0 18px;

  span {
    width: 68px;
    height: 12px;
    border-radius: 999px;
    border: 1px solid fade(@ink, 14%);
    box-shadow: inset 0 0 0 1px fade(#fff, 55%);

    &:nth-child(1) {
      background: linear-gradient(135deg, lighten(@ink, 8%), @ink);
    }

    &:nth-child(2) {
      background: linear-gradient(135deg, darken(@cream, 5%), lighten(@paper, 2%));
    }

    &:nth-child(3) {
      background: linear-gradient(135deg, lighten(@accent, 10%), @accent);
    }
  }
}

.login-card {
  align-self: center;
  margin: 48px 8vw 48px 0;
  border-radius: 28px;
  border-color: fade(@accent, 18%);
  background: fade(#fffdf8, 92%);

  :deep(.el-card__header) {
    font-weight: 600;
    color: @ink;
  }
}

.login-submit {
  width: 100%;
  margin-top: 10px;
  height: 48px;
  font-size: 15px;
}

@media (max-width: 960px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-intro,
  .login-card {
    margin: 0;
    padding: 28px 20px;
  }

  .login-card {
    margin: 0 20px 20px;
  }
}
</style>
