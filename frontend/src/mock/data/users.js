import { ROLE_LABEL_MAP } from '@/constants/roles'

const profileSeed = {
  systemAdmin: {
    name: '陈嘉琳',
    title: '系统平台管理员',
    orgName: '教务信息中心',
    phone: '138-0000-0001',
    email: 'admin@graduation.local',
    focus: '用户与权限配置',
    office: '信息中心 302',
  },
  teachingSecretary: {
    name: '周老师',
    title: '教学秘书',
    orgName: '计算机科学与通信工程学院',
    phone: '138-0000-0002',
    email: 'secretary@graduation.local',
    focus: '成绩发布与流程组织',
    office: '学院楼 215',
  },
  collegeDean: {
    name: '李院长',
    title: '教学院长',
    orgName: '计算机科学与通信工程学院',
    phone: '138-0000-0003',
    email: 'dean@graduation.local',
    focus: '院级审核与质量监督',
    office: '学院楼 501',
  },
  majorLeader: {
    name: '张主任',
    title: '专业负责人',
    orgName: '计算机科学与通信工程专业',
    phone: '138-0000-0004',
    email: 'major@graduation.local',
    focus: '选题审核与评阅安排',
    office: '学院楼 420',
  },
  supervisor: {
    name: '王老师',
    title: '指导教师',
    orgName: '计算机科学与通信工程教研室',
    phone: '138-0000-0005',
    email: 'supervisor@graduation.local',
    focus: '选题指导与论文审核',
    office: '实验楼 B405',
  },
  reviewTeacher: {
    name: '刘老师',
    title: '评阅教师',
    orgName: '计算机科学与通信工程教研室',
    phone: '138-0000-0006',
    email: 'review@graduation.local',
    focus: '论文评阅与中期评价',
    office: '实验楼 B312',
  },
  defenseRecorder: {
    name: '赵老师',
    title: '答辩录入员',
    orgName: '计算机科学与通信工程学院',
    phone: '138-0000-0007',
    email: 'defense@graduation.local',
    focus: '答辩组织与成绩录入',
    office: '学院楼 208',
  },
  student: {
    name: '张同学',
    title: '2025届本科生',
    orgName: '计算机科学与通信工程专业',
    phone: '138-0000-0008',
    email: 'student@graduation.local',
    focus: '开题、中期与论文提交',
    office: '计算机科学与通信工程 2022级 1班',
  },
}

export const roleProfiles = Object.entries(profileSeed).reduce((result, [key, value]) => {
  result[key] = {
    role: key,
    roleLabel: ROLE_LABEL_MAP[key],
    ...value,
  }
  return result
}, {})

export const rolePermissions = {
  systemAdmin: ['dashboard:view', 'system:users', 'system:org', 'system:rules', 'score:adjustment'],
  teachingSecretary: ['dashboard:view', 'score:summary', 'score:publish', 'system:deadlines'],
  collegeDean: ['dashboard:view', 'topic:review', 'topic:publish', 'statistics:progress'],
  majorLeader: ['dashboard:view', 'topic:review', 'selection:review', 'taskbook:approval', 'review:assign'],
  supervisor: ['dashboard:view', 'topic:create', 'selection:confirm', 'proposal:review', 'paper:review'],
  reviewTeacher: ['dashboard:view', 'proposal:review', 'midterm:review', 'review:workspace'],
  defenseRecorder: ['dashboard:view', 'defense:group', 'defense:score-entry'],
  student: ['dashboard:view', 'selection:student', 'proposal:submit', 'midterm:submit', 'paper:final'],
}

export const notificationsByRole = {
  systemAdmin: [
    { id: 'n-sa-1', title: '账号同步提醒', content: '今晚 22:00 将同步统一身份认证数据。', level: 'info', time: '今天 18:20' },
    { id: 'n-sa-2', title: '评分规则待确认', content: '请核对新学年的成绩权重参数。', level: 'warning', time: '今天 14:30' },
  ],
  teachingSecretary: [
    { id: 'n-ts-1', title: '成绩发布窗口开启', content: '本周五 17:00 前需完成成绩终审。', level: 'warning', time: '今天 16:10' },
    { id: 'n-ts-2', title: '答辩名单已更新', content: '第 3 答辩组新增 2 名学生。', level: 'info', time: '今天 10:15' },
  ],
  collegeDean: [
    { id: 'n-cd-1', title: '课题待发布', content: '本专业本批次共有 34 个课题待最终发布。', level: 'warning', time: '今天 15:00' },
  ],
  majorLeader: [
    { id: 'n-ml-1', title: '双选冲突提醒', content: '目前有 4 条双选冲突记录待处理。', level: 'warning', time: '今天 11:40' },
    { id: 'n-ml-2', title: '任务书审批截止', content: '任务书审批剩余 2 天，请尽快处理。', level: 'danger', time: '今天 09:25' },
  ],
  supervisor: [
    { id: 'n-sp-1', title: '开题报告待审核', content: '你指导的 3 名学生已提交开题报告。', level: 'warning', time: '今天 13:20' },
  ],
  reviewTeacher: [
    { id: 'n-rt-1', title: '评阅任务分配完成', content: '本轮共分配 6 篇论文待评阅。', level: 'info', time: '今天 08:50' },
  ],
  defenseRecorder: [
    { id: 'n-dr-1', title: '答辩成绩录入提醒', content: '第 2 答辩组今日下午 4 点开始录入成绩。', level: 'info', time: '今天 12:00' },
  ],
  student: [
    { id: 'n-st-1', title: '开题报告提交提醒', content: '开题报告需在本周四 18:00 前提交。', level: 'warning', time: '今天 17:40' },
    { id: 'n-st-2', title: '任务书已通过', content: '你的任务书已审核通过，可继续开题准备。', level: 'success', time: '昨天 16:25' },
  ],
}
