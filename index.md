# 项目索引

本文件用于快速定位本仓库的主要设计文档、规划文件、UML 图与前端原型入口。

## 1. 建议阅读顺序

1. [`docs/Requirement.md`](docs/Requirement.md)：课程要求与任务范围
2. [`README.md`](README.md)：仓库简介、`index.md` 入口说明与前端打包步骤
3. [`plans/project-todo.md`](plans/project-todo.md)：总任务清单与完成状态
4. [`plans/rough-implementation-plan.md`](plans/rough-implementation-plan.md)：项目总体粗略规划
5. [`plans/frontend-page-plan.md`](plans/frontend-page-plan.md)：前端页面规划与当前实现同步
6. [`frontend/README.md`](frontend/README.md)：前端原型说明与打包步骤
7. [`deliverables/docs/requirements-analysis.md`](deliverables/docs/requirements-analysis.md)：需求获取与问题分析
8. [`deliverables/docs/use-case-analysis.md`](deliverables/docs/use-case-analysis.md)：参与者与用例分析
9. [`deliverables/docs/use-case-realizations.md`](deliverables/docs/use-case-realizations.md)：重点用例实现
10. [`deliverables/docs/domain-class-design.md`](deliverables/docs/domain-class-design.md)：领域分析与类图设计
11. [`deliverables/docs/system-design.md`](deliverables/docs/system-design.md)：技术方案、包图与构件图设计
12. [`deliverables/docs/database-design.md`](deliverables/docs/database-design.md)：数据库设计
13. [`deliverables/docs/deployment-design.md`](deliverables/docs/deployment-design.md)：部署设计与运行环境说明

## 2. 根目录说明

```text
.
├── .github
├── deliverables
│   ├── docs
│   ├── render
│   └── uml
├── docs
├── frontend
├── plans
├── index.md
└── README.md
```

## 3. docs 目录

| 文件 | 作用 |
|---|---|
| [`docs/Requirement.md`](docs/Requirement.md) | 课程要求、交付范围与时间要求 |
| [`docs/Workflow.md`](docs/Workflow.md) | 业务流程、角色职责、三种选题路径 |
| [`docs/Blueprint.md`](docs/Blueprint.md) | 课程进度、评分规则与阶段安排 |

## 4. plans 目录

| 文件 | 作用 |
|---|---|
| [`plans/project-todo.md`](plans/project-todo.md) | 项目完整任务清单与当前进度 |
| [`plans/rough-implementation-plan.md`](plans/rough-implementation-plan.md) | 项目总体规划 |
| [`plans/frontend-page-plan.md`](plans/frontend-page-plan.md) | 前端页面、路由、权限、组件与开发顺序规划 |

## 5. deliverables 目录

| 文件 | 作用 |
|---|---|
| `deliverables/docs/` | 正式文字成果目录 |
| `deliverables/uml/` | PlantUML 源文件目录 |
| `deliverables/render/` | 由 PlantUML 源文件渲染生成的图片目录 |

### 5.1 deliverables/docs

| 文件 | 作用 |
|---|---|
| [`deliverables/docs/team-and-deliverables.md`](deliverables/docs/team-and-deliverables.md) | 小组分工与交付物规范 |
| [`deliverables/docs/requirements-analysis.md`](deliverables/docs/requirements-analysis.md) | 需求获取方案、访谈设计、问题分析、业务范围 |
| [`deliverables/docs/use-case-analysis.md`](deliverables/docs/use-case-analysis.md) | 参与者识别、角色职责矩阵、用例清单 |
| [`deliverables/docs/use-case-realizations.md`](deliverables/docs/use-case-realizations.md) | 重点用例实现 |
| [`deliverables/docs/domain-class-design.md`](deliverables/docs/domain-class-design.md) | 核心领域对象、类关系、类图说明 |
| [`deliverables/docs/system-design.md`](deliverables/docs/system-design.md) | 技术路线、分层、包图、构件图说明 |
| [`deliverables/docs/database-design.md`](deliverables/docs/database-design.md) | 数据表、字段、关系、ER 图说明 |
| [`deliverables/docs/deployment-design.md`](deliverables/docs/deployment-design.md) | 部署方案与运行环境说明 |

## 6. 前端原型目录

| 文件 / 目录 | 作用 |
|---|---|
| [`frontend/README.md`](frontend/README.md) | 前端原型说明、运行与打包步骤 |
| `frontend/src/router/` | 路由、权限和页面入口 |
| `frontend/src/views/` | 登录页、仪表盘、业务页与工作台页面 |
| `frontend/src/mock/` | mock 数据源、模块与统一模拟请求封装 |
| `frontend/src/components/common/` | 通用统计卡片、筛选栏、表格卡片、信息面板等组件 |
| `frontend/dist/` | 生产构建后的静态文件输出目录 |

## 7. UML 与设计图索引

### 7.1 用例图

