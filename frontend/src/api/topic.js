import { getSelectionRecords as getSelectionRecordsMock, getTopicList as getTopicListMock } from '@/mock/modules/topic.mock'

export function getTopicList() {
  return getTopicListMock()
}

export function getSelectionRecords() {
  return getSelectionRecordsMock()
}
