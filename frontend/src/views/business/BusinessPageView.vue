<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import InfoPanel from '@/components/common/InfoPanel.vue'
import StatGrid from '@/components/common/StatGrid.vue'
import { getBusinessPageData } from '@/api/business'
import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'

const route = useRoute()
const appStore = useAppStore()

const loading = ref(false)
const pageData = ref(null)
const tableRows = ref([])
const formFields = ref([])
const detailVisible = ref(false)
const detailTitle = ref('查看详情')
const detailRecord = ref({})
const filterState = reactive({})

const pageTitle = computed(() => route.meta?.title || '模块页面')
const pageDescription = computed(() => route.meta?.description || '')

const statusFieldMap = {
  'score-publish': 'approve',
  'defense-score-entry': 'result',
}

const filterKeyAliasMap = {
  keyword: [],
  source: ['source'],
  status: ['status', 'approve', 'result'],
  year: ['year'],
  type: ['material', 'type'],
}

const rowActionMap = {
  'topic-review': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'approve', label: '通过' },
    { key: 'reject', label: '退回', type: 'danger' },
  ],
  'topic-publish': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'publish', label: '发布' },
  ],
  'selection-confirm': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'approve', label: '确认' },
    { key: 'reject', label: '退回', type: 'danger' },
  ],
  'selection-review': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'approve', label: '通过' },
    { key: 'adjust', label: '调剂' },
  ],
  'proposal-review': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'approve', label: '通过' },
    { key: 'reject', label: '退回', type: 'danger' },
  ],
  'midterm-review': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'approve', label: '通过' },
    { key: 'flag', label: '标记风险', type: 'warning' },
  ],
  'paper-review': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'approve', label: '通过' },
    { key: 'reject', label: '退回', type: 'danger' },
  ],
  'review-assign': [
    { key: 'assign', label: '分配', type: 'primary' },
    { key: 'reassign', label: '重分配' },
  ],
  'review-workspace': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'approve', label: '提交评阅' },
  ],
  'defense-group': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'notify', label: '通知成员' },
  ],
  'defense-score-entry': [
    { key: 'detail', label: '详情', type: 'primary' },
    { key: 'save', label: '确认录入' },
  ],
  'score-publish': [
    { key: 'preview', label: '预览', type: 'primary' },
    { key: 'publish', label: '发布' },
  ],
  'score-adjustment': [
    { key: 'approve', label: '通过调整' },
    { key: 'reject', label: '驳回', type: 'danger' },
  ],
  'archive-query': [
    { key: 'detail', label: '查看' },
    { key: 'export', label: '导出' },
  ],
  'archive-export': [
    { key: 'download', label: '下载' },
    { key: 'rerun', label: '重跑' },
  ],
  'system-users': [
    { key: 'toggle', label: '启停' },
    { key: 'detail', label: '详情', type: 'primary' },
  ],
  'system-org': [{ key: 'detail', label: '详情', type: 'primary' }],
  'system-deadlines': [
    { key: 'extend', label: '延期' },
    { key: 'notify', label: '提醒' },
  ],
  'system-rules': [{ key: 'detail', label: '查看', type: 'primary' }],
  'statistics-progress': [{ key: 'detail', label: '查看' }],
  'statistics-topic': [{ key: 'detail', label: '查看' }],
  'statistics-score': [{ key: 'detail', label: '查看' }],
}

const rowActions = computed(() => rowActionMap[route.name] || [])
const hasToolbar = computed(
  () => (pageData.value?.filters?.length || 0) > 0 || (pageData.value?.actions?.length || 0) > 0,
)

const displayedRows = computed(() => {
  if (!pageData.value?.tableSection?.rows) {
    return []
  }

  const filters = pageData.value.filters || []

  return tableRows.value.filter((row) =>
    filters.every((filter) => {
      const rawValue = filterState[filter.key]
      const value = String(rawValue ?? '').trim()

      if (!value || value === '全部') {
        return true
      }

      if (filter.key === 'keyword') {
        return Object.values(row).some((field) =>
          String(field ?? '').toLowerCase().includes(value.toLowerCase()),
        )
      }

      const keys = filterKeyAliasMap[filter.key] || [filter.key]

      return keys.some((key) => String(row[key] ?? '') === value)
    }),
  )
})

