<template>
  <el-card shadow="never" class="form-card">
    <template #header>
      <div>
        <strong>{{ section.title }}</strong>
        <p v-if="section.description">{{ section.description }}</p>
      </div>
    </template>

    <el-descriptions :column="2" border>
      <el-descriptions-item v-for="field in section.fields" :key="field.label" :label="field.label" :span="field.span || 1">
        {{ field.value }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script setup>
defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="less">
.form-card {
  border-radius: 22px;
  border-color: @border-color;

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
}
</style>
