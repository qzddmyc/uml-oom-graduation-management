<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import StatGrid from '@/components/common/StatGrid.vue'
import { getBusinessPageData } from '@/api/business'
import { getScoringRules } from '@/api/system'

const loading = ref(false)
const rows = ref([])
const weights = ref({
  supervisor: 40,
  review: 20,
  defense: 40,
})

const weightTotal = computed(
  () => weights.value.supervisor + weights.value.review + weights.value.defense,
)

const statItems = computed(() => [
  { title: '已汇总成绩', value: rows.value.filter((item) => item.status === '已汇总').length, hint: '当前已完成总评计算的学生数。' },
  { title: '待复核成绩', value: rows.value.filter((item) => item.status === '待复核').length, hint: '分差较大的学生会自动标记。' },
  {
    title: '当前均分',
    value:
      rows.value.length > 0
        ? (rows.value.reduce((sum, item) => sum + Number(item.final || 0), 0) / rows.value.length).toFixed(1)
        : '0',
    hint: '按当前权重与分数实时计算。',
  },
])

function recalculateRows() {
  const total = weightTotal.value

  if (total !== 100) {
    ElMessage.warning('评分权重总和必须为 100%')
    return
  }

  rows.value = rows.value.map((item) => {
    const finalScore =
      (item.supervisor * weights.value.supervisor +
        item.review * weights.value.review +
        item.defense * weights.value.defense) /
      100
    const maxDiff = Math.max(item.supervisor, item.review, item.defense) - Math.min(item.supervisor, item.review, item.defense)

    return {
      ...item,
      final: Number(finalScore.toFixed(1)),
      status: maxDiff >= 10 ? '待复核' : '已汇总',
    }
  })

  ElMessage.success('成绩汇总已重新计算')
}

function exportScores() {
  ElMessage.success('成绩总表已导出')
}

function resetWeights() {
  weights.value = {
    supervisor: 40,
    review: 20,
    defense: 40,
  }
  recalculateRows()
}

async function loadData() {
  loading.value = true
  const [pageData, rules] = await Promise.all([
    getBusinessPageData('score-summary'),
    getScoringRules(),
  ])

  rows.value = pageData.tableSection.rows.map((item) => ({ ...item }))
  weights.value = {
    supervisor: Math.round(rules[0].weight * 100),
    review: Math.round(rules[1].weight * 100),
    defense: Math.round(rules[2].weight * 100),
  }
  loading.value = false
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <section class="interactive-page" v-loading="loading">
    <div class="page-hero">
      <div>
        <p class="page-eyebrow">P2 Key Interaction</p>
        <h2>成绩汇总</h2>
        <p class="page-description">支持调整评分权重、编辑分项成绩，并实时重新计算总评与复核状态。</p>
      </div>
      <div class="page-actions">
        <el-button @click="resetWeights">恢复默认权重</el-button>
        <el-button @click="exportScores">导出成绩表</el-button>
        <el-button type="primary" @click="recalculateRows">执行汇总</el-button>
      </div>
    </div>

    <StatGrid :items="statItems" />

    <div class="page-layout">
      <el-card shadow="never" class="block-card">
        <template #header>成绩汇总表</template>
        <el-table :data="rows" stripe>
          <el-table-column prop="student" label="学生" min-width="120" />
          <el-table-column label="指导成绩" min-width="140">
            <template #default="{ row }">
              <el-input-number v-model="row.supervisor" :min="0" :max="100" />
            </template>
          </el-table-column>
          <el-table-column label="评阅成绩" min-width="140">
            <template #default="{ row }">
              <el-input-number v-model="row.review" :min="0" :max="100" />
            </template>
          </el-table-column>
          <el-table-column label="答辩成绩" min-width="140">
            <template #default="{ row }">
              <el-input-number v-model="row.defense" :min="0" :max="100" />
            </template>
          </el-table-column>
          <el-table-column prop="final" label="总评" min-width="100" />
          <el-table-column label="状态" min-width="120">
            <template #default="{ row }">
              <el-tag effect="plain" :type="row.status === '待复核' ? 'warning' : 'success'">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow="never" class="block-card">
        <template #header>评分规则</template>
        <div class="weight-item">
          <span>指导教师评分</span>
          <el-slider v-model="weights.supervisor" :min="0" :max="100" show-input />
        </div>
        <div class="weight-item">
          <span>评阅教师评分</span>
          <el-slider v-model="weights.review" :min="0" :max="100" show-input />
        </div>
        <div class="weight-item">
          <span>答辩评分</span>
          <el-slider v-model="weights.defense" :min="0" :max="100" show-input />
        </div>
        <el-alert
          :type="weightTotal === 100 ? 'success' : 'warning'"
          :closable="false"
          show-icon
          :title="`当前权重总和：${weightTotal}%`"
          description="仅当权重总和为 100% 时，才允许执行成绩汇总。"
        />
      </el-card>
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

.page-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.page-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.95fr);
  gap: 20px;
}

.block-card {
  border-radius: 22px;
  border-color: @border-color;
}

.weight-item {
  display: grid;
  gap: 10px;
  margin-bottom: 18px;

  span {
    color: @ink;
  }
}

@media (max-width: 1100px) {
  .page-hero,
  .page-layout {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
