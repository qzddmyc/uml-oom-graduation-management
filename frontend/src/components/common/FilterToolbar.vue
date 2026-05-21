<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
  actions: {
    type: Array,
    default: () => [],
  },
})

const formState = reactive(
  props.filters.reduce((result, item) => {
    result[item.key] = item.value ?? ''
    return result
  }, {}),
)

watch(
  () => props.filters,
  (filters) => {
    Object.keys(formState).forEach((key) => {
      delete formState[key]
    })

    filters.forEach((item) => {
      formState[item.key] = item.value ?? ''
    })
  },
  { deep: true },
)
</script>

<template>
  <el-card v-if="filters.length || actions.length" shadow="never" class="toolbar-card">
    <div class="toolbar">
      <div class="toolbar__filters">
        <div v-for="item in filters" :key="item.key" class="toolbar__item">
          <span class="toolbar__label">{{ item.label }}</span>
          <el-input v-if="item.type === 'input'" v-model="formState[item.key]" :placeholder="item.label" />
          <el-select v-else-if="item.type === 'select'" v-model="formState[item.key]">
            <el-option v-for="option in item.options" :key="option" :label="option" :value="option" />
          </el-select>
          <el-date-picker v-else v-model="formState[item.key]" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
        </div>
      </div>

      <div class="toolbar__actions">
        <el-button v-for="action in actions" :key="action.label" :type="action.type || 'default'">
          {{ action.label }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="less">
.toolbar-card {
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

@media (max-width: 1100px) {
  .toolbar,
  .toolbar__filters {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
