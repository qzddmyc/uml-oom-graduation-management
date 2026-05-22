<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, Expand, SwitchButton } from '@element-plus/icons-vue'
import { APP_TITLE } from '@/constants/app'
import { ROLE_OPTIONS } from '@/constants/roles'
import { featureRoutes } from '@/router/routes'
import { useAppStore } from '@/stores/app'
import brandMark from '@/assets/brand-mark.svg'
import { logout, switchRole } from '@/api/auth'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const isMobile = ref(false)
const mobileSidebarOpen = ref(false)

function updateViewport() {
  isMobile.value = window.innerWidth <= 1100

  if (!isMobile.value) {
    mobileSidebarOpen.value = false
  }
}

function hasAccess(roles = []) {
  if (!roles.length) {
    return true
  }

  return roles.includes(appStore.currentRole)
}

function getRoutePath(item) {
  return `/${String(item.path).replace(/\/:.*$/, '')}`
}

const menuGroups = computed(() => {
  const groupMap = new Map()

  featureRoutes
    .filter((item) => !item.meta?.hidden && hasAccess(item.meta?.roles))
    .forEach((item) => {
      const groupName = item.meta?.navGroup || '其他'

      if (!groupMap.has(groupName)) {
        groupMap.set(groupName, [])
      }

      groupMap.get(groupName).push(item)
    })

  return Array.from(groupMap.entries()).map(([title, items]) => ({
    title,
    items,
  }))
})

const currentRoute = computed(() => featureRoutes.find((item) => item.name === route.name))
const shouldRenderSidebar = computed(() => isMobile.value || !appStore.sidebarCollapsed)
const sidebarVisible = computed(() => (isMobile.value ? mobileSidebarOpen.value : !appStore.sidebarCollapsed))

const breadcrumbItems = computed(() => {
  if (!currentRoute.value) {
    return []
  }

  return [currentRoute.value.meta?.navGroup, currentRoute.value.meta?.title].filter(Boolean)
})

async function handleRoleChange(value) {
  const session = await switchRole({
    role: value,
    userName: appStore.userName,
  })
  appStore.setSession(session)

  if (route.meta?.roles?.length && !route.meta.roles.includes(session.role)) {
    router.push('/dashboard')
  }
}

async function handleLogout() {
  await logout()
  appStore.clearRole()
  router.replace('/login')
}

function handleSidebarToggle() {
  if (isMobile.value) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
    return
  }

  appStore.toggleSidebar()
}

function closeMobileSidebar() {
  if (isMobile.value) {
    mobileSidebarOpen.value = false
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMobileSidebar()
  },
)

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
})
</script>

<template>
  <div
    class="app-shell"
    :class="{
      'app-shell--sidebar-hidden': !isMobile && appStore.sidebarCollapsed,
      'app-shell--mobile-menu-open': isMobile && mobileSidebarOpen,
    }"
  >
    <button
      v-if="isMobile && mobileSidebarOpen"
      type="button"
      class="app-shell__mask"
      aria-label="关闭侧边导航"
      @click="closeMobileSidebar"
    ></button>

    <aside v-if="shouldRenderSidebar" class="app-shell__aside">
      <div class="brand">
        <div class="brand__mark">
          <img :src="brandMark" alt="系统标识" />
        </div>
        <div class="brand__text">
          <strong>{{ APP_TITLE }}</strong>
          <span>流程驱动的毕设管理原型</span>
        </div>
      </div>

      <el-scrollbar class="app-shell__nav">
        <section v-for="group in menuGroups" :key="group.title" class="nav-group">
          <p class="nav-group__title">{{ group.title }}</p>
          <router-link
            v-for="item in group.items"
            :key="item.name"
            :to="getRoutePath(item)"
            class="nav-link"
            :class="{ 'is-active': route.name === item.name }"
            @click="closeMobileSidebar"
          >
            <span class="nav-link__dot"></span>
            <span>{{ item.meta.title }}</span>
          </router-link>
        </section>
      </el-scrollbar>
    </aside>

    <div class="app-shell__main">
      <header class="app-shell__header">
        <div class="header-left">
          <el-button circle text class="header-icon" @click="handleSidebarToggle">
            <el-icon>
              <Fold v-if="sidebarVisible" />
              <Expand v-else />
            </el-icon>
          </el-button>

          <div>
            <div class="header-breadcrumb">
              <span>首页</span>
              <span v-for="item in breadcrumbItems" :key="item">/ {{ item }}</span>
            </div>
            <h1>{{ currentRoute?.meta?.title || '系统首页' }}</h1>
          </div>
        </div>

        <div class="header-right">
          <el-select
            :model-value="appStore.currentRole"
            class="role-select"
            placeholder="切换角色"
            @change="handleRoleChange"
          >
            <el-option
              v-for="item in ROLE_OPTIONS"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
          <el-button text class="header-logout" @click="handleLogout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出</span>
          </el-button>
        </div>
      </header>

      <main class="app-shell__content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-shell {
  height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, fade(@accent, 12%), transparent 30%),
    linear-gradient(180deg, fade(@cream, 75%), transparent 20%),
    @paper;

  &--sidebar-hidden {
    grid-template-columns: 1fr;
  }
}

.app-shell__aside {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(180deg, lighten(@ink, 3%), @ink);
  border-right: 1px solid fade(#ffffff, 10%);
  color: fade(#ffffff, 82%);
  z-index: 30;
}

.app-shell__mask {
  display: none;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 20px;
  border-bottom: 1px solid fade(#ffffff, 10%);
}

.brand__mark {
  width: 48px;
  height: 48px;
  flex-shrink: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.brand__text {
  display: grid;
  gap: 4px;

  strong {
    font-size: 17px;
    color: #fff;
  }

  span {
    font-size: 12px;
    color: fade(#ffffff, 60%);
  }
}

.app-shell__nav {
  flex: 1;
  min-height: 0;
  padding: 18px 12px 20px;
}

.nav-group {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}

.nav-group__title {
  margin: 0;
  padding: 0 10px;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: fade(#ffffff, 42%);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 14px;
  color: fade(#ffffff, 74%);
  text-decoration: none;
  transition: 0.2s ease;

  &:hover {
    color: #fff;
    background: fade(#ffffff, 8%);
  }

  &.is-active {
    color: #fff;
    background: linear-gradient(135deg, fade(@accent, 32%), fade(#ffffff, 10%));
    box-shadow: inset 0 0 0 1px fade(@accent, 45%);
  }
}

.nav-link__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.app-shell__main {
  min-width: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-shell__header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 28px 18px;
  border-bottom: 1px solid @border-color;
  backdrop-filter: blur(10px);
  background: fade(#fffdf8, 78%);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;

  h1 {
    margin: 6px 0 0;
    font-size: 26px;
    color: @ink;
  }
}

.header-breadcrumb {
  font-size: 13px;
  color: @muted;
  letter-spacing: 0.04em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon,
.header-logout {
  color: @ink;
}

.role-select {
  width: 160px;
}

.app-shell__content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 28px;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .app-shell__mask {
    display: block;
    position: fixed;
    inset: 0;
    border: none;
    padding: 0;
    background: fade(@ink, 42%);
    z-index: 20;
  }

  .app-shell__aside {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: min(280px, 82vw);
    transform: translateX(-100%);
    transition: transform 0.24s ease;
  }

  .app-shell--mobile-menu-open .app-shell__aside {
    transform: translateX(0);
    box-shadow: 0 24px 48px fade(@ink, 18%);
  }

  .app-shell__header {
    padding-inline: 20px;
  }

  .app-shell__content {
    padding: 20px;
  }
}
</style>