function getStatusField(row) {
  return statusFieldMap[route.name] || (row.status !== undefined ? 'status' : row.approve !== undefined ? 'approve' : row.result !== undefined ? 'result' : '')
}

function getStatusValue(row) {
  const key = getStatusField(row)
  return key ? row[key] : ''
}

function setStatusValue(row, value) {
  const key = getStatusField(row)
  if (key) {
    row[key] = value
  }
}

function cloneFields(fields = []) {
  return fields.map((item) => ({ ...item }))
}

function cloneRows(rows = []) {
  return rows.map((item) => ({ ...item }))
}

function resetFilters(filters = []) {
  Object.keys(filterState).forEach((key) => {
    delete filterState[key]
  })

  filters.forEach((item) => {
    filterState[item.key] = item.value ?? ''
  })
}

function syncPageState(data) {
  resetFilters(data?.filters || [])
  tableRows.value = cloneRows(data?.tableSection?.rows || [])
  formFields.value = cloneFields(data?.formSection?.fields || [])
}

async function loadPageData() {
  loading.value = true
  pageData.value = await getBusinessPageData(route.name, {
    taskbookId: route.params.id,
    role: appStore.currentRole,
  })
  syncPageState(pageData.value)
  loading.value = false
}

watch(
  () => [route.name, route.params.id, appStore.currentRole],
  () => {
    loadPageData()
  },
  { immediate: true },
)

function resetToolbar() {
  resetFilters(pageData.value?.filters || [])
}

function openDetail(record, title = '查看详情') {
  detailTitle.value = title
  detailRecord.value = { ...record }
  detailVisible.value = true
}

function showFeedback(message, type = 'success') {
  ElMessage({
    type,
    message,
  })
}

function batchUpdateStatus(waitingStatuses, nextStatus, successMessage) {
  tableRows.value.forEach((row) => {
    if (waitingStatuses.includes(getStatusValue(row))) {
      setStatusValue(row, nextStatus)
    }
  })

  showFeedback(successMessage)
}

async function promptAndSetStatus(row, title, nextStatus, placeholder, successMessage) {
  try {
    const result = await ElMessageBox.prompt(placeholder, title, {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputValue: row.comment || '',
    })

    row.comment = result.value
    setStatusValue(row, nextStatus)
    showFeedback(successMessage)
  } catch {}
}

function handleFormAction(label) {
  if (label.includes('保存') || label.includes('暂存')) {
    showFeedback(`${pageTitle.value}已保存为草稿`)
    return true
  }

  if (label.includes('提交') || label.includes('上传')) {
    showFeedback(`${pageTitle.value}已提交，流程状态已更新`)
    return true
  }

  return false
}

function handleTableAction(label) {
  if (label.includes('导出')) {
    showFeedback(`已导出 ${pageTitle.value} 当前数据`)
    return true
  }

  if (label.includes('刷新')) {
    loadPageData()
    return true
  }

  if (label.includes('批量通过')) {
    batchUpdateStatus(['待审核', '待审批', '待处理'], '已通过', '批量处理完成')
    return true
  }

  if (label.includes('批量退回')) {
    batchUpdateStatus(['待审核', '待审批'], '已退回', '批量退回完成')
    return true
  }

  if (label.includes('处理冲突')) {
    batchUpdateStatus(['冲突待处理'], '已调剂', '冲突记录已标记为调剂处理中')
    return true
  }

  if (label.includes('生成结果名单')) {
    batchUpdateStatus(['教师确认中', '待专业审核', '已调剂'], '已双选成功', '双选结果名单已生成')
    return true
  }

  if (label.includes('自动推荐分配')) {
    batchUpdateStatus(['待确认', '待分配'], '已分配', '已按推荐规则完成分配')
    return true
  }

  if (label.includes('生成发布批次')) {
    tableRows.value.unshift({
      batch: `新增批次 ${tableRows.value.length + 1}`,
      major: '计算机科学与通信工程',
      topicCount: 6,
      timeRange: '06-01 至 06-03',
      status: '待发布',
    })
    showFeedback('已新增一个发布批次')
    return true
  }

  if (label.includes('发布成绩')) {
    tableRows.value.forEach((row) => {
      if (row.approve) {
        row.approve = '已发布'
      }
    })
    showFeedback('成绩已发布')
    return true
  }

  if (label.includes('新增账号')) {
    tableRows.value.unshift({
      name: '新建账号',
      roleLabel: '教学秘书',
      orgName: '计算机科学与通信工程学院',
      title: '新增角色',
      status: '启用',
    })
    showFeedback('已新增一个账号')
    return true
  }

  if (label.includes('新增节点')) {
    tableRows.value.unshift({
      stage: '新增节点',
      deadline: '2026-07-01 18:00',
      owner: '教学秘书',
    })
    showFeedback('已新增一个时间节点')
    return true
  }

  if (label.includes('创建导出任务')) {
    tableRows.value.unshift({
      task: `新导出任务 ${tableRows.value.length + 1}`,
      type: '材料导出',
      createdAt: '刚刚',
      status: '处理中',
    })
    showFeedback('导出任务已创建')
    return true
  }

  return false
}

