import { createRouter, createWebHistory } from 'vue-router'
import { APP_TITLE } from '@/constants/app'
import { routes } from './routes'
import { useAppStore } from '@/stores/app'
import { doneProgress, resetProgress, startProgress } from '@/utils/progress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

router.beforeEach((to, from) => {
  const appStore = useAppStore()
  const shouldStartProgress = to.fullPath !== from.fullPath

  document.title = to.meta?.title ? `${to.meta.title} - ${APP_TITLE}` : APP_TITLE

  if (to.name === 'login' && appStore.currentRole) {
    return {
      name: 'dashboard',
    }
  }

  if (to.name === 'select-role' && !appStore.currentRole) {
    return {
      name: 'login',
    }
  }

  if (to.meta?.isPublic) {
    if (shouldStartProgress) {
      startProgress()
    }
    return true
  }

  if (!appStore.currentRole) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  const allowedRoles = to.meta?.roles ?? []

  if (allowedRoles.length > 0 && !allowedRoles.includes(appStore.currentRole)) {
    return {
      name: 'forbidden',
    }
  }

  if (shouldStartProgress) {
    startProgress()
  }

  return true
})

router.afterEach(() => {
  window.setTimeout(() => {
    doneProgress()
  }, 80)
})

router.onError(() => {
  resetProgress()
})

export default router
