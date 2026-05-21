const commonTimeline = [
  { stage: '课题申报与审核', detail: '教师/学生申报课题，专业负责人和院长审核后统一发布。' },
  { stage: '双向选题确认', detail: '学生填报志愿，教师确认，专业负责人处理冲突与调剂。' },
  { stage: '过程材料提交', detail: '任务书、开题报告、中期检查按节点提交与审批。' },
  { stage: '答辩与总评', detail: '完成评阅、答辩分组、成绩录入、发布与归档。' },
]

const commonAnnouncements = [
  { id: 'a-1', title: '本周流程提醒', content: '课题、开题和成绩相关页面已同步到当前学年业务节点。', time: '刚刚' },
]

const studentOverview = {
  headline: '学生流程工作台',
  description: '聚焦选题、开题、中期和论文提交等关键动作，便于连续处理当前阶段任务。',
  stats: [
    { title: '待提交材料', value: 2, hint: '开题报告、论文初稿仍需提交。' },
    { title: '当前课题状态', value: '已确认', hint: '课题《智能选题推荐平台》已双选成功。' },
    { title: '下一关键节点', value: '开题提交', hint: '截止时间：05-28 18:00' },
  ],
  quickEntries: [
    { title: '学生选题', path: '/selection/student' },
    { title: '开题报告提交', path: '/proposal/submit' },
    { title: '中期检查提交', path: '/midterm/submit' },
    { title: '论文定稿提交', path: '/paper/final' },
  ],
  todoList: [
    { id: 'td-st-1', title: '完善开题报告摘要', deadline: '05-25', status: '待完成' },
    { id: 'td-st-2', title: '上传任务书签字版', deadline: '05-26', status: '待补充' },
    { id: 'td-st-3', title: '确认答辩材料模板', deadline: '06-03', status: '规划中' },
  ],
  announcements: commonAnnouncements.concat([
    { id: 'a-st-1', title: '选题结果已锁定', content: '已进入任务书阶段，不可再变更课题。', time: '今天 15:30' },
  ]),
  timeline: commonTimeline,
}

const supervisorOverview = {
  headline: '指导教师工作台',
  description: '用于集中处理课题申报、学生双选确认、开题审核和论文指导任务。',
  stats: [
    { title: '待审核材料', value: 5, hint: '其中 3 份开题报告、2 份中期检查表。' },
    { title: '指导学生人数', value: 8, hint: '本学年计算机科学与通信工程专业。' },
    { title: '本周关键动作', value: '任务书确认', hint: '需完成 4 名学生任务书指导意见。' },
  ],
  quickEntries: [
    { title: '课题申报', path: '/topic/create' },
    { title: '教师确认', path: '/selection/confirm' },
    { title: '开题报告审核', path: '/proposal/review' },
    { title: '论文审核', path: '/paper/review' },
  ],
  todoList: [
    { id: 'td-sp-1', title: '审核李同学开题报告', deadline: '05-24', status: '待审核' },
    { id: 'td-sp-2', title: '确认本周答疑安排', deadline: '05-25', status: '待安排' },
    { id: 'td-sp-3', title: '更新课题参考资料', deadline: '05-27', status: '进行中' },
  ],
  announcements: commonAnnouncements.concat([
    { id: 'a-sp-1', title: '中期检查阶段开启', content: '请提醒学生按要求提交中期进展材料。', time: '今天 09:10' },
  ]),
  timeline: commonTimeline,
}

const majorLeaderOverview = {
  headline: '专业负责人工作台',
  description: '重点查看课题审核、双选处理、任务书审批和评阅安排等全流程节点。',
  stats: [
    { title: '待审批事项', value: 11, hint: '课题审核、双选冲突、任务书审批等。' },
    { title: '异常流程数', value: 4, hint: '双选冲突 2 条，中期逾期 2 条。' },
    { title: '当前关注节点', value: '任务书审批', hint: '本周需完成第一轮审批。' },
  ],
  quickEntries: [
    { title: '课题审核', path: '/topic/review' },
    { title: '双选审核', path: '/selection/review' },
    { title: '任务书审批', path: '/taskbook/approval' },
    { title: '评阅教师分配', path: '/review/assign' },
  ],
  todoList: [
    { id: 'td-ml-1', title: '处理双选冲突记录', deadline: '05-24', status: '待处理' },
    { id: 'td-ml-2', title: '审批第一批任务书', deadline: '05-25', status: '待审批' },
    { id: 'td-ml-3', title: '确认评阅教师分配名单', deadline: '05-29', status: '待确认' },
  ],
  announcements: commonAnnouncements.concat([
    { id: 'a-ml-1', title: '课题审核进度 82%', content: '尚有 6 个课题待院级发布确认。', time: '今天 11:05' },
  ]),
  timeline: commonTimeline,
}

