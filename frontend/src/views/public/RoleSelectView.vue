<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROLE_OPTIONS } from '@/constants/roles'
import { useAppStore } from '@/stores/app'
import { switchRole } from '@/api/auth'

const router = useRouter()
const appStore = useAppStore()
const submittingRole = ref('')

async function selectRole(role) {
  submittingRole.value = role
  const session = await switchRole({
    role,
    userName: appStore.userName,
  })
  appStore.setSession(session)
  submittingRole.value = ''
  router.push('/dashboard')
}
</script>

<template>
  <section class="role-page">
    <div class="role-page__header">
      <p class="role-page__eyebrow">Role Switch</p>
      <h1>选择角色</h1>
      <p>用于快速切换不同权限视角，检查菜单、页面可见性和流程入口。</p>
    </div>

    <div class="role-grid">
      <button
        v-for="item in ROLE_OPTIONS"
        :key="item.key"
        type="button"
        class="role-card"
        :class="{ 'is-active': appStore.currentRole === item.key }"
        :disabled="submittingRole === item.key"
        @click="selectRole(item.key)"
      >
        <strong>{{ item.label }}</strong>
        <span>{{ submittingRole === item.key ? '切换中...' : item.key }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="less">
.role-page {
  min-height: 100vh;
  padding: 48px 28px;
  background:
    radial-gradient(circle at top right, fade(@accent, 10%), transparent 26%),
    linear-gradient(180deg, fade(@cream, 65%), @paper);
}

.role-page__header {
  margin-bottom: 26px;

  h1 {
    margin: 10px 0;
    color: @ink;
  }

  p:last-child {
    margin: 0;
    color: @muted;
  }
}

.role-page__eyebrow {
  margin: 0;
  color: @accent;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.role-card {
  padding: 22px 18px;
  border-radius: 20px;
  border: 1px solid @border-color;
  background: fade(#fffdf8, 86%);
  text-align: left;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover,
  &.is-active {
    transform: translateY(-2px);
    border-color: fade(@accent, 40%);
    box-shadow: 0 18px 36px fade(@ink, 8%);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: @ink;
    margin-bottom: 8px;
  }

  span {
    color: @muted;
  }
}

@media (max-width: 1100px) {
  .role-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .role-page {
    padding: 28px 20px;
  }

  .role-grid {
    grid-template-columns: 1fr;
  }
}
</style>
