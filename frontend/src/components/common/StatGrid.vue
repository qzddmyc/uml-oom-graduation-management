<template>
  <div class="stat-grid">
    <el-card v-for="item in items" :key="item.title" shadow="never" class="stat-card">
      <p class="stat-card__label">{{ item.title }}</p>
      <h3>{{ item.value }}</h3>
      <p class="stat-card__hint">{{ item.hint }}</p>
    </el-card>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped lang="less">
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.stat-card {
  border-radius: 22px;
  border-color: @border-color;
  background: fade(#fffdf8, 84%);

  h3 {
    margin: 14px 0 10px;
    font-size: 30px;
    color: @ink;
  }
}

.stat-card__label,
.stat-card__hint {
  color: @ink-soft;
}

@media (max-width: 1100px) {
  .stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
