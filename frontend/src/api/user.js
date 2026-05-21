import { getCurrentUserProfile as getCurrentUserProfileMock, getNotifications as getNotificationsMock } from '@/mock/modules/user.mock'

export function getCurrentUserProfile(role, userName) {
  return getCurrentUserProfileMock(role, userName)
}

export function getNotifications(role) {
  return getNotificationsMock(role)
}
