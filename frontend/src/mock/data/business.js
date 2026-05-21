import { topicList, selectionRecords } from './topics'
import { deadlineList, organizationTree, scoringRules } from './system'
import { notificationsByRole, roleProfiles } from './users'

const baseActions = [
  { label: '刷新数据', type: 'default' },
  { label: '导出当前数据', type: 'primary' },
]

const topicColumns = [
  { prop: 'title', label: '课题名称', minWidth: 220 },
  { prop: 'teacher', label: '负责人', minWidth: 120 },
  { prop: 'source', label: '来源', minWidth: 120 },
  { prop: 'major', label: '所属专业', minWidth: 120 },
  { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
]

const selectionColumns = [
  { prop: 'student', label: '学生', minWidth: 120 },
  { prop: 'topicTitle', label: '课题名称', minWidth: 240 },
  { prop: 'priority', label: '志愿顺位', minWidth: 100 },
  { prop: 'status', label: '当前状态', minWidth: 140, type: 'tag' },
]

const materialColumns = [
  { prop: 'student', label: '学生', minWidth: 120 },
  { prop: 'material', label: '材料名称', minWidth: 160 },
  { prop: 'submitTime', label: '提交时间', minWidth: 160 },
  { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
  { prop: 'comment', label: '备注', minWidth: 180 },
]

const reviewColumns = [
  { prop: 'student', label: '学生', minWidth: 120 },
  { prop: 'teacher', label: '处理人', minWidth: 120 },
  { prop: 'topic', label: '课题/论文', minWidth: 220 },
  { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
  { prop: 'deadline', label: '截止时间', minWidth: 140 },
]

const scoreColumns = [
  { prop: 'student', label: '学生', minWidth: 120 },
  { prop: 'supervisor', label: '指导', minWidth: 100 },
  { prop: 'review', label: '评阅', minWidth: 100 },
  { prop: 'defense', label: '答辩', minWidth: 100 },
  { prop: 'final', label: '总评', minWidth: 100 },
  { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
]

const statusProgress = [
  { label: '课题阶段', percentage: 85, status: 'success' },
  { label: '开题阶段', percentage: 68, status: 'warning' },
  { label: '中期阶段', percentage: 42, status: 'exception' },
]

const systemUsers = Object.values(roleProfiles).map((item, index) => ({
  id: `u-${index + 1}`,
  name: item.name,
  roleLabel: item.roleLabel,
  orgName: item.orgName,
  title: item.title,
  status: index % 3 === 0 ? '停用' : '启用',
}))

const commonTimeline = [
  { title: '需求与选题阶段', content: '完成课题申报、审核、发布与双向选题。', meta: '第 1-2 周' },
  { title: '过程管理阶段', content: '任务书、开题报告、中期检查进入提交与审核。', meta: '第 3-9 周' },
  { title: '结题答辩阶段', content: '完成论文定稿、评阅、答辩和成绩归档。', meta: '第 10-16 周' },
]

const pageMocks = {
  'topic-list': {
    stats: [
      { title: '课题总数', value: 34, hint: '本批次含教师申报与学生自拟。' },
      { title: '已发布课题', value: 21, hint: '已进入学生选题视图。' },
      { title: '待审核课题', value: 7, hint: '需专业负责人或院级处理。' },
    ],
    actions: [{ label: '新增课题', type: 'primary' }, ...baseActions],
    filters: [
      { key: 'keyword', label: '关键词', type: 'input', value: '设计' },
      { key: 'source', label: '课题来源', type: 'select', value: '全部', options: ['全部', '教师申报', '学生自拟'] },
      { key: 'status', label: '审核状态', type: 'select', value: '全部', options: ['全部', '已发布', '待审核', '审核中'] },
    ],
    tableSection: {
      title: '课题列表',
      description: '展示课题申报、审核与发布的完整清单。',
      columns: topicColumns,
      rows: topicList,
    },
    sideSections: [
      { title: '课题来源分布', type: 'kv', items: [{ label: '教师申报', value: '26' }, { label: '学生自拟', value: '8' }, { label: '企业协同', value: '5' }] },
      { title: '流程时间轴', type: 'timeline', items: commonTimeline },
    ],
  },
  'topic-create': {
    stats: [
      { title: '本周可申报数', value: 3, hint: '当前角色本周最多可新增 3 个课题。' },
      { title: '参考模板', value: 2, hint: '含校级模板与学院模板。' },
      { title: '审核链路', value: '专业→学院', hint: '提交后会进入双级审核。' },
    ],
    actions: [{ label: '暂存草稿', type: 'default' }, { label: '提交申报', type: 'primary' }],
    formSection: {
      title: '课题申报表',
      description: '展示课题基础信息、来源与适用专业。',
      fields: [
        { label: '课题名称', value: '智能选题推荐平台设计与实现' },
        { label: '课题来源', value: '教师申报' },
        { label: '适用专业', value: '计算机科学与通信工程' },
        { label: '适用人数', value: '1 人' },
        { label: '主要目标', value: '实现选题推荐、审核跟踪与过程管理展示。', span: 2 },
        { label: '预期成果', value: '系统原型、设计文档、界面截图。', span: 2 },
      ],
    },
    sideSections: [
      { title: '申报说明', type: 'list', items: ['课题描述需明确业务背景与预期成果。', '题目需与毕业设计方向保持一致。', '提交后进入专业负责人审核。'] },
      { title: '当前草稿附件', type: 'tags', items: ['任务说明.docx', '流程图.drawio', '参考文献.pdf'] },
    ],
  },
  'topic-review': {
    stats: [
      { title: '待审核课题', value: 7, hint: '其中 2 个学生自拟课题。' },
      { title: '已退回课题', value: 3, hint: '需补充成果说明或约束条件。' },
      { title: '通过率', value: '79%', hint: '按当前批次统计。' },
    ],
    actions: [{ label: '批量通过', type: 'primary' }, { label: '批量退回', type: 'warning' }, ...baseActions],
    tableSection: {
      title: '课题审核队列',
      description: '用于查看课题描述、方向匹配度与审核状态。',
      columns: topicColumns,
      rows: topicList.map((item, index) => ({
        ...item,
        status: index % 2 === 0 ? '待审核' : item.status,
      })),
    },
    sideSections: [
      { title: '审核要点', type: 'list', items: ['课题是否符合专业培养目标', '题目范围是否适中', '预期成果是否可交付'] },
      { title: '审核进度', type: 'progress', items: statusProgress },
    ],
  },
  'topic-publish': {
    stats: [
      { title: '待发布批次', value: 2, hint: '计算机科学与通信工程、数据科学各 1 批次。' },
      { title: '已锁定课题', value: 21, hint: '发布后不可直接修改。' },
      { title: '发布时间窗', value: '48h', hint: '学生可见窗口已开启。' },
    ],
    actions: [{ label: '生成发布批次', type: 'primary' }, { label: '预览发布范围', type: 'default' }],
    tableSection: {
      title: '发布批次',
      description: '按专业、年级与课题可见范围进行发布。',
      columns: [
        { prop: 'batch', label: '批次名称', minWidth: 180 },
        { prop: 'major', label: '专业', minWidth: 120 },
        { prop: 'topicCount', label: '课题数', minWidth: 100 },
        { prop: 'timeRange', label: '开放时间', minWidth: 180 },
        { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
      ],
      rows: [
        { batch: '2026春季第一批', major: '计算机科学与通信工程', topicCount: 21, timeRange: '05-20 至 05-24', status: '发布中' },
        { batch: '2026春季第二批', major: '计算机科学与通信工程', topicCount: 8, timeRange: '05-25 至 05-27', status: '待发布' },
      ],
    },
    sideSections: [
      { title: '发布提醒', type: 'list', items: ['发布后学生即可查看可选课题。', '发布前需确保审核状态为通过。', '发布窗口结束后进入教师确认阶段。'] },
    ],
  },
  'selection-student': {
    stats: [
      { title: '可选课题', value: 21, hint: '已过滤本专业与已满员课题。' },
      { title: '已提交志愿', value: 3, hint: '当前最多可填报 3 个志愿。' },
      { title: '当前状态', value: '教师确认中', hint: '等待指导教师确认。' },
    ],
    actions: [{ label: '提交志愿顺序', type: 'primary' }, { label: '查看课题详情', type: 'default' }],
    tableSection: {
      title: '我的选题记录',
      description: '展示学生提交的志愿、排序与处理状态。',
      columns: selectionColumns,
      rows: selectionRecords,
    },
    sideSections: [
      { title: '选题规则', type: 'list', items: ['每名学生最多填报 3 个志愿。', '教师确认后由专业负责人处理冲突。', '双选成功后进入任务书阶段。'] },
      { title: '我的关注标签', type: 'tags', items: ['推荐系统', '流程管理', '数据可视化'] },
    ],
  },
  'selection-confirm': {
    stats: [
      { title: '待确认学生', value: 5, hint: '需教师确认是否接收。' },
      { title: '已确认', value: 9, hint: '其中 2 名待专业审核。' },
      { title: '冲突记录', value: 2, hint: '需进一步协调。' },
    ],
    actions: [{ label: '批量确认', type: 'primary' }, { label: '退回调整', type: 'warning' }],
    tableSection: {
      title: '教师确认队列',
      description: '面向指导教师展示学生选题志愿与匹配情况。',
      columns: selectionColumns,
      rows: selectionRecords,
    },
    sideSections: [
      { title: '确认建议', type: 'list', items: ['优先处理第一志愿申请。', '关注学生人数与课题容量匹配。', '必要时记录拒绝原因。'] },
    ],
  },
  'selection-review': {
    stats: [
      { title: '待审核双选', value: 4, hint: '包含冲突和调剂记录。' },
      { title: '已成功双选', value: 18, hint: '已进入任务书编制阶段。' },
      { title: '需调剂', value: 2, hint: '建议由专业负责人人工分配。' },
    ],
    actions: [{ label: '处理冲突', type: 'primary' }, { label: '生成结果名单', type: 'default' }],
    tableSection: {
      title: '双选审核清单',
      description: '查看学生与教师确认后的双选结果。',
      columns: selectionColumns,
      rows: selectionRecords.map((item, index) => ({
        ...item,
        status: index === 1 ? '冲突待处理' : item.status,
      })),
    },
    sideSections: [
      { title: '调剂策略', type: 'timeline', items: [{ title: '识别冲突', content: '查看同一课题多名学生申请情况。', meta: '步骤 1' }, { title: '沟通教师', content: '确认最终容量与优先人选。', meta: '步骤 2' }, { title: '发布结果', content: '锁定双选成功名单。', meta: '步骤 3' }] },
    ],
  },
  'taskbook-detail': {
    stats: [
      { title: '当前状态', value: '待审批', hint: '任务书已提交，等待专业负责人审批。' },
      { title: '最近修改', value: '05-21 15:10', hint: '学生更新了任务目标描述。' },
      { title: '关联课题', value: '已确认', hint: '已与双选结果绑定。' },
    ],
    actions: [{ label: '查看附件', type: 'default' }, { label: '导出任务书', type: 'primary' }],
    formSection: {
      title: '任务书信息',
      description: '展示任务目标、研究内容和时间安排。',
      fields: [
        { label: '任务书编号', value: 'TB-2026-018' },
        { label: '学生', value: '张同学' },
        { label: '指导教师', value: '王老师' },
        { label: '课题名称', value: '智能选题推荐平台设计与实现', span: 2 },
        { label: '主要任务', value: '完成前端原型、用例分析、类图和数据库设计。', span: 2 },
        { label: '计划进度', value: '第 4 周开题、第 8 周中期、第 14 周答辩。', span: 2 },
      ],
    },
    sideSections: [
      { title: '审批记录', type: 'timeline', items: [{ title: '学生提交任务书', content: '已提交初版任务书。', meta: '05-20' }, { title: '指导教师确认', content: '建议补充任务边界描述。', meta: '05-21' }] },
      { title: '附件列表', type: 'tags', items: ['任务书.pdf', '课题说明.docx', '时间计划.xlsx'] },
    ],
  },
  'taskbook-approval': {
    stats: [
      { title: '待审批任务书', value: 12, hint: '本批次需在 2 天内审批完成。' },
      { title: '已通过', value: 17, hint: '通过后进入开题阶段。' },
      { title: '需修改', value: 3, hint: '主要为研究目标描述不够明确。' },
    ],
    actions: [{ label: '批量通过', type: 'primary' }, { label: '退回修改', type: 'warning' }],
    tableSection: {
      title: '任务书审批队列',
      description: '查看任务书内容、提交时间与当前审批状态。',
      columns: materialColumns,
      rows: [
        { student: '张同学', material: '任务书', submitTime: '05-21 15:10', status: '待审批', comment: '补充预期成果' },
        { student: '李同学', material: '任务书', submitTime: '05-21 11:45', status: '已通过', comment: '已完成' },
      ],
    },
    sideSections: [{ title: '审批关注点', type: 'list', items: ['课题目标是否清晰', '时间安排是否可执行', '成果形式是否符合要求'] }],
  },
  'proposal-submit': {
    stats: [
      { title: '提交截止', value: '05-28', hint: '开题报告需在本周内提交。' },
      { title: '模板版本', value: 'V2.1', hint: '学院统一模板。' },
      { title: '当前进度', value: '60%', hint: '摘要与研究内容已填写。' },
    ],
    actions: [{ label: '保存草稿', type: 'default' }, { label: '提交开题报告', type: 'primary' }],
    formSection: {
      title: '开题报告预览',
      description: '展示研究背景、研究目标、实施方案等核心字段。',
      fields: [
        { label: '研究背景', value: '围绕毕业设计流程数字化管理展开。', span: 2 },
        { label: '研究目标', value: '实现角色化的毕设管理系统原型。', span: 2 },
        { label: '关键技术', value: 'Vue 3、Element Plus、Pinia、权限路由控制。', span: 2 },
        { label: '预期进度', value: '按开题、中期、答辩三阶段推进。', span: 2 },
      ],
    },
    sideSections: [{ title: '附件要求', type: 'tags', items: ['开题报告.docx', '参考文献.pdf', '可行性分析.pdf'] }],
  },
  'proposal-review': {
    stats: [
      { title: '待审核报告', value: 6, hint: '指导教师与评阅教师均可处理。' },
      { title: '已通过', value: 18, hint: '进入中期阶段准备。' },
      { title: '需重提', value: 2, hint: '研究目标不够清晰。' },
    ],
    actions: [{ label: '填写评语', type: 'primary' }, { label: '退回修改', type: 'warning' }],
    tableSection: {
      title: '开题审核清单',
      description: '查看学生提交的开题报告和专家审核意见。',
      columns: materialColumns,
      rows: [
        { student: '张同学', material: '开题报告', submitTime: '05-22 10:15', status: '待审核', comment: '需补充技术路线图' },
        { student: '李同学', material: '开题报告', submitTime: '05-22 09:20', status: '已通过', comment: '通过' },
      ],
    },
    sideSections: [{ title: '审核量化维度', type: 'kv', items: [{ label: '选题意义', value: '20%' }, { label: '方案可行性', value: '40%' }, { label: '计划安排', value: '40%' }] }],
  },
  'midterm-submit': {
    stats: [
      { title: '中期完成度', value: '48%', hint: '按计划完成前端与设计文档。' },
      { title: '需提交材料', value: 3, hint: '中期检查表、阶段成果、问题说明。' },
      { title: '当前风险', value: '低', hint: '主要剩余页面细化与测试。' },
    ],
    actions: [{ label: '保存阶段总结', type: 'default' }, { label: '提交中期检查', type: 'primary' }],
    formSection: {
      title: '中期检查表',
      description: '展示阶段成果、问题清单和后续计划。',
      fields: [
        { label: '已完成内容', value: '需求分析、UML 设计、前端页面与数据接口整理。', span: 2 },
        { label: '存在问题', value: '部分业务页仍需细化操作交互。', span: 2 },
        { label: '后续计划', value: '完善业务页、截图和最终汇报材料。', span: 2 },
      ],
    },
    sideSections: [{ title: '提交清单', type: 'tags', items: ['中期检查表', '阶段原型截图', '代码清单'] }],
  },
  'midterm-review': {
    stats: [
      { title: '待审核中期材料', value: 8, hint: '含指导教师与专业负责人环节。' },
      { title: '异常项目', value: 2, hint: '进度偏慢，需要重点关注。' },
      { title: '平均完成度', value: '61%', hint: '按当前批次统计。' },
    ],
    actions: [{ label: '录入阶段评价', type: 'primary' }, { label: '标记风险项目', type: 'warning' }],
    tableSection: {
      title: '中期审核清单',
      description: '结合完成度、风险与指导意见完成审核。',
      columns: materialColumns,
      rows: [
        { student: '张同学', material: '中期检查表', submitTime: '06-10 09:00', status: '待审核', comment: '整体进度正常' },
        { student: '周同学', material: '中期检查表', submitTime: '06-10 10:20', status: '风险关注', comment: '论文初稿进度偏慢' },
      ],
    },
    sideSections: [{ title: '风险提醒', type: 'list', items: ['检查任务书目标是否对齐', '关注论文撰写进度', '必要时安排专项答疑'] }],
  },
  'paper-draft': {
    stats: [
      { title: '初稿提交状态', value: '可提交', hint: '当前窗口已开放。' },
      { title: '查重要求', value: '暂不要求', hint: '初稿阶段仅检查结构与内容。' },
      { title: '指导反馈次数', value: 2, hint: '已收到 2 轮意见。' },
    ],
    actions: [{ label: '上传初稿', type: 'primary' }, { label: '查看反馈记录', type: 'default' }],
    formSection: {
      title: '论文初稿信息',
      description: '展示论文题目、章节进度与当前附件状态。',
      fields: [
        { label: '论文题目', value: '毕业设计流程管理系统原型设计', span: 2 },
        { label: '当前章节进度', value: '绪论、需求分析、系统设计已完成。', span: 2 },
        { label: '待补充内容', value: '测试部分、总结与展望。', span: 2 },
      ],
    },
    sideSections: [{ title: '反馈摘要', type: 'list', items: ['补充业务流程与类图对应关系。', '增强数据库设计与前端页面关联说明。'] }],
  },
  'paper-final': {
    stats: [
      { title: '定稿状态', value: '待提交', hint: '需一并上传查重结果。' },
      { title: '附件要求', value: 4, hint: '论文、查重、源代码、附录。' },
      { title: '答辩前检查', value: '待完成', hint: '需确认最终提交清单。' },
    ],
    actions: [{ label: '提交定稿', type: 'primary' }, { label: '预览提交清单', type: 'default' }],
    formSection: {
      title: '定稿提交清单',
      description: '展示论文定稿、查重结果和归档附件。',
      fields: [
        { label: '论文定稿', value: 'paper-final.pdf' },
        { label: '查重结果', value: 'similarity-report.pdf' },
        { label: '源代码包', value: 'frontend-source.zip' },
        { label: '附录材料', value: 'design-appendix.zip' },
      ],
    },
    sideSections: [{ title: '提交提醒', type: 'list', items: ['提交后进入评阅阶段。', '查重结果需满足学院要求。', '附件名称建议按规范命名。'] }],
  },
  'paper-review': {
    stats: [
      { title: '待审核论文', value: 7, hint: '指导教师需确认定稿状态。' },
      { title: '已退回修改', value: 2, hint: '需补充格式与内容修订。' },
      { title: '审核完成率', value: '71%', hint: '当前批次统计。' },
    ],
    actions: [{ label: '通过定稿', type: 'primary' }, { label: '退回修改', type: 'warning' }],
    tableSection: {
      title: '论文审核清单',
      description: '查看论文版本、修改记录和最终提交情况。',
      columns: materialColumns,
      rows: [
        { student: '张同学', material: '论文定稿', submitTime: '06-22 16:20', status: '待审核', comment: '格式基本符合要求' },
        { student: '李同学', material: '论文定稿', submitTime: '06-22 15:10', status: '需修改', comment: '摘要需重写' },
      ],
    },
    sideSections: [{ title: '审核检查项', type: 'tags', items: ['格式规范', '结构完整', '成果对应', '附件齐全'] }],
  },
  'review-assign': {
    stats: [
      { title: '待分配论文', value: 28, hint: '需完成评阅教师分配。' },
      { title: '已分配教师', value: 12, hint: '涉及 6 名评阅教师。' },
      { title: '平均负载', value: '4.6 篇', hint: '建议均衡分配。' },
    ],
    actions: [{ label: '自动推荐分配', type: 'primary' }, { label: '导出名单', type: 'default' }],
    tableSection: {
      title: '评阅分配清单',
      description: '按专业方向和工作量进行评阅教师分配。',
      columns: reviewColumns,
      rows: [
        { student: '张同学', teacher: '刘老师', topic: '毕业设计流程管理系统原型设计', status: '待确认', deadline: '06-28' },
        { student: '李同学', teacher: '陈老师', topic: '论文评审意见辅助整理系统', status: '已分配', deadline: '06-28' },
      ],
    },
    sideSections: [{ title: '分配原则', type: 'list', items: ['避免指导教师交叉评阅', '优先匹配研究方向', '保持工作量平衡'] }],
  },
  'review-workspace': {
    stats: [
      { title: '待评阅论文', value: 6, hint: '本轮需在一周内完成。' },
      { title: '已完成评阅', value: 2, hint: '已提交评阅意见。' },
      { title: '平均评分', value: '84.5', hint: '当前已评阅论文均分。' },
    ],
    actions: [{ label: '录入评阅意见', type: 'primary' }, { label: '查看论文附件', type: 'default' }],
    tableSection: {
      title: '评阅工作台',
      description: '展示分配到当前评阅教师的论文与状态。',
      columns: reviewColumns,
      rows: [
        { student: '张同学', teacher: '刘老师', topic: '毕业设计流程管理系统原型设计', status: '待评阅', deadline: '06-28' },
        { student: '周同学', teacher: '刘老师', topic: '智能选题推荐平台设计与实现', status: '已完成', deadline: '06-28' },
      ],
    },
    sideSections: [{ title: '评阅维度', type: 'kv', items: [{ label: '选题价值', value: '20%' }, { label: '实现质量', value: '40%' }, { label: '论文质量', value: '40%' }] }],
  },
  'defense-group': {
    stats: [
      { title: '答辩小组', value: 5, hint: '已按专业方向分组。' },
      { title: '待排学生', value: 8, hint: '需继续安排到答辩组。' },
      { title: '答辩教室', value: 3, hint: '已确认教室资源。' },
    ],
    actions: [{ label: '生成分组', type: 'primary' }, { label: '导出答辩安排', type: 'default' }],
    tableSection: {
      title: '答辩分组安排',
      description: '管理答辩组成员、地点和时间安排。',
      columns: [
        { prop: 'group', label: '答辩组', minWidth: 120 },
        { prop: 'teacher', label: '组长', minWidth: 120 },
        { prop: 'studentCount', label: '学生数', minWidth: 100 },
        { prop: 'location', label: '地点', minWidth: 140 },
        { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
      ],
      rows: [
        { group: '第 1 答辩组', teacher: '李老师', studentCount: 6, location: '教学楼 A305', status: '已排定' },
        { group: '第 2 答辩组', teacher: '周老师', studentCount: 5, location: '教学楼 A306', status: '待补充' },
      ],
    },
    sideSections: [{ title: '答辩流程', type: 'timeline', items: [{ title: '分组', content: '按方向和人数生成答辩组。', meta: '步骤 1' }, { title: '排期', content: '确定教室、时间和顺序。', meta: '步骤 2' }, { title: '发布', content: '向学生和教师发布答辩安排。', meta: '步骤 3' }] }],
  },
  'defense-score-entry': {
    stats: [
      { title: '待录入成绩', value: 15, hint: '当前答辩组尚未全部完成。' },
      { title: '已完成录入', value: 11, hint: '成绩已进入汇总阶段。' },
      { title: '异常项', value: 1, hint: '一条记录缺少评语。' },
    ],
    actions: [{ label: '保存评分', type: 'primary' }, { label: '导出答辩表', type: 'default' }],
    tableSection: {
      title: '答辩成绩录入表',
      description: '录入答辩评分、评语和答辩结论。',
      columns: [
        { prop: 'student', label: '学生', minWidth: 120 },
        { prop: 'group', label: '答辩组', minWidth: 120 },
        { prop: 'score', label: '答辩成绩', minWidth: 100 },
        { prop: 'result', label: '结论', minWidth: 120, type: 'tag' },
        { prop: 'comment', label: '评语', minWidth: 200 },
      ],
      rows: [
        { student: '张同学', group: '第 1 答辩组', score: 88, result: '通过', comment: '表达清晰，系统展示完整。' },
        { student: '李同学', group: '第 2 答辩组', score: 76, result: '通过', comment: '需优化论文排版。' },
      ],
    },
    sideSections: [{ title: '录入提示', type: 'list', items: ['成绩需和纸质评分表一致。', '需补充答辩评语后方可提交。', '录入完成后进入成绩汇总。'] }],
  },
  'score-summary': {
    stats: [
      { title: '待汇总学生', value: 26, hint: '需汇总指导、评阅和答辩成绩。' },
      { title: '已完成总评', value: 18, hint: '已生成最终成绩。' },
      { title: '异常成绩', value: 2, hint: '存在较大分差待复核。' },
    ],
    actions: [{ label: '执行汇总', type: 'primary' }, { label: '导出成绩表', type: 'default' }],
    tableSection: {
      title: '成绩汇总表',
      description: '按评分规则计算总评并标记异常情况。',
      columns: scoreColumns,
      rows: [
        { student: '张同学', supervisor: 86, review: 88, defense: 88, final: 87.2, status: '已汇总' },
        { student: '李同学', supervisor: 82, review: 78, defense: 76, final: 79.2, status: '待复核' },
      ],
    },
    sideSections: [{ title: '当前规则', type: 'kv', items: scoringRules.map((item) => ({ label: item.item, value: `${item.weight * 100}%` })) }],
  },
  'score-publish': {
    stats: [
      { title: '待发布成绩', value: 36, hint: '完成终审后即可发布。' },
      { title: '已锁定成绩', value: 18, hint: '已完成复核。' },
      { title: '发布时间', value: '06-30 18:00', hint: '当前计划发布时间。' },
    ],
    actions: [{ label: '预览发布名单', type: 'default' }, { label: '发布成绩', type: 'primary' }],
    tableSection: {
      title: '成绩发布批次',
      description: '查看学生成绩发布状态和审批进度。',
      columns: [
        { prop: 'batch', label: '批次', minWidth: 160 },
        { prop: 'studentCount', label: '学生数', minWidth: 100 },
        { prop: 'approve', label: '终审状态', minWidth: 120, type: 'tag' },
        { prop: 'publishTime', label: '发布时间', minWidth: 160 },
      ],
      rows: [
        { batch: '2026 计算机科学与通信工程本科', studentCount: 36, approve: '待发布', publishTime: '06-30 18:00' },
      ],
    },
    sideSections: [{ title: '发布校验', type: 'list', items: ['确认总评均已生成', '确认异常成绩已复核', '确认学生名单无缺漏'] }],
  },
  'score-adjustment': {
    stats: [
      { title: '待调整申请', value: 2, hint: '学生对成绩提出复核申请。' },
      { title: '已处理申请', value: 5, hint: '含成绩更正与驳回。' },
      { title: '当前状态', value: '可处理', hint: '系统管理员和教学秘书均可操作。' },
    ],
    actions: [{ label: '提交调整', type: 'primary' }, { label: '查看复核记录', type: 'default' }],
    tableSection: {
      title: '成绩调整记录',
      description: '处理成绩更正、复核和特殊情况。',
      columns: [
        { prop: 'student', label: '学生', minWidth: 120 },
        { prop: 'reason', label: '申请原因', minWidth: 220 },
        { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
        { prop: 'handler', label: '处理人', minWidth: 120 },
      ],
      rows: [
        { student: '李同学', reason: '评阅成绩录入有误', status: '待处理', handler: '周老师' },
        { student: '周同学', reason: '答辩成绩复核申请', status: '已完成', handler: '陈嘉琳' },
      ],
    },
    sideSections: [{ title: '处理规范', type: 'list', items: ['调整前需保留原始记录。', '需填写复核原因和审批人。', '发布后需同步历史档案。'] }],
  },
  'statistics-progress': {
    stats: [
      { title: '整体进度', value: '68%', hint: '当前批次流程综合完成度。' },
      { title: '逾期项目', value: 4, hint: '主要集中在中期检查阶段。' },
      { title: '高风险项目', value: 2, hint: '需重点跟踪。' },
    ],
    tableSection: {
      title: '进度统计明细',
      description: '按专业、阶段和角色查看整体推进情况。',
      columns: [
        { prop: 'scope', label: '统计范围', minWidth: 180 },
        { prop: 'topic', label: '课题阶段', minWidth: 120 },
        { prop: 'proposal', label: '开题阶段', minWidth: 120 },
        { prop: 'midterm', label: '中期阶段', minWidth: 120 },
        { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
      ],
      rows: [
        { scope: '计算机科学与通信工程专业', topic: '85%', proposal: '72%', midterm: '48%', status: '持续推进' },
        { scope: '学院整体', topic: '81%', proposal: '66%', midterm: '43%', status: '需关注' },
      ],
    },
    sideSections: [{ title: '阶段进度', type: 'progress', items: statusProgress }],
  },
  'statistics-topic': {
    stats: [
      { title: '课题总量', value: 34, hint: '当前批次全部课题数。' },
      { title: '通过率', value: '79%', hint: '课题审核通过率。' },
      { title: '企业课题数', value: 5, hint: '校企联合题目。' },
    ],
    tableSection: {
      title: '课题统计',
      description: '统计课题来源、发布与选题情况。',
      columns: topicColumns,
      rows: topicList,
    },
    sideSections: [{ title: '来源占比', type: 'kv', items: [{ label: '教师申报', value: '76%' }, { label: '学生自拟', value: '24%' }] }],
  },
  'statistics-score': {
    stats: [
      { title: '平均总评', value: 82.6, hint: '按当前已汇总学生统计。' },
      { title: '优秀率', value: '18%', hint: '总评 90 分及以上。' },
      { title: '需复核', value: 2, hint: '存在异常分差。' },
    ],
    tableSection: {
      title: '成绩统计',
      description: '按学生和评分来源查看成绩结构。',
      columns: scoreColumns,
      rows: [
        { student: '张同学', supervisor: 86, review: 88, defense: 88, final: 87.2, status: '正常' },
        { student: '李同学', supervisor: 82, review: 78, defense: 76, final: 79.2, status: '待复核' },
      ],
    },
    sideSections: [{ title: '分布概览', type: 'progress', items: [{ label: '90-100', percentage: 18, status: 'success' }, { label: '80-89', percentage: 46, status: 'warning' }, { label: '79 以下', percentage: 12, status: 'exception' }] }],
  },
  'archive-query': {
    stats: [
      { title: '已归档批次', value: 6, hint: '近六届毕设数据可检索。' },
      { title: '归档材料数', value: 428, hint: '含任务书、开题、中期、论文与答辩材料。' },
      { title: '本周查询量', value: 23, hint: '当前系统统计。' },
    ],
    filters: [
      { key: 'year', label: '届别', type: 'select', value: '2026', options: ['2026', '2025', '2024'] },
      { key: 'keyword', label: '姓名/课题', type: 'input', value: '张同学' },
      { key: 'type', label: '材料类型', type: 'select', value: '全部', options: ['全部', '任务书', '开题报告', '论文定稿'] },
    ],
    tableSection: {
      title: '归档查询结果',
      description: '支持按届别、学生、材料类型查询历史记录。',
      columns: [
        { prop: 'year', label: '届别', minWidth: 100 },
        { prop: 'student', label: '学生', minWidth: 120 },
        { prop: 'topic', label: '课题', minWidth: 220 },
        { prop: 'material', label: '材料类型', minWidth: 120 },
        { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
      ],
      rows: [
        { year: '2026', student: '张同学', topic: '毕业设计流程管理系统原型设计', material: '论文定稿', status: '已归档' },
        { year: '2025', student: '李同学', topic: '论文评审意见辅助整理系统', material: '开题报告', status: '已归档' },
      ],
    },
    sideSections: [{ title: '常用查询', type: 'tags', items: ['历届优秀论文', '某专业答辩成绩', '开题报告归档'] }],
  },
  'archive-export': {
    stats: [
      { title: '可导出模板', value: 8, hint: '含成绩表、归档包、过程材料。' },
      { title: '今日导出', value: 5, hint: '当前系统统计。' },
      { title: '最近任务', value: '成绩表导出', hint: '06-28 10:40 完成。' },
    ],
    actions: [{ label: '创建导出任务', type: 'primary' }, { label: '查看导出历史', type: 'default' }],
    tableSection: {
      title: '导出任务列表',
      description: '统一管理报表、材料和归档包导出。',
      columns: [
        { prop: 'task', label: '任务名称', minWidth: 180 },
        { prop: 'type', label: '导出类型', minWidth: 140 },
        { prop: 'createdAt', label: '创建时间', minWidth: 160 },
        { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
      ],
      rows: [
        { task: '2026 计算机科学与通信工程成绩总表', type: '成绩导出', createdAt: '06-28 10:20', status: '已完成' },
        { task: '2026 开题报告归档包', type: '材料导出', createdAt: '06-28 09:10', status: '处理中' },
      ],
    },
    sideSections: [{ title: '导出格式', type: 'tags', items: ['Excel', 'PDF', 'ZIP'] }],
  },
  'system-users': {
    stats: [
      { title: '系统用户数', value: systemUsers.length, hint: '覆盖 8 类角色。' },
      { title: '启用账号', value: systemUsers.filter((item) => item.status === '启用').length, hint: '当前可登录账号。' },
      { title: '停用账号', value: systemUsers.filter((item) => item.status !== '启用').length, hint: '需管理员复核。' },
    ],
    actions: [{ label: '新增账号', type: 'primary' }, { label: '导入角色映射', type: 'default' }],
    tableSection: {
      title: '用户管理',
      description: '统一维护账号、角色和所属组织。',
      columns: [
        { prop: 'name', label: '姓名', minWidth: 120 },
        { prop: 'roleLabel', label: '角色', minWidth: 140 },
        { prop: 'orgName', label: '所属组织', minWidth: 180 },
        { prop: 'title', label: '岗位', minWidth: 140 },
        { prop: 'status', label: '状态', minWidth: 120, type: 'tag' },
      ],
      rows: systemUsers,
    },
    sideSections: [{ title: '账号策略', type: 'list', items: ['统一通过角色模板创建账号。', '停用账号需保留历史操作记录。', '用户导入建议按学院与专业分批处理。'] }],
  },
  'system-org': {
    stats: [
      { title: '组织节点', value: organizationTree.length, hint: '当前示例组织结构节点数。' },
      { title: '学院数', value: 1, hint: '当前配置保留 1 个学院。' },
      { title: '班级数', value: 1, hint: '当前展示单班级结构。' },
    ],
    tableSection: {
      title: '组织结构',
      description: '维护学院、专业与班级树结构。',
      columns: [
        { prop: 'name', label: '组织名称', minWidth: 220 },
        { prop: 'parent', label: '上级节点', minWidth: 180 },
      ],
      rows: organizationTree.map((item) => ({
        name: item.name,
        parent: organizationTree.find((entry) => entry.id === item.parent)?.name || '根节点',
      })),
    },
    sideSections: [{ title: '组织说明', type: 'list', items: ['支持学院、专业、班级三级结构。', '后续可接入真实组织树组件。'] }],
  },
  'system-deadlines': {
    stats: [
      { title: '关键节点数', value: deadlineList.length, hint: '覆盖选题、任务书、开题与中期。' },
      { title: '最近截止', value: deadlineList[0].deadline, hint: '当前最早到期节点。' },
      { title: '可调整状态', value: '开启', hint: '支持教学秘书维护。' },
    ],
    actions: [{ label: '新增节点', type: 'primary' }, { label: '批量调整时间', type: 'default' }],
    tableSection: {
      title: '时间节点设置',
      description: '统一管理毕设流程中的关键时间节点。',
      columns: [
        { prop: 'stage', label: '阶段', minWidth: 140 },
        { prop: 'deadline', label: '截止时间', minWidth: 180 },
        { prop: 'owner', label: '适用角色', minWidth: 200 },
      ],
      rows: deadlineList,
    },
    sideSections: [{ title: '设置建议', type: 'list', items: ['关键节点变更后需通知相关角色。', '建议至少预留 48 小时缓冲。'] }],
  },
  'system-rules': {
    stats: [
      { title: '评分项', value: scoringRules.length, hint: '当前采用三段式评分。' },
      { title: '总权重', value: '100%', hint: '已满足发布要求。' },
      { title: '当前版本', value: 'V1.0', hint: '当前学年评分规则。' },
    ],
    actions: [{ label: '保存规则', type: 'primary' }, { label: '重置权重', type: 'default' }],
    tableSection: {
      title: '评分规则设置',
      description: '维护指导、评阅与答辩成绩权重。',
      columns: [
        { prop: 'item', label: '评分项', minWidth: 180 },
        { prop: 'weightText', label: '权重', minWidth: 120 },
      ],
      rows: scoringRules.map((item) => ({
        item: item.item,
        weightText: `${item.weight * 100}%`,
      })),
    },
    sideSections: [{ title: '规则说明', type: 'list', items: ['权重总和必须为 100%。', '调整后应重新执行成绩汇总。'] }],
  },
}

export function getBusinessMockPage(routeName, context = {}) {
  const page = pageMocks[routeName]

  if (!page) {
    return null
  }

  if (routeName === 'taskbook-detail' && context.taskbookId) {
    return {
      ...page,
      formSection: {
        ...page.formSection,
        fields: page.formSection.fields.map((field) => {
          if (field.label === '任务书编号') {
            return {
              ...field,
              value: `TB-2026-${String(context.taskbookId).padStart(3, '0')}`,
            }
          }

          return field
        }),
      },
    }
  }

  return page
}

export function getProfileSummary(role) {
  const profile = roleProfiles[role] || roleProfiles.student
  return {
    stats: [
      { title: '当前角色', value: profile.roleLabel, hint: profile.title },
      { title: '所属组织', value: profile.orgName, hint: profile.office },
      { title: '关注重点', value: profile.focus, hint: profile.email },
    ],
    recentNotifications: notificationsByRole[role] || notificationsByRole.student,
  }
}
