# 毕业设计管理系统前端页面规划

## 1. 规划范围

本文件用于规划毕业设计管理系统的前端页面方案，重点覆盖前端技术选型、目录结构、路由与权限设计、页面清单、开发优先级、通用组件、API 模块划分、开发顺序，以及界面截图交付清单。

该前端规划的目标包括：

1. 支撑课程作业中的界面设计、系统分析与原型展示。
2. 通过角色化页面结构，完整呈现毕业设计管理业务流程。
3. 为后续细化页面原型、路由表、组件设计和 mock 数据准备统一基础。

## 1.1 当前实现同步状态

截至目前，前端原型已在 `frontend/` 中落地，当前已完成：

1. Vue 3 + Vite + Pinia + Vue Router + Element Plus + Less 基础配置。
2. 统一布局、路由守卫、角色切换、登录页与仪表盘。
3. mock 数据层、API 包装层与通用组件层。
4. 全量业务路由对应的原型页面。
5. 课题列表、课题申报、学生选题、任务书审批、成绩汇总等重点页面的强化交互。

当前未完成的前端相关收尾项主要是：**界面截图整理、展示说明整理，以及必要时继续做体积优化与交互微调。**

## 2. 技术选型

| 层次 | 方案 |
|---|---|
| 构建工具 | Vite |
| 前端框架 | Vue 3 |
| 开发语言 | JavaScript |
| 路由管理 | Vue Router |
| 状态管理 | Pinia |
| UI 组件库 | Element Plus |
| 请求封装 | Axios |
| 图表展示 | ECharts |
| 数据方式 | 本地 mock 模块 + 静态 JSON / JS 数据 |
| 文档与绘图 | Markdown + PlantUML + draw.io |

## 3. 页面设计原则

1. 以角色和业务流程为核心组织页面，而不是单纯按技术模块拆分。
2. 一个关键流程对应一组可识别的页面。
3. 页面命名与文案优先保留业务术语，如课题、任务书、开题报告、中期检查、评阅、答辩、总评。
4. 即使使用 mock 数据，也统一通过 API 模块访问数据。
5. 权限控制同时覆盖路由级权限和操作级权限。

## 4. 当前目录结构（核心部分）

```text
frontend
  ├── public
  ├── src
  │   ├── assets
  │   ├── components
  │   │   └── common
  │   ├── layout
  │   ├── router
  │   ├── stores
  │   ├── views
  │   │   ├── dashboard
  │   │   ├── business
  │   │   ├── public
  │   │   └── workspace
  │   ├── api
  │   ├── mock
  │   │   ├── modules
  │   │   ├── data
  │   │   └── shared.js
  │   ├── utils
  │   ├── constants
  │   ├── styles
  │   ├── App.vue
  │   └── main.js
  ├── package.json
  ├── vite.config.js
  └── README.md
```

## 5. 路由与权限设计

### 5.1 角色集合

- 系统管理员
- 教学秘书
- 教学院长
- 专业负责人
- 指导教师
- 评阅教师
- 答辩录入员
- 学生

### 5.2 权限设计原则

权限建议分为三层：

1. **路由权限**：控制某个角色能否进入某个页面。
2. **操作权限**：控制新增、审核、发布、导出、调整等按钮行为。
3. **数据范围权限**：控制查看全校、学院、本专业、本人或本人所带学生的数据。

推荐在路由 `meta` 中保留以下字段：

```js
meta: {
  title: '课题管理',
  roles: ['systemAdmin', 'majorLeader', 'supervisor', 'student'],
  permissionKey: 'topic:view',
  keepAlive: true
}
```

### 5.3 路由层次

```text
/
├── /login
├── /select-role
├── /403
├── /404
├── /dashboard
├── /profile
├── /notifications
├── /topic
│   ├── /topic/list
│   ├── /topic/create
│   ├── /topic/review
│   └── /topic/publish
├── /selection
│   ├── /selection/student
│   ├── /selection/confirm
│   └── /selection/review
├── /taskbook
│   ├── /taskbook/detail/:id
│   └── /taskbook/approval
├── /proposal
│   ├── /proposal/submit
│   └── /proposal/review
├── /midterm
│   ├── /midterm/submit
│   └── /midterm/review
├── /paper
│   ├── /paper/draft
│   ├── /paper/final
│   └── /paper/review
├── /review
│   ├── /review/assign
│   └── /review/workspace
├── /defense
│   ├── /defense/group
│   └── /defense/score-entry
├── /score
│   ├── /score/summary
│   ├── /score/publish
│   └── /score/adjustment
├── /statistics
│   ├── /statistics/progress
│   ├── /statistics/topic
│   └── /statistics/score
├── /archive
│   ├── /archive/query
│   └── /archive/export
└── /system
    ├── /system/users
    ├── /system/org
    ├── /system/deadlines
    └── /system/rules
```

### 5.4 导航策略

侧边菜单建议由路由配置动态生成，并根据角色过滤。首页仪表盘中的快捷入口也应按角色区分，使不同角色优先看到各自最重要的待办事项。

