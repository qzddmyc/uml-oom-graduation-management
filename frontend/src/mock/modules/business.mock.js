import { getBusinessMockPage } from '../data/business'
import { resolveMock } from '../shared'

export function getBusinessPageData(routeName, context) {
  return resolveMock(getBusinessMockPage(routeName, context))
}
