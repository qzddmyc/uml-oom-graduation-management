<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import StatGrid from '@/components/common/StatGrid.vue'
import { getTopicList } from '@/api/topic'

const router = useRouter()
const loading = ref(false)
const topicRows = ref([])
const detailVisible = ref(false)
const currentTopic = ref(null)

const filterForm = reactive({
  keyword: '',
  source: '全部',
  status: '全部',
})

const statusTypeMap = {
  已发布: 'success',
  待审核: 'warning',
  审核中: 'info',
}

const filteredRows = computed(() =>
  topicRows.value.filter((item) => {
    const matchedKeyword =
      !filterForm.keyword ||
      [item.title, item.teacher, item.major].some((field) =>
        String(field).includes(filterForm.keyword.trim()),
      )
    const matchedSource =
      filterForm.source === '全部' || item.source === filterForm.source
    const matchedStatus =
      filterForm.status === '全部' || item.status === filterForm.status

    return matchedKeyword && matchedSource && matchedStatus
  }),
)

const statItems = computed(() => {
  const publishedCount = filteredRows.value.filter((item) => item.status === '已发布').length
  const pendingCount = filteredRows.value.filter((item) => item.status === '待审核').length

  return [
    { title: '当前结果数', value: filteredRows.value.length, hint: '按筛选条件实时变化。' },
    { title: '已发布课题', value: publishedCount, hint: '学生可在选题页中查看。' },
    { title: '待审核课题', value: pendingCount, hint: '需继续走审核流程。' },
  ]
})

async function loadTopics() {
  loading.value = true
  topicRows.value = await getTopicList()
  loading.value = false
}

function resetFilters() {
  filterForm.keyword = ''
  filterForm.source = '全部'
  filterForm.status = '全部'
}

function openDetail(row) {
  currentTopic.value = row
  detailVisible.value = true
}

function goCreate() {
  router.push('/topic/create')
}

function exportList() {
  ElMessage.success(`已导出 ${filteredRows.value.length} 条课题数据`)
}

onMounted(() => {
  loadTopics()
})
</script>

<template>
  <section class="interactive-page" v-loading="loading">
    <div class="page-hero">
      <div>
        <p class="page-eyebrow">P1 Key Interaction</p>
        <h2>课题列表</h2>
        <p class="page-description">支持按关键词、来源和审核状态筛选课题，并可查看课题详情。</p>
      </div>
      <div class="page-actions">
        <el-button @click="loadTopics">刷新数据</el-button>
        <el-button @click="exportList">导出当前数据</el-button>
        <el-button type="primary" @click="goCreate">新增课题</el-button>
      </div>
    </div>

    <StatGrid :items="statItems" />

    <el-card shadow="never" class="block-card">
      <div class="toolbar">
        <el-input v-model="filterForm.keyword" placeholder="搜索课题名称 / 教师 / 专业" clearable />
        <el-select v-model="filterForm.source">
          <el-option label="全部来源" value="全部" />
          <el-option label="教师申报" value="教师申报" />
          <el-option label="学生自拟" value="学生自拟" />
        </el-select>
        <el-select v-model="filterForm.status">
          <el-option label="全部状态" value="全部" />
          <el-option label="已发布" value="已发布" />
          <el-option label="待审核" value="待审核" />
          <el-option label="审核中" value="审核中" />
        </el-select>
        <el-button @click="resetFilters">重置</el-button>
      </div>
    </el-card>

    <el-card shadow="never" class="block-card">
      <template #header>课题清单</template>
      <el-table :data="filteredRows" stripe @row-click="openDetail">
        <el-table-column prop="title" label="课题名称" min-width="240" />
        <el-table-column prop="teacher" label="负责人" min-width="120" />
        <el-table-column prop="source" label="来源" min-width="120" />
        <el-table-column prop="major" label="所属专业" min-width="120" />
        <el-table-column label="状态" min-width="120">
          <template #default="{ row }">
            <el-tag :type="statusTypeMap[row.status] || 'info'" effect="plain">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click.stop="openDetail(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer v-model="detailVisible" title="课题详情" size="42%">
      <el-descriptions v-if="currentTopic" :column="1" border>
        <el-descriptions-item label="课题名称">{{ currentTopic.title }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ currentTopic.teacher }}</el-descriptions-item>
        <el-descriptions-item label="来源">{{ currentTopic.source }}</el-descriptions-item>
        <el-descriptions-item label="所属专业">{{ currentTopic.major }}</el-descriptions-item>
        <el-descriptions-item label="当前状态">{{ currentTopic.status }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="goCreate">继续申报新课题</el-button>
      </template>
    </el-drawer>
  </section>
</template>

<style scoped lang="less">
.interactive-page {
  display: grid;
  gap: 20px;
}

.page-hero {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, fade(@accent, 10%), fade(@cream, 75%));
  border: 1px solid fade(@accent, 18%);
}

.page-eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: @accent;
}

h2 {
  margin: 0;
  color: @ink;
}

.page-description {
  margin: 12px 0 0;
  color: @muted;
}

.page-actions,
.toolbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.block-card {
  border-radius: 22px;
  border-color: @border-color;
}

.toolbar :deep(.el-input),
.toolbar :deep(.el-select) {
  width: 220px;
}

@media (max-width: 1100px) {
  .page-hero {
    flex-direction: column;
  }

  .toolbar {
    display: grid;
  }
}
</style>
