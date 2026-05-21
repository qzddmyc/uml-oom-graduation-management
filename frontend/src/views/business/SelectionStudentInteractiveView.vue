<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import StatGrid from '@/components/common/StatGrid.vue'
import { getSelectionRecords, getTopicList } from '@/api/topic'

const loading = ref(false)
const availableTopics = ref([])
const wishList = ref([])
const detailVisible = ref(false)
const currentTopic = ref(null)
const submitted = ref(false)

const statItems = computed(() => [
  { title: '可选课题', value: availableTopics.value.length, hint: '仅展示当前批次开放课题。' },
  { title: '已选志愿', value: wishList.value.length, hint: '最多保留 3 个志愿。' },
  { title: '当前状态', value: submitted.value ? '教师确认中' : '待提交', hint: '提交后将进入教师确认阶段。' },
])

const canSubmit = computed(() => wishList.value.length > 0)

async function loadData() {
  loading.value = true
  availableTopics.value = (await getTopicList()).filter((item) => item.status === '已发布')
  wishList.value = (await getSelectionRecords())
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .map((item) => ({
      id: item.id,
      topicTitle: item.topicTitle,
      priority: item.priority,
      status: item.status,
    }))
  submitted.value = wishList.value.some((item) => item.status !== '待提交')
  loading.value = false
}

function openTopic(row) {
  currentTopic.value = row
  detailVisible.value = true
}

function addWish(topic) {
  if (wishList.value.some((item) => item.topicTitle === topic.title)) {
    ElMessage.warning('该课题已在当前志愿列表中')
    return
  }

  if (wishList.value.length >= 3) {
    ElMessage.warning('最多只能选择 3 个志愿')
    return
  }

  wishList.value.push({
    id: `wish-${Date.now()}`,
    topicTitle: topic.title,
    priority: wishList.value.length + 1,
    status: '待提交',
  })
}

function removeWish(index) {
  wishList.value.splice(index, 1)
  wishList.value = wishList.value.map((item, order) => ({
    ...item,
    priority: order + 1,
  }))
}

function moveWish(index, offset) {
  const target = index + offset
  if (target < 0 || target >= wishList.value.length) {
    return
  }

  const cloned = wishList.value.slice()
  const [current] = cloned.splice(index, 1)
  cloned.splice(target, 0, current)
  wishList.value = cloned.map((item, order) => ({
    ...item,
    priority: order + 1,
  }))
}

function submitWishList() {
  wishList.value = wishList.value.map((item) => ({
    ...item,
    status: '教师确认中',
  }))
  submitted.value = true
  ElMessage.success('志愿顺序已提交，等待教师确认')
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <section class="interactive-page" v-loading="loading">
    <div class="page-hero">
      <div>
        <p class="page-eyebrow">P1 Key Interaction</p>
        <h2>学生选题</h2>
        <p class="page-description">支持添加志愿、调整顺序、删除志愿并提交到教师确认环节。</p>
      </div>
      <el-button type="primary" :disabled="!canSubmit" @click="submitWishList">提交志愿顺序</el-button>
    </div>

    <StatGrid :items="statItems" />

    <div class="page-layout">
      <el-card shadow="never" class="block-card">
        <template #header>可选课题池</template>
        <el-table :data="availableTopics" stripe>
          <el-table-column prop="title" label="课题名称" min-width="240" />
          <el-table-column prop="teacher" label="负责人" min-width="120" />
          <el-table-column prop="source" label="来源" min-width="120" />
          <el-table-column prop="major" label="专业" min-width="120" />
          <el-table-column label="操作" min-width="160" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openTopic(row)">详情</el-button>
              <el-button link @click="addWish(row)">加入志愿</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow="never" class="block-card">
        <template #header>我的志愿顺序</template>
        <div class="wish-list">
          <div v-for="(item, index) in wishList" :key="item.id" class="wish-item">
            <div>
              <strong>第 {{ item.priority }} 志愿：{{ item.topicTitle }}</strong>
              <p>{{ item.status }}</p>
            </div>
            <div class="wish-actions">
              <el-button link :disabled="index === 0" @click="moveWish(index, -1)">上移</el-button>
              <el-button link :disabled="index === wishList.length - 1" @click="moveWish(index, 1)">下移</el-button>
              <el-button link type="danger" @click="removeWish(index)">移除</el-button>
            </div>
          </div>
          <el-empty v-if="!wishList.length" description="暂未选择志愿" />
        </div>
      </el-card>
    </div>

    <el-alert type="info" :closable="false" show-icon title="规则说明" description="每名学生最多填报 3 个志愿，提交后将进入教师确认与专业审核环节。" />

    <el-drawer v-model="detailVisible" title="课题详情" size="42%">
      <el-descriptions v-if="currentTopic" :column="1" border>
        <el-descriptions-item label="课题名称">{{ currentTopic.title }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ currentTopic.teacher }}</el-descriptions-item>
        <el-descriptions-item label="课题来源">{{ currentTopic.source }}</el-descriptions-item>
        <el-descriptions-item label="所属专业">{{ currentTopic.major }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ currentTopic.status }}</el-descriptions-item>
      </el-descriptions>
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

.page-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.block-card {
  border-radius: 22px;
  border-color: @border-color;
}

.wish-list {
  display: grid;
  gap: 14px;
}

.wish-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, fade(@accent, 5%), fade(@cream, 38%));
  border: 1px solid fade(@accent, 12%);

  strong {
    color: @ink;
  }

  p {
    margin: 8px 0 0;
    color: @muted;
  }
}

.wish-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 1100px) {
  .page-hero,
  .page-layout,
  .wish-item {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
