import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { FALLBACK_ROLE, ROLE_LABEL_MAP } from '@/constants/roles'

const ROLE_STORAGE_KEY = 'graduation-management-role'
const USER_STORAGE_KEY = 'graduation-management-user'
const SIDEBAR_STORAGE_KEY = 'graduation-management-sidebar'

function readStorage(key, fallbackValue) {
  return window.localStorage.getItem(key) ?? fallbackValue
}

export const useAppStore = defineStore('app', () => {
  const currentRole = ref(readStorage(ROLE_STORAGE_KEY, ''))
  const userName = ref(readStorage(USER_STORAGE_KEY, '张同学'))
  const sidebarCollapsed = ref(readStorage(SIDEBAR_STORAGE_KEY, 'false') === 'true')

  const displayRole = computed(() => ROLE_LABEL_MAP[currentRole.value] ?? '未选择角色')

  function setRole(role) {
    currentRole.value = role || FALLBACK_ROLE
    window.localStorage.setItem(ROLE_STORAGE_KEY, currentRole.value)
  }

  function setSession(session) {
    currentRole.value = session?.role || FALLBACK_ROLE
    userName.value = session?.userName?.trim() || '张同学'
    window.localStorage.setItem(ROLE_STORAGE_KEY, currentRole.value)
    window.localStorage.setItem(USER_STORAGE_KEY, userName.value)
  }

  function clearRole() {
    currentRole.value = ''
    window.localStorage.removeItem(ROLE_STORAGE_KEY)
  }

  function setUserName(name) {
    userName.value = name?.trim() || '张同学'
    window.localStorage.setItem(USER_STORAGE_KEY, userName.value)
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarCollapsed.value))
  }

  return {
    currentRole,
    userName,
    sidebarCollapsed,
    displayRole,
    setRole,
    setSession,
    clearRole,
    setUserName,
    toggleSidebar,
  }
})
