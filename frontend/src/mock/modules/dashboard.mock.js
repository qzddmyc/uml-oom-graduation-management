import { dashboardOverviewByRole } from '../data/dashboard'
import { deadlineList } from '../data/system'
import { roleProfiles } from '../data/users'
import { resolveMock } from '../shared'

export function getDashboardOverview(role, userName) {
  const overview = dashboardOverviewByRole[role] || dashboardOverviewByRole.student
  const profile = roleProfiles[role] || roleProfiles.student

  return resolveMock({
    ...overview,
    greeting: `${userName || profile.name}，你好`,
    upcomingDeadlines: deadlineList.slice(0, 3),
  })
}
