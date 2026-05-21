<script setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import FormPreviewCard from '@/components/common/FormPreviewCard.vue'
import InfoPanel from '@/components/common/InfoPanel.vue'
import StatGrid from '@/components/common/StatGrid.vue'

const draftState = ref('未保存')
const keywordInput = ref('')
const attachmentInput = ref('')

const form = reactive({
  title: '智能选题推荐平台设计与实现',
  source: '教师申报',
  major: '计算机科学与通信工程',
  capacity: 1,
  goal: '实现选题推荐、审核跟踪与过程管理展示。',
  outcome: '系统原型、设计文档、界面截图。',
  background: '围绕毕业设计流程管理的课程原型建设。',
})

const keywords = ref(['推荐系统', '流程管理'])
const attachments = ref(['任务说明.docx', '流程图.drawio'])

const statItems = computed(() => [
  { title: '已填写字段', value: 7, hint: `当前草稿状态：${draftState.value}` },
  { title: '关键词数', value: keywords.value.length, hint: '建议保留 2-5 个核心关键词。' },
  { title: '附件数', value: attachments.value.length, hint: '便于后续审核时查看参考材料。' },
])

const previewSection = computed(() => ({
  title: '申报预览',
  description: '右侧实时预览当前表单内容。',
  fields: [
    { label: '课题名称', value: form.title, span: 2 },
    { label: '课题来源', value: form.source },
    { label: '适用专业', value: form.major },
    { label: '适用人数', value: `${form.capacity} 人` },
    { label: '研究背景', value: form.background, span: 2 },
    { label: '主要目标', value: form.goal, span: 2 },
    { label: '预期成果', value: form.outcome, span: 2 },
  ],
}))

function addKeyword() {
  const value = keywordInput.value.trim()
  if (!value || keywords.value.includes(value)) {
    return
  }
  keywords.value.push(value)
  keywordInput.value = ''
}

function removeKeyword(tag) {
  keywords.value = keywords.value.filter((item) => item !== tag)
}

function addAttachment() {
  const value = attachmentInput.value.trim()
  if (!value || attachments.value.includes(value)) {
    return
  }
  attachments.value.push(value)
  attachmentInput.value = ''
}

function removeAttachment(tag) {
  attachments.value = attachments.value.filter((item) => item !== tag)
}

function saveDraft() {
  draftState.value = '草稿已保存'
  ElMessage.success('课题草稿已保存')
}

function submitTopic() {
  draftState.value = '已提交审核'
  ElMessage.success('课题已提交，等待专业负责人审核')
}
</script>

<template>
  <section class="interactive-page">
    <div class="page-hero">
      <div>
        <p class="page-eyebrow">P1 Key Interaction</p>
        <h2>课题申报</h2>
        <p class="page-description">支持在线填写课题信息，并直接完成暂存草稿与提交审核。</p>
      </div>
      <div class="page-actions">
        <el-button @click="saveDraft">暂存草稿</el-button>
        <el-button type="primary" @click="submitTopic">提交申报</el-button>
      </div>
    </div>

    <StatGrid :items="statItems" />

    <div class="page-layout">
      <el-card shadow="never" class="block-card">
        <template #header>课题申报表单</template>
        <el-form label-position="top">
          <el-form-item label="课题名称">
            <el-input v-model="form.title" />
          </el-form-item>
          <div class="grid-two">
            <el-form-item label="课题来源">
              <el-select v-model="form.source">
                <el-option label="教师申报" value="教师申报" />
                <el-option label="学生自拟" value="学生自拟" />
              </el-select>
            </el-form-item>
            <el-form-item label="适用专业">
              <el-input v-model="form.major" />
            </el-form-item>
          </div>
          <el-form-item label="适用人数">
            <el-input-number v-model="form.capacity" :min="1" :max="3" />
          </el-form-item>
          <el-form-item label="研究背景">
            <el-input v-model="form.background" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="主要目标">
            <el-input v-model="form.goal" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="预期成果">
            <el-input v-model="form.outcome" type="textarea" :rows="3" />
          </el-form-item>
        </el-form>

        <div class="tag-editor">
          <div class="tag-editor__head">
            <strong>关键词</strong>
            <div>
              <el-input v-model="keywordInput" placeholder="新增关键词" class="tag-input" @keyup.enter="addKeyword" />
              <el-button @click="addKeyword">添加</el-button>
            </div>
          </div>
          <div class="tag-list">
            <el-tag v-for="tag in keywords" :key="tag" closable effect="plain" @close="removeKeyword(tag)">{{ tag }}</el-tag>
          </div>
        </div>

        <div class="tag-editor">
          <div class="tag-editor__head">
            <strong>附件列表</strong>
            <div>
              <el-input v-model="attachmentInput" placeholder="新增附件名" class="tag-input" @keyup.enter="addAttachment" />
              <el-button @click="addAttachment">添加</el-button>
            </div>
          </div>
          <div class="tag-list">
            <el-tag v-for="tag in attachments" :key="tag" closable effect="plain" @close="removeAttachment(tag)">{{ tag }}</el-tag>
          </div>
        </div>
      </el-card>

      <div class="side-panel">
        <FormPreviewCard :section="previewSection" />
        <InfoPanel
          :section="{
            title: '申报提醒',
            type: 'list',
            items: ['提交后进入专业负责人审核。', '课题标题建议聚焦业务问题与成果形式。', '附件可先填写当前文件名，后续再补充正式材料。'],
          }"
        />
      </div>
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
}

.page-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.95fr);
  gap: 20px;
}

.block-card,
.side-panel {
  display: grid;
  gap: 20px;
}

.block-card {
  border-radius: 22px;
  border-color: @border-color;
}

.grid-two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.tag-editor {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.tag-editor__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;

  > div {
    display: flex;
    gap: 10px;
  }
}

.tag-input {
  width: 220px;
}

.tag-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 1100px) {
  .page-hero,
  .page-layout,
  .grid-two,
  .tag-editor__head {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
