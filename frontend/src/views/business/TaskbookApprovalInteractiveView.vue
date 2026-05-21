<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import InfoPanel from '@/components/common/InfoPanel.vue'
import StatGrid from '@/components/common/StatGrid.vue'
import { getBusinessPageData } from '@/api/business'

const router = useRouter()
const loading = ref(false)
const rows = ref([])

const statItems = computed(() => [
  { title: '待审批任务书', value: rows.value.filter((item) => item.status === '待审批').length, hint: '需要当前批次尽快处理。' },
  { title: '已通过任务书', value: rows.value.filter((item) => item.status === '已通过').length, hint: '可进入开题阶段。' },
  { title: '退回修改', value: rows.value.filter((item) => item.status === '退回修改').length, hint: '等待学生重新提交。' },
])

async function loadRows() {
  loading.value = true
  const pageData = await getBusinessPageData('taskbook-approval')
  rows.value = pageData.tableSection.rows.map((item, index) => ({
    id: index + 18,
    ...item,
  }))
  loading.value = false
}

async function approveRow(row) {
  try {
    const result = await ElMessageBox.prompt('请输入审批意见', '通过任务书', {
      inputValue: '同意，进入开题阶段',
      confirmButtonText: '确认通过',
      cancelButtonText: '取消',
    })

    row.status = '已通过'
    row.comment = result.value
    ElMessage.success('任务书已通过')
  } catch {}
}

async function rejectRow(row) {
  try {
    const result = await ElMessageBox.prompt('请输入退回原因', '退回修改', {
      inputPlaceholder: '例如：请补充预期成果与时间安排',
      confirmButtonText: '确认退回',
      cancelButtonText: '取消',
    })

    row.status = '退回修改'
    row.comment = result.value
    ElMessage.warning('任务书已退回修改')
  } catch {}
}

function batchApprove() {
  rows.value.forEach((item) => {
    if (item.status === '待审批') {
      item.status = '已通过'
      item.comment = '批量通过，进入开题阶段'
    }
  })
  ElMessage.success('所有待审批任务书已批量通过')
}

function openDetail(row) {
  router.push(`/taskbook/detail/${row.id}`)
}

onMounted(() => {
  loadRows()
})
</script>

<template>
  <section class="interactive-page" v-loading="loading">
    <div class="page-hero">
      <div>
        <p class="page-eyebrow">P1 Key Interaction</p>
        <h2>任务书审批</h2>
        <p class="page-description">支持逐条审批、退回修改、批量通过，并可跳转查看任务书详情。</p>
      </div>
      <el-button type="primary" @click="batchApprove">批量通过待审批</el-button>
    </div>

    <StatGrid :items="statItems" />

    <div class="page-layout">
      <el-card shadow="never" class="block-card">
        <template #header>审批队列</template>
        <el-table :data="rows" stripe>
          <el-table-column prop="student" label="学生" min-width="120" />
          <el-table-column prop="material" label="材料名称" min-width="140" />
          <el-table-column prop="submitTime" label="提交时间" min-width="160" />
          <el-table-column label="状态" min-width="120">
            <template #default="{ row }">
              <el-tag effect="plain">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="备注" min-width="220" />
          <el-table-column label="操作" min-width="240" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openDetail(row)">详情</el-button>
              <el-button link :disabled="row.status !== '待审批'" @click="approveRow(row)">通过</el-button>
              <el-button link type="danger" :disabled="row.status !== '待审批'" @click="rejectRow(row)">退回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <InfoPanel
        :section="{
          title: '审批关注点',
          type: 'list',
          items: ['课题目标是否清晰', '时间安排是否可执行', '成果形式是否符合要求'],
        }"
      />
    </div>
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
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.9fr);
  gap: 20px;
}

.block-card {
  border-radius: 22px;
  border-color: @border-color;
}

@media (max-width: 1100px) {
  .page-hero,
  .page-layout {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