function handlePageAction(action) {
  const label = action.label

  if (handleFormAction(label) || handleTableAction(label)) {
    return
  }

  if (label.includes('预览')) {
    openDetail(
      {
        页面: pageTitle.value,
        操作: label,
        说明: '当前为预览状态，可继续查看页面配置与业务信息。',
      },
      label,
    )
    return
  }

  if (label.includes('保存规则')) {
    showFeedback('评分规则已保存')
    return
  }

  if (label.includes('重置权重')) {
    showFeedback('规则权重已恢复默认值')
    return
  }

  showFeedback(`${label} 已执行`)
}

async function handleRowAction(actionKey, row) {
  if (actionKey === 'detail' || actionKey === 'preview') {
    openDetail(row)
    return
  }

  if (actionKey === 'approve') {
    await promptAndSetStatus(row, '通过处理', '已通过', '请输入处理意见', '操作已通过')
    return
  }

  if (actionKey === 'reject') {
    await promptAndSetStatus(row, '退回处理', '已退回', '请输入退回原因', '已退回处理')
    return
  }

  if (actionKey === 'adjust') {
    setStatusValue(row, '已调剂')
    showFeedback('已标记为调剂处理中')
    return
  }

  if (actionKey === 'publish') {
    setStatusValue(row, '已发布')
    if (row.approve !== undefined) {
      row.approve = '已发布'
    }
    showFeedback('发布成功')
    return
  }

  if (actionKey === 'assign') {
    setStatusValue(row, '已分配')
    showFeedback('已完成分配')
    return
  }

  if (actionKey === 'reassign') {
    setStatusValue(row, '待重新分配')
    showFeedback('已标记为待重新分配')
    return
  }

  if (actionKey === 'notify') {
    showFeedback('已发送提醒通知')
    return
  }

  if (actionKey === 'flag') {
    setStatusValue(row, '风险关注')
    showFeedback('已标记为风险关注', 'warning')
    return
  }

  if (actionKey === 'save') {
    setStatusValue(row, '已录入')
    if (row.result !== undefined) {
      row.result = '已录入'
    }
    showFeedback('成绩已确认录入')
    return
  }

  if (actionKey === 'export') {
    showFeedback('当前记录已导出')
    return
  }

  if (actionKey === 'download') {
    setStatusValue(row, '已下载')
    showFeedback('导出文件已下载')
    return
  }

  if (actionKey === 'rerun') {
    setStatusValue(row, '处理中')
    showFeedback('导出任务已重新执行')
    return
  }

  if (actionKey === 'toggle') {
    row.status = row.status === '启用' ? '停用' : '启用'
    showFeedback(`账号已${row.status === '启用' ? '启用' : '停用'}`)
    return
  }

  if (actionKey === 'extend') {
    row.deadline = `${row.deadline}（已延期）`
    showFeedback('时间节点已延期')
  }
}

function getFieldComponent(field) {
  const text = String(field.value ?? '')
  return field.span === 2 || text.length > 24 ? 'textarea' : 'input'
}
</script>

