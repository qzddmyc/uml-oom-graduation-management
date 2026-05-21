<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="status-page">
    <el-result icon="info" title="页面不存在" sub-title="你访问的地址尚未创建或已经调整。">
      <template #extra>
        <el-button type="primary" @click="router.push('/dashboard')">前往首页</el-button>
      </template>
    </el-result>
  </section>
</template>

<style scoped lang="less">
.status-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, fade(@cream, 45%), @paper);
}
</style>
