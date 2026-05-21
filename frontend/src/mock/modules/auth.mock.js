import { FALLBACK_ROLE } from '@/constants/roles'
import { rolePermissions, roleProfiles } from '../data/users'
import { resolveMock } from '../shared'

function buildSession(role, userName) {
  const currentRole = role || FALLBACK_ROLE
  const profile = roleProfiles[currentRole] || roleProfiles[FALLBACK_ROLE]

  return {
    role: currentRole,
    roleLabel: profile.roleLabel,
    userName: userName?.trim() || profile.name,
    orgName: profile.orgName,
    title: profile.title,
    permissions: rolePermissions[currentRole] || [],
  }
}

export function loginWithRole(payload) {
  return resolveMock(buildSession(payload?.role, payload?.username))
}

export function switchRole(payload) {
  return resolveMock(buildSession(payload?.role, payload?.userName))
}

export function logout() {
  return resolveMock({ success: true })
}