<template>
  <section class="page-section" v-loading="loading">
    <div class="page-hero">
      <div>
        <p class="page-eyebrow">{{ route.meta?.navGroup || '业务模块' }}</p>
        <h2>{{ pageTitle }}</h2>
        <p class="page-description">{{ pageDescription }}</p>
      </div>
      <div class="page-hero__aside">
        <el-tag type="warning" effect="plain">{{ appStore.displayRole }}</el-tag>
      </div>
    </div>

    <StatGrid v-if="pageData?.stats?.length" :items="pageData.stats" />

    <el-card v-if="hasToolbar" shadow="never" class="toolbar-card">
      <div class="toolbar">
        <div v-if="pageData?.filters?.length" class="toolbar__filters">
          <div v-for="filter in pageData.filters" :key="filter.key" class="toolbar__item">
            <span class="toolbar__label">{{ filter.label }}</span>
            <el-input
              v-if="filter.type === 'input'"
              v-model="filterState[filter.key]"
              :placeholder="filter.label"
              clearable
            />
            <el-select v-else v-model="filterState[filter.key]">
              <el-option
                v-for="option in filter.options"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </div>
        </div>

        <div class="toolbar__actions">
          <el-button v-if="pageData?.filters?.length" @click="resetToolbar">重置筛选</el-button>
          <el-button
            v-for="action in pageData?.actions || []"
            :key="action.label"
            :type="action.type || 'default'"
            @click="handlePageAction(action)"
          >
            {{ action.label }}
          </el-button>
        </div>
      </div>
    </el-card>

    <div class="page-layout">
      <div class="page-layout__main">
        <el-card v-if="formFields.length" shadow="never" class="page-card">
          <template #header>
            <div>
              <strong>{{ pageData?.formSection?.title }}</strong>
              <p v-if="pageData?.formSection?.description">{{ pageData.formSection.description }}</p>
            </div>
          </template>

          <el-form label-position="top">
            <el-row :gutter="14">
              <el-col v-for="field in formFields" :key="field.label" :span="field.span === 2 ? 24 : 12">
                <el-form-item :label="field.label">
                  <el-input
                    v-if="getFieldComponent(field) === 'input'"
                    v-model="field.value"
                  />
                  <el-input
                    v-else
                    v-model="field.value"
                    type="textarea"
                    :rows="3"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <el-card v-if="pageData?.tableSection" shadow="never" class="page-card">
          <template #header>
            <div>
              <strong>{{ pageData.tableSection.title }}</strong>
              <p v-if="pageData.tableSection.description">{{ pageData.tableSection.description }}</p>
            </div>
          </template>

          <el-table :data="displayedRows" stripe>
            <el-table-column
              v-for="column in pageData.tableSection.columns"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.minWidth || 120"
            >
              <template v-if="column.type === 'tag'" #default="{ row }">
                <el-tag effect="plain">{{ row[column.prop] }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column
              v-if="rowActions.length"
              label="操作"
              min-width="220"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button
                  v-for="action in rowActions"
                  :key="action.key"
                  link
                  :type="action.type || 'default'"
                  @click="handleRowAction(action.key, row)"
                >
                  {{ action.label }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <div v-if="pageData?.sideSections?.length" class="page-layout__side">
        <InfoPanel
          v-for="section in pageData.sideSections"
          :key="section.title"
          :section="section"
        />
      </div>
    </div>

    <el-drawer v-model="detailVisible" :title="detailTitle" size="42%">
      <el-descriptions :column="1" border>
        <el-descriptions-item
          v-for="(value, key) in detailRecord"
          :key="key"
          :label="key"
        >
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </section>
</template>

<style scoped lang="less">
.page-section {
  display: grid;
  gap: 20px;
}

.page-hero {
  display: flex;
  justify-content: space-between;
  gap: 16px;
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
  font-size: 30px;
  color: @ink;
}

.page-description {
  margin: 12px 0 0;
  max-width: 680px;
  color: @muted;
  line-height: 1.75;
}

.page-hero__aside {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.toolbar-card,
.page-card {
  border-radius: 22px;
  border-color: @border-color;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-end;
}

.toolbar__filters {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.toolbar__item {
  display: grid;
  gap: 8px;
}

.toolbar__label {
  font-size: 13px;
  color: @muted;
}

.toolbar__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.page-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.9fr);
  gap: 20px;
}

.page-layout__main,
.page-layout__side {
  display: grid;
  gap: 20px;
}

:deep(.el-card__header) {
  strong {
    color: @ink;
    font-size: 16px;
  }

  p {
    margin: 8px 0 0;
    color: @muted;
    font-size: 13px;
  }
}

@media (max-width: 1100px) {
  .page-hero,
  .page-layout,
  .toolbar,
  .toolbar__filters {
    grid-template-columns: 1fr;
    display: grid;
  }

  .page-hero__aside {
    align-items: flex-start;
  }
}
</style>
