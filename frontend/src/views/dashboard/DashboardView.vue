<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { getDashboardOverview } from '@/api/dashboard'

const router = useRouter()
const appStore = useAppStore()
const loading = ref(false)
const overview = ref({
  greeting: '',
  headline: '毕业设计管理工作台',
  description: '集中查看当前角色的流程节点、待办事项与关键统计。',
  stats: [],
  quickEntries: [],
  todoList: [],
  announcements: [],
  timeline: [],
  upcomingDeadlines: [],
})

const statCards = computed(() => overview.value.stats)
const quickEntries = computed(() => overview.value.quickEntries)
const timeline = computed(() => overview.value.timeline)
const todoList = computed(() => overview.value.todoList)
const announcements = computed(() => overview.value.announcements)
const upcomingDeadlines = computed(() => overview.value.upcomingDeadlines)

async function loadOverview(role) {
  if (!role) {
    return
  }

  loading.value = true
  overview.value = await getDashboardOverview(role, appStore.userName)
  loading.value = false
}

watch(
  () => appStore.currentRole,
  (role) => {
    loadOverview(role)
  },
  { immediate: true },
)
</script>

<template>
  <section class="dashboard">
    <div class="dashboard-hero">
      <div>
        <p class="hero-eyebrow">Warm Minimal Theme</p>
        <p class="hero-greeting">{{ overview.greeting }}</p>
        <h2>{{ overview.headline }}</h2>
        <p class="hero-description">{{ overview.description }}</p>
      </div>
      <el-button type="primary" size="large" @click="router.push('/select-role')">切换当前角色</el-button>
    </div>

    <div class="dashboard-stats" :class="{ 'is-loading': loading }">
      <el-card v-for="item in statCards" :key="item.title" shadow="never" class="dashboard-card">
        <p class="card-label">{{ item.title }}</p>
        <h3>{{ item.value }}</h3>
        <p class="card-hint">{{ item.hint }}</p>
      </el-card>
    </div>

    <div class="dashboard-main">
      <el-card shadow="never" class="dashboard-card">
        <template #header>快捷入口</template>
        <div class="quick-grid">
          <button
            v-for="entry in quickEntries"
            :key="entry.path"
            type="button"
            class="quick-entry"
            @click="router.push(entry.path)"
          >
            <strong>{{ entry.title }}</strong>
            <span>进入页面</span>
          </button>
        </div>
      </el-card>

      <el-card shadow="never" class="dashboard-card">
        <template #header>核心流程概览</template>
        <div class="timeline">
          <div v-for="item in timeline" :key="item.stage" class="timeline-item">
            <span class="timeline-dot"></span>
            <div>
              <strong>{{ item.stage }}</strong>
              <p>{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="dashboard-main">
      <el-card shadow="never" class="dashboard-card">
        <template #header>当前待办</template>
        <div class="todo-list">
          <div v-for="item in todoList" :key="item.id" class="todo-item">
            <div>
              <strong>{{ item.title }}</strong>
              <p>截止：{{ item.deadline }}</p>
            </div>
            <el-tag effect="plain">{{ item.status }}</el-tag>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="dashboard-card">
        <template #header>通知与时间节点</template>
        <div class="notice-list">
          <div v-for="item in announcements" :key="item.id" class="notice-item">
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.content }}</p>
            </div>
            <span>{{ item.time }}</span>
          </div>
        </div>

        <div class="deadline-list">
          <div v-for="item in upcomingDeadlines" :key="item.id" class="deadline-item">
            <strong>{{ item.stage }}</strong>
            <span>{{ item.deadline }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<style scoped lang="less">
.dashboard {
  display: grid;
  gap: 20px;
}

.dashboard-hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 32px;
  border-radius: 28px;
  background:
    linear-gradient(135deg, fade(@accent, 8%), transparent 45%),
    linear-gradient(135deg, #fffdf8, fade(@cream, 82%));
  border: 1px solid fade(@accent, 18%);
}

.hero-eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: @accent;
  text-transform: uppercase;
}

.hero-greeting {
  margin: 0 0 10px;
  color: @muted;
}

h2 {
  margin: 0;
  font-size: 34px;
  color: @ink;
}

.hero-description {
  margin: 14px 0 0;
  max-width: 720px;
  color: @muted;
  line-height: 1.8;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.dashboard-main {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 20px;
}

.dashboard-card {
  border-radius: 22px;
  border-color: @border-color;
  background: fade(#fffdf8, 84%);

  :deep(.el-card__header) {
    font-weight: 600;
    color: @ink;
  }
}

.card-label,
.card-hint,
.timeline p {
  color: @ink-soft;
}

h3 {
  margin: 14px 0 10px;
  font-size: 30px;
  color: @ink;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.quick-entry {
  padding: 18px 16px;
  border-radius: 18px;
  border: 1px solid fade(@accent, 18%);
  background: linear-gradient(135deg, fade(@accent, 7%), fade(@cream, 55%));
  text-align: left;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
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

.timeline {
  display: grid;
  gap: 18px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 12px;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  margin-top: 7px;
  border-radius: 50%;
  background: @accent;
  box-shadow: 0 0 0 6px fade(@accent, 14%);
}

.timeline strong {
  color: @ink;
}

.timeline p {
  margin: 8px 0 0;
  line-height: 1.7;
}

.todo-list,
.notice-list {
  display: grid;
  gap: 14px;
}

.todo-item,
.notice-item,
.deadline-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, fade(@accent, 5%), fade(@cream, 38%));
  border: 1px solid fade(@accent, 12%);
}

.todo-item strong,
.notice-item strong,
.deadline-item strong {
  color: @ink;
}

.todo-item p,
.notice-item p,
.notice-item span,
.deadline-item span {
  margin: 8px 0 0;
  color: @muted;
}

.notice-item span,
.deadline-item span {
  flex-shrink: 0;
  font-size: 12px;
  line-height: 1.5;
  text-align: right;
}

.deadline-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

@media (max-width: 1100px) {
  .dashboard-hero,
  .dashboard-stats,
  .dashboard-main,
  .quick-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-hero {
    flex-direction: column;
  }
}
</style>
