import { selectionRecords, topicList } from '../data/topics'
import { resolveMock } from '../shared'

export function getTopicList() {
  return resolveMock(topicList)
}

export function getSelectionRecords() {
  return resolveMock(selectionRecords)
}
