<template>
  <el-card shadow="never" class="info-card">
    <template #header>{{ section.title }}</template>

    <div v-if="section.type === 'timeline'" class="timeline">
      <div v-for="item in section.items" :key="item.title" class="timeline__item">
        <span class="timeline__dot"></span>
        <div>
          <strong>{{ item.title }}</strong>
          <p>{{ item.content }}</p>
          <span>{{ item.meta }}</span>
        </div>
      </div>
    </div>

    <div v-else-if="section.type === 'kv'" class="kv-list">
      <div v-for="item in section.items" :key="item.label" class="kv-list__item">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </div>

    <div v-else-if="section.type === 'progress'" class="progress-list">
      <div v-for="item in section.items" :key="item.label" class="progress-list__item">
        <div class="progress-list__head">
          <span>{{ item.label }}</span>
          <strong>{{ item.percentage }}%</strong>
        </div>
        <el-progress :percentage="item.percentage" :status="item.status" :stroke-width="10" />
      </div>
    </div>

    <div v-else-if="section.type === 'tags'" class="tag-list">
      <el-tag v-for="item in section.items" :key="typeof item === 'string' ? item : item.label" effect="plain">
        {{ typeof item === 'string' ? item : item.label }}
      </el-tag>
    </div>

    <ul v-else class="plain-list">
      <li v-for="item in section.items" :key="typeof item === 'string' ? item : item.title">
        <template v-if="typeof item === 'string'">{{ item }}</template>
        <template v-else>
          <strong>{{ item.title }}</strong>
          <p>{{ item.content }}</p>
        </template>
      </li>
    </ul>
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
.info-card {
  border-radius: 22px;
  border-color: @border-color;
}

.timeline,
.progress-list,
.plain-list {
  display: grid;
  gap: 14px;
}

.timeline__item {
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 12px;

  strong {
    color: @ink;
  }

  p,
  span {
    margin: 6px 0 0;
    color: @muted;
  }

  span {
    font-size: 12px;
    line-height: 1.5;
  }
}

.timeline__dot {
  width: 10px;
  height: 10px;
  margin-top: 7px;
  border-radius: 50%;
  background: @accent;
  box-shadow: 0 0 0 6px fade(@accent, 14%);
}

.kv-list {
  display: grid;
  gap: 12px;
}

.kv-list__item,
.progress-list__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.kv-list__item span,
.plain-list li,
.progress-list__head span {
  color: @muted;
}

.kv-list__item strong,
.progress-list__head strong {
  color: @ink;
}

.tag-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.plain-list {
  margin: 0;
  padding-left: 18px;

  strong {
    color: @ink;
  }

  p {
    margin: 6px 0 0;
    color: @muted;
  }
}
</style>
