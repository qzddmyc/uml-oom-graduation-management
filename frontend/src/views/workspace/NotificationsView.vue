<script setup>
import { ref, watch } from 'vue'
import { getNotifications } from '@/api/user'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const loading = ref(false)
const notifications = ref([])
const levelTypeMap = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}
const levelLabelMap = {
  info: '通知',
  success: '完成',
  warning: '提醒',
  danger: '紧急',
}

async function loadNotifications() {
  loading.value = true
  notifications.value = await getNotifications(appStore.currentRole)
  loading.value = false
}

function getLevelType(level) {
  return levelTypeMap[level] || 'info'
}

function getLevelLabel(level) {
  return levelLabelMap[level] || '通知'
}

watch(
  () => appStore.currentRole,
  () => {
    loadNotifications()
  },
  { immediate: true },
)
</script>

<template>
  <section class="notice-page" v-loading="loading">
    <div class="notice-hero">
      <p class="notice-eyebrow">Workspace</p>
      <h2>消息中心</h2>
      <p>集中查看系统通知、流程提醒和审批消息。</p>
    </div>

    <div class="notice-list">
      <el-card v-for="item in notifications" :key="item.id" shadow="never" class="notice-card">
        <div class="notice-card__head">
          <strong>{{ item.title }}</strong>
          <el-tag :type="getLevelType(item.level)" effect="light">{{ getLevelLabel(item.level) }}</el-tag>
        </div>
        <p>{{ item.content }}</p>
        <span>{{ item.time }}</span>
      </el-card>
    </div>
  </section>
</template>

<style scoped lang="less">
.notice-page {
  display: grid;
  gap: 20px;
}

.notice-hero {
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, fade(@accent, 10%), fade(@cream, 75%));
  border: 1px solid fade(@accent, 18%);

  h2 {
    margin: 0;
    color: @ink;
  }

  p:last-child {
    margin: 12px 0 0;
    color: @muted;
  }
}

.notice-eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: @accent;
}

.notice-list {
  display: grid;
  gap: 16px;
}

.notice-card {
  border-radius: 22px;
  border-color: @border-color;

  p {
    margin: 12px 0 0;
    color: @ink-soft;
    line-height: 1.7;
  }

  span {
    display: block;
    margin-top: 12px;
    color: @muted;
  }
}

.notice-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  strong {
    color: @ink;
  }

  :deep(.el-tag) {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    line-height: 1;
  }
}
</style>
