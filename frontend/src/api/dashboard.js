import { getDashboardOverview as getDashboardOverviewMock } from '@/mock/modules/dashboard.mock'

export function getDashboardOverview(role, userName) {
  return getDashboardOverviewMock(role, userName)
}