| 文件 | 说明 | 渲染图 |
|---|---|---|
| [`deliverables/uml/system-use-case-overview.puml`](deliverables/uml/system-use-case-overview.puml) | 系统总用例图 | [`system-use-case-overview.png`](deliverables/render/system-use-case-overview.png) |
| [`deliverables/uml/management-use-cases.puml`](deliverables/uml/management-use-cases.puml) | 管理侧用例图 | [`management-use-cases.png`](deliverables/render/management-use-cases.png) |
| [`deliverables/uml/teacher-use-cases.puml`](deliverables/uml/teacher-use-cases.puml) | 教师侧用例图 | [`teacher-use-cases.png`](deliverables/render/teacher-use-cases.png) |
| [`deliverables/uml/student-review-defense-use-cases.puml`](deliverables/uml/student-review-defense-use-cases.puml) | 学生 / 评阅 / 答辩侧用例图 | [`student-review-defense-use-cases.png`](deliverables/render/student-review-defense-use-cases.png) |

### 7.2 类图

| 文件 | 说明 | 渲染图 |
|---|---|---|
| [`deliverables/uml/domain-class-diagram.puml`](deliverables/uml/domain-class-diagram.puml) | 领域类图 | [`domain-class-diagram.png`](deliverables/render/domain-class-diagram.png) |
| [`deliverables/uml/analysis-class-diagram.puml`](deliverables/uml/analysis-class-diagram.puml) | 分析类图 / 设计类图 | [`analysis-class-diagram.png`](deliverables/render/analysis-class-diagram.png) |

### 7.3 顺序图

| 文件 | 说明 | 渲染图 |
|---|---|---|
| [`deliverables/uml/sequence-topic-review.puml`](deliverables/uml/sequence-topic-review.puml) | 课题申报与审核发布 | [`sequence-topic-review.png`](deliverables/render/sequence-topic-review.png) |
| [`deliverables/uml/sequence-selection-confirmation.puml`](deliverables/uml/sequence-selection-confirmation.puml) | 学生选题与教师确认 | [`sequence-selection-confirmation.png`](deliverables/render/sequence-selection-confirmation.png) |
| [`deliverables/uml/sequence-taskbook-approval.puml`](deliverables/uml/sequence-taskbook-approval.puml) | 任务书下达与审批 | [`sequence-taskbook-approval.png`](deliverables/render/sequence-taskbook-approval.png) |
| [`deliverables/uml/sequence-proposal-review.puml`](deliverables/uml/sequence-proposal-review.puml) | 开题报告审核与评价 | [`sequence-proposal-review.png`](deliverables/render/sequence-proposal-review.png) |
| [`deliverables/uml/sequence-midterm-evaluation.puml`](deliverables/uml/sequence-midterm-evaluation.puml) | 中期检查评价 | [`sequence-midterm-evaluation.png`](deliverables/render/sequence-midterm-evaluation.png) |
| [`deliverables/uml/sequence-review-assignment.puml`](deliverables/uml/sequence-review-assignment.puml) | 评阅教师分配 | [`sequence-review-assignment.png`](deliverables/render/sequence-review-assignment.png) |
| [`deliverables/uml/sequence-score-publish.puml`](deliverables/uml/sequence-score-publish.puml) | 答辩成绩录入与总评发布 | [`sequence-score-publish.png`](deliverables/render/sequence-score-publish.png) |

### 7.4 活动图与状态图

| 文件 | 说明 | 渲染图 |
|---|---|---|
| [`deliverables/uml/activity-topic-selection-flow.puml`](deliverables/uml/activity-topic-selection-flow.puml) | 课题与选题流程活动图 | [`activity-topic-selection-flow.png`](deliverables/render/activity-topic-selection-flow.png) |
| [`deliverables/uml/activity-paper-process-flow.puml`](deliverables/uml/activity-paper-process-flow.puml) | 论文全过程活动图 | [`activity-paper-process-flow.png`](deliverables/render/activity-paper-process-flow.png) |
| [`deliverables/uml/state-topic-lifecycle.puml`](deliverables/uml/state-topic-lifecycle.puml) | 课题状态图 | [`state-topic-lifecycle.png`](deliverables/render/state-topic-lifecycle.png) |
| [`deliverables/uml/state-paper-material-lifecycle.puml`](deliverables/uml/state-paper-material-lifecycle.puml) | 论文材料状态图 | [`state-paper-material-lifecycle.png`](deliverables/render/state-paper-material-lifecycle.png) |

### 7.5 系统设计图

| 文件 | 说明 | 渲染图 |
|---|---|---|
| [`deliverables/uml/package-diagram.puml`](deliverables/uml/package-diagram.puml) | 包图 | [`package-diagram.png`](deliverables/render/package-diagram.png) |
| [`deliverables/uml/component-diagram.puml`](deliverables/uml/component-diagram.puml) | 构件图 | [`component-diagram.png`](deliverables/render/component-diagram.png) |
| [`deliverables/uml/database-er-diagram.puml`](deliverables/uml/database-er-diagram.puml) | 数据库 ER 图 | [`database-er-diagram.png`](deliverables/render/database-er-diagram.png) |
| [`deliverables/uml/deployment-diagram.puml`](deliverables/uml/deployment-diagram.puml) | 部署图 | [`deployment-diagram.png`](deliverables/render/deployment-diagram.png) |

## 8. 当前进度位置

截至目前，**分析建模成果与前端 mock 原型均已形成**，当前后续重点为：

1. 整理界面截图与展示说明
2. 补齐需求获取实施结果
3. 编写设计报告正文
4. 准备 PPT 与录屏材料