## 6. 页面清单

### 6.1 公共页与通用页

| 模块 | 页面 | 路径 | 主要角色 | 优先级 |
|---|---|---|---|---|
| 公共 | 登录页 | `/login` | 全部角色 | P0 |
| 公共 | 角色切换页 | `/select-role` | 全部角色 | P0 |
| 通用 | 首页仪表盘 | `/dashboard` | 全部登录角色 | P0 |
| 通用 | 个人中心 | `/profile` | 全部登录角色 | P2 |
| 通用 | 消息中心 | `/notifications` | 全部登录角色 | P2 |

### 6.2 课题与选题模块

| 模块 | 页面 | 路径 | 主要角色 | 优先级 |
|---|---|---|---|---|
| 课题管理 | 课题列表页 | `/topic/list` | 多角色共享 | P1 |
| 课题管理 | 课题申报页 | `/topic/create` | 指导教师、学生 | P1 |
| 课题管理 | 课题审核页 | `/topic/review` | 专业负责人、教学院长 | P1 |
| 课题管理 | 课题发布页 | `/topic/publish` | 教学院长、专业负责人 | P2 |
| 选题管理 | 学生选题页 | `/selection/student` | 学生 | P1 |
| 选题管理 | 教师确认页 | `/selection/confirm` | 指导教师 | P1 |
| 选题管理 | 双选审核页 | `/selection/review` | 专业负责人 | P1 |

### 6.3 过程材料模块

| 模块 | 页面 | 路径 | 主要角色 | 优先级 |
|---|---|---|---|---|
| 任务书 | 任务书详情页 | `/taskbook/detail/:id` | 学生、指导教师、专业负责人 | P1 |
| 任务书 | 任务书审批页 | `/taskbook/approval` | 专业负责人 | P1 |
| 开题 | 开题报告提交页 | `/proposal/submit` | 学生 | P1 |
| 开题 | 开题报告审核页 | `/proposal/review` | 指导教师、评价教师 | P1 |
| 中期 | 中期检查提交页 | `/midterm/submit` | 学生 | P1 |
| 中期 | 中期检查审核页 | `/midterm/review` | 指导教师、评价教师、专业负责人 | P1 |
| 论文 | 初稿提交页 | `/paper/draft` | 学生 | P2 |
| 论文 | 定稿提交页 | `/paper/final` | 学生 | P2 |
| 论文 | 论文审核页 | `/paper/review` | 指导教师 | P2 |

### 6.4 评阅、答辩与成绩模块

| 模块 | 页面 | 路径 | 主要角色 | 优先级 |
|---|---|---|---|---|
| 评阅 | 评阅教师分配页 | `/review/assign` | 专业负责人 | P2 |
| 评阅 | 评阅工作台 | `/review/workspace` | 评阅教师 | P2 |
| 答辩 | 答辩分组管理页 | `/defense/group` | 专业负责人、答辩录入员 | P2 |
| 答辩 | 答辩成绩录入页 | `/defense/score-entry` | 答辩录入员 | P2 |
| 成绩 | 成绩汇总页 | `/score/summary` | 教学秘书、专业负责人 | P2 |
| 成绩 | 成绩发布页 | `/score/publish` | 教学秘书 | P2 |
| 成绩 | 成绩调整页 | `/score/adjustment` | 教学秘书、系统管理员 | P3 |

### 6.5 统计、归档与系统管理模块

| 模块 | 页面 | 路径 | 主要角色 | 优先级 |
|---|---|---|---|---|
| 统计 | 进度统计页 | `/statistics/progress` | 管理角色 | P3 |
| 统计 | 课题统计页 | `/statistics/topic` | 管理角色 | P3 |
| 统计 | 成绩统计页 | `/statistics/score` | 管理角色 | P3 |
| 归档 | 历史归档查询页 | `/archive/query` | 管理角色 | P3 |
| 归档 | 导出中心页 | `/archive/export` | 管理角色 | P3 |
| 系统管理 | 用户管理页 | `/system/users` | 系统管理员、教学秘书 | P3 |
| 系统管理 | 组织管理页 | `/system/org` | 系统管理员 | P3 |
| 系统管理 | 时间节点设置页 | `/system/deadlines` | 系统管理员、教学秘书 | P3 |
| 系统管理 | 评分规则设置页 | `/system/rules` | 系统管理员 | P3 |

## 7. 页面开发优先级

### P0：项目可演示基础能力

- 登录页
- 角色切换页
- 首页仪表盘
- 基础布局、侧边菜单、面包屑、权限拦截

### P1：主业务流程展示

- 课题管理
- 学生选题
- 任务书
- 开题报告
- 中期检查

### P2：完整流程闭环

- 论文提交与审核
- 评阅教师分配
- 答辩分组
- 答辩成绩录入
- 成绩汇总与发布

### P3：管理增强模块

- 统计分析
- 历史归档
- 系统配置
- 成绩调整与特殊处理

