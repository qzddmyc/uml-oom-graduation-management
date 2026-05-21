import { deadlineList, organizationTree, scoringRules } from '../data/system'
import { resolveMock } from '../shared'

export function getDeadlineSettings() {
  return resolveMock(deadlineList)
}

export function getScoringRules() {
  return resolveMock(scoringRules)
}

export function getOrganizationTree() {
  return resolveMock(organizationTree)
}
