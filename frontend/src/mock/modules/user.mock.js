import { notificationsByRole, roleProfiles } from '../data/users'
import { resolveMock } from '../shared'

export function getCurrentUserProfile(role, userName) {
  const profile = roleProfiles[role] || roleProfiles.student

  return resolveMock({
    ...profile,
    userName: userName || profile.name,
  })
}

export function getNotifications(role) {
  return resolveMock(notificationsByRole[role] || notificationsByRole.student)
}
