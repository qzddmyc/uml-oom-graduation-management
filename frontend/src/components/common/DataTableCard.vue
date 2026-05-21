<template>
  <el-card shadow="never" class="table-card">
    <template #header>
      <div class="table-card__header">
        <div>
          <strong>{{ title }}</strong>
          <p v-if="description">{{ description }}</p>
        </div>
      </div>
    </template>

    <el-table :data="rows" stripe>
      <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :min-width="column.minWidth || 120">
        <template v-if="column.type === 'tag'" #default="{ row }">
          <el-tag effect="plain">{{ row[column.prop] }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped lang="less">
.table-card {
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
