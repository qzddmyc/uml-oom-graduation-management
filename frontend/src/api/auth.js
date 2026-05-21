import { loginWithRole as loginWithRoleMock, logout as logoutMock, switchRole as switchRoleMock } from '@/mock/modules/auth.mock'

export function loginWithRole(payload) {
  return loginWithRoleMock(payload)
}

export function switchRole(payload) {
  return switchRoleMock(payload)
}

export function logout() {
  return logoutMock()
}
