<script setup>
import { computed, ref, watch } from 'vue'
import { getCurrentUserProfile, getNotifications } from '@/api/user'
import InfoPanel from '@/components/common/InfoPanel.vue'
import StatGrid from '@/components/common/StatGrid.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const loading = ref(false)
const profile = ref(null)
const notifications = ref([])

const statItems = computed(() => {
  if (!profile.value) {
    return []
  }

  return [
    { title: '当前角色', value: appStore.displayRole, hint: profile.value.title },
    { title: '所属组织', value: profile.value.orgName, hint: profile.value.office },
    { title: '工作重点', value: profile.value.focus, hint: profile.value.email },
  ]
})

async function loadProfile() {
  loading.value = true
  profile.value = await getCurrentUserProfile(appStore.currentRole, appStore.userName)
  notifications.value = await getNotifications(appStore.currentRole)
  loading.value = false
}

watch(
  () => [appStore.currentRole, appStore.userName],
  () => {
    loadProfile()
  },
  { immediate: true },
)
</script>

<template>
  <section class="workspace-page" v-loading="loading">
    <div class="workspace-hero">
      <div>
        <p class="workspace-eyebrow">Workspace</p>
        <h2>个人中心</h2>
        <p class="workspace-desc">查看当前登录角色的基础信息、联系方式与近期提醒。</p>
      </div>
    </div>

    <StatGrid :items="statItems" />

    <div class="workspace-layout">
      <el-card shadow="never" class="workspace-card">
        <template #header>个人信息</template>
        <el-descriptions v-if="profile" :column="2" border>
          <el-descriptions-item label="姓名">{{ profile.userName }}</el-descriptions-item>
          <el-descriptions-item label="角色">{{ appStore.displayRole }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ profile.phone }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ profile.email }}</el-descriptions-item>
          <el-descriptions-item label="所属组织">{{ profile.orgName }}</el-descriptions-item>
          <el-descriptions-item label="办公地点">{{ profile.office }}</el-descriptions-item>
          <el-descriptions-item label="当前重点" :span="2">{{ profile.focus }}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <InfoPanel
        :section="{
          title: '近期提醒',
          type: 'timeline',
          items: notifications.map((item) => ({ title: item.title, content: item.content, meta: item.time })),
        }"
      />
    </div>
  </section>
</template>

<style scoped lang="less">
.workspace-page {
  display: grid;
  gap: 20px;
}

.workspace-hero {
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, fade(@accent, 10%), fade(@cream, 75%));
  border: 1px solid fade(@accent, 18%);
}

.workspace-eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: @accent;
}

h2 {
  margin: 0;
  color: @ink;
}

.workspace-desc {
  margin: 12px 0 0;
  color: @muted;
}

.workspace-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.9fr);
  gap: 20px;
}

.workspace-card {
  border-radius: 22px;
  border-color: @border-color;
}

@media (max-width: 1100px) {
  .workspace-layout {
    grid-template-columns: 1fr;
  }
}
</style>
