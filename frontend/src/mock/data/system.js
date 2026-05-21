export const deadlineList = [
  { id: 'd-001', stage: '课题申报', deadline: '2026-05-24 18:00', owner: '指导教师 / 学生' },
  { id: 'd-002', stage: '任务书审批', deadline: '2026-05-27 18:00', owner: '专业负责人' },
  { id: 'd-003', stage: '开题报告提交', deadline: '2026-05-28 18:00', owner: '学生' },
  { id: 'd-004', stage: '中期检查审核', deadline: '2026-06-12 18:00', owner: '指导教师 / 评阅教师' },
]

export const scoringRules = [
  { id: 'r-001', item: '指导教师评分', weight: 0.4 },
  { id: 'r-002', item: '评阅教师评分', weight: 0.2 },
  { id: 'r-003', item: '答辩评分', weight: 0.4 },
]

export const organizationTree = [
  { id: 'o-001', name: '计算机科学与通信工程学院', parent: null },
  { id: 'o-002', name: '计算机科学与通信工程专业', parent: 'o-001' },
  { id: 'o-003', name: '2022级计算机科学与通信工程 1 班', parent: 'o-002' },
]
