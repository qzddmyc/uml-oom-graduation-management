<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="status-page">
    <el-result icon="warning" title="当前角色无权限访问该页面" sub-title="请切换角色或返回首页继续浏览。">
      <template #extra>
        <el-button type="primary" @click="router.push('/dashboard')">返回首页</el-button>
        <el-button @click="router.push('/select-role')">切换角色</el-button>
      </template>
    </el-result>
  </section>
</template>

<style scoped lang="less">
.status-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, fade(@cream, 55%), @paper);
}
</style>
