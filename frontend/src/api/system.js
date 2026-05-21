import { getDeadlineSettings as getDeadlineSettingsMock, getOrganizationTree as getOrganizationTreeMock, getScoringRules as getScoringRulesMock } from '@/mock/modules/system.mock'

export function getDeadlineSettings() {
  return getDeadlineSettingsMock()
}

export function getScoringRules() {
  return getScoringRulesMock()
}

export function getOrganizationTree() {
  return getOrganizationTreeMock()
}
