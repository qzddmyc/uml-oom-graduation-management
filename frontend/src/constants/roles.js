export const ROLE_OPTIONS = [
  { key: 'systemAdmin', label: '系统管理员' },
  { key: 'teachingSecretary', label: '教学秘书' },
  { key: 'collegeDean', label: '教学院长' },
  { key: 'majorLeader', label: '专业负责人' },
  { key: 'supervisor', label: '指导教师' },
  { key: 'reviewTeacher', label: '评阅教师' },
  { key: 'defenseRecorder', label: '答辩录入员' },
  { key: 'student', label: '学生' },
]

export const ROLE_LABEL_MAP = ROLE_OPTIONS.reduce((result, item) => {
  result[item.key] = item.label
  return result
}, {})

export const FALLBACK_ROLE = 'student'
