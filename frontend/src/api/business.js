import { getBusinessPageData as getBusinessPageDataMock } from '@/mock/modules/business.mock'

export function getBusinessPageData(routeName, context) {
  return getBusinessPageDataMock(routeName, context)
}