## 8. 关键通用组件说明

| 组件 | 作用 |
|---|---|
| `AppShell` | 系统主布局，包含顶部栏、侧边栏、面包屑和内容区 |
| `RoleBadge` | 角色标签展示 |
| `StatusTag` | 流程状态统一显示 |
| `FilterBar` | 查询、筛选、重置、导出等操作栏 |
| `PageTable` | 表格、分页、加载状态的统一封装 |
| `FormDialog` | 新增、编辑、审核类弹窗封装 |
| `ProcessTimeline` | 毕设流程时间轴展示 |
| `MaterialCard` | 展示任务书、开题、中期、论文等材料信息 |
| `ScorePanel` | 展示指导、评阅、答辩等多来源成绩 |
| `ReviewActionBar` | 通过、驳回、退回修改等审核操作区域 |
| `DefenseGroupBoard` | 答辩分组与人员安排视图 |
| `StatCard` | 首页与统计页概览卡片 |
| `ChartPanel` | 图表容器封装 |
| `PermissionButton` | 带权限控制的按钮组件 |

## 9. API 模块说明

即使前端仅使用 mock 数据，也建议按业务领域拆分 API 模块，以便后续替换真实后端。

```text
frontend
  └── src
      └── api
          ├── auth.js
          ├── user.js
          ├── topic.js
          ├── selection.js
          ├── taskbook.js
          ├── proposal.js
          ├── midterm.js
          ├── paper.js
          ├── review.js
          ├── defense.js
          ├── score.js
          ├── statistics.js
          ├── archive.js
          └── system.js
```

各模块职责建议如下：

| 模块 | 职责 |
|---|---|
| `auth.js` | 登录、退出、当前角色、权限集合 |
| `user.js` | 个人信息、角色切换、通知摘要 |
| `topic.js` | 课题列表、申报、审核、发布 |
| `selection.js` | 学生选题、教师确认、双选审核 |
| `taskbook.js` | 任务书详情、提交、审批 |
| `proposal.js` | 开题报告提交、审核、评价 |
| `midterm.js` | 中期检查提交、审核、评分 |
| `paper.js` | 初稿/定稿提交、论文审核状态 |
| `review.js` | 评阅教师分配、评阅结果 |
| `defense.js` | 答辩分组、答辩安排、成绩录入 |
| `score.js` | 成绩汇总、发布、调整 |
| `statistics.js` | 进度统计、课题统计、成绩图表 |
| `archive.js` | 历史归档查询、材料导出 |
| `system.js` | 用户、组织、时间节点、评分规则 |

## 10. Mock 数据设计

mock 层建议拆分为两部分：

1. **静态数据集**：角色、用户、课题、过程材料、答辩组、成绩样本。
2. **场景响应数据**：列表查询、详情查询、提交、审核、分配、发布、导出。

推荐结构如下：

```text
frontend
  └── src
      └── mock
          ├── modules
          │   ├── auth.mock.js
          │   ├── user.mock.js
          │   ├── topic.mock.js
          │   ├── selection.mock.js
          │   ├── process.mock.js
          │   ├── review.mock.js
          │   ├── defense.mock.js
          │   ├── score.mock.js
          │   ├── statistics.mock.js
          │   └── archive.mock.js
          └── data
```

## 11. 开发顺序与当前落地情况

建议按以下顺序推进前端实现：

1. 初始化工程结构与依赖 **（已完成）**
2. 完成布局系统、路由系统、权限拦截、mock 登录 **（已完成）**
3. 完成通用组件与公共工具函数 **（已完成）**
4. 完成首页仪表盘与角色快捷入口 **（已完成）**
5. 完成课题与选题模块 **（已完成）**
6. 完成任务书、开题、中期模块 **（已完成）**
7. 完成论文、评阅、答辩、成绩模块 **（已完成）**
8. 完成统计、归档、系统管理模块 **（已完成）**
9. 完成界面统一、截图整理与演示流程优化 **（截图整理待完成，其余已基本完成）**

## 12. 界面截图清单

界面设计成果建议至少准备以下截图或原型导出图：

1. 登录页
2. 首页仪表盘
3. 课题列表页
4. 课题申报页
5. 课题审核页
6. 学生选题页
7. 任务书详情 / 审批页
8. 开题报告提交 / 审核页
9. 中期检查提交 / 审核页
10. 论文提交页
11. 评阅教师分配页
12. 评阅工作台
13. 答辩分组管理页
14. 答辩成绩录入页
15. 成绩汇总 / 发布页
16. 统计分析页
17. 归档查询 / 导出页
18. 用户与时间节点设置页

## 13. 建议形成的前端交付物

前端相关成果可整理为以下内容：

1. 页面结构图
2. 路由与权限对照表
3. 核心页面原型
4. 通用组件清单
5. API 模块清单
6. 界面截图附录

本文件可作为后续细化页面原型、路由表、mock 数据文件和前端任务拆分的直接基础。