const teachingSecretaryOverview = {
  headline: '教学秘书工作台',
  description: '用于统筹时间节点、成绩汇总与发布、答辩组织和归档导出。',
  stats: [
    { title: '待发布成绩', value: 36, hint: '需在答辩结束后统一发布。' },
    { title: '已排答辩组数', value: 5, hint: '本周新增 1 个答辩组。' },
    { title: '当前重点任务', value: '成绩汇总', hint: '需校验评分权重与异常值。' },
  ],
  quickEntries: [
    { title: '成绩汇总', path: '/score/summary' },
    { title: '成绩发布', path: '/score/publish' },
    { title: '时间节点设置', path: '/system/deadlines' },
    { title: '导出中心', path: '/archive/export' },
  ],
  todoList: [
    { id: 'td-ts-1', title: '核对答辩组名单', deadline: '05-24', status: '待核对' },
    { id: 'td-ts-2', title: '发布中期检查通知', deadline: '05-25', status: '待发布' },
    { id: 'td-ts-3', title: '检查成绩权重配置', deadline: '05-27', status: '进行中' },
  ],
  announcements: commonAnnouncements.concat([
    { id: 'a-ts-1', title: '成绩汇总模板已更新', content: '新增指导、评阅、答辩分项校验。', time: '今天 08:35' },
  ]),
  timeline: commonTimeline,
}

const systemAdminOverview = {
  headline: '系统管理员工作台',
  description: '关注账号、组织和规则配置状态，保障当前业务流程顺畅运行。',
  stats: [
    { title: '系统角色数', value: 8, hint: '已覆盖管理员、教师、学生和答辩相关角色。' },
    { title: '待处理配置项', value: 3, hint: '组织数据、评分规则、时间节点。' },
    { title: '系统运行状态', value: '运行稳定', hint: '当前业务数据已完成初始化。' },
  ],
  quickEntries: [
    { title: '用户管理', path: '/system/users' },
    { title: '组织管理', path: '/system/org' },
    { title: '评分规则设置', path: '/system/rules' },
    { title: '进度统计', path: '/statistics/progress' },
  ],
  todoList: [
    { id: 'td-sa-1', title: '检查角色权限映射', deadline: '05-24', status: '待核验' },
    { id: 'td-sa-2', title: '更新账号信息', deadline: '05-26', status: '待更新' },
    { id: 'td-sa-3', title: '维护学院组织树', deadline: '05-29', status: '进行中' },
  ],
  announcements: commonAnnouncements.concat([
    { id: 'a-sa-1', title: '接口配置已完成', content: '各业务页面当前均可按统一接口方式读取数据。', time: '刚刚' },
  ]),
  timeline: commonTimeline,
}

export const dashboardOverviewByRole = {
  student: studentOverview,
  supervisor: supervisorOverview,
  reviewTeacher: {
    ...supervisorOverview,
    headline: '评阅教师工作台',
    quickEntries: [
      { title: '评阅工作台', path: '/review/workspace' },
      { title: '开题报告审核', path: '/proposal/review' },
      { title: '中期检查审核', path: '/midterm/review' },
      { title: '成绩汇总', path: '/score/summary' },
    ],
  },
  majorLeader: majorLeaderOverview,
  collegeDean: {
    ...majorLeaderOverview,
    headline: '教学院长工作台',
    description: '重点关注院级课题发布、流程进度和质量监督。',
  },
  teachingSecretary: teachingSecretaryOverview,
  defenseRecorder: {
    ...teachingSecretaryOverview,
    headline: '答辩录入员工作台',
    quickEntries: [
      { title: '答辩分组管理', path: '/defense/group' },
      { title: '答辩成绩录入', path: '/defense/score-entry' },
      { title: '成绩汇总', path: '/score/summary' },
      { title: '导出中心', path: '/archive/export' },
    ],
  },
  systemAdmin: systemAdminOverview,
}
