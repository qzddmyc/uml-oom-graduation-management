# 项目索引

本文件用于快速定位本仓库的主要设计文档、规划文件与 UML 图。

## 1. 建议阅读顺序

1. [`docs/Requirement.md`](docs/Requirement.md)：课程要求与任务范围
2. [`README.md`](README.md)：仓库简介与当前技术路线
3. [`plans/project-todo.md`](plans/project-todo.md)：总任务清单与完成状态
4. [`plans/rough-implementation-plan.md`](plans/rough-implementation-plan.md)：项目总体粗略规划
5. [`deliverables/docs/requirements-analysis.md`](deliverables/docs/requirements-analysis.md)：需求获取与问题分析
6. [`deliverables/docs/use-case-analysis.md`](deliverables/docs/use-case-analysis.md)：参与者与用例分析
7. [`deliverables/docs/use-case-realizations.md`](deliverables/docs/use-case-realizations.md)：重点用例实现
8. [`deliverables/docs/domain-class-design.md`](deliverables/docs/domain-class-design.md)：领域分析与类图设计
9. [`deliverables/docs/system-design.md`](deliverables/docs/system-design.md)：技术方案、包图与构件图设计
10. [`deliverables/docs/database-design.md`](deliverables/docs/database-design.md)：数据库设计
11. [`deliverables/docs/deployment-design.md`](deliverables/docs/deployment-design.md)：部署设计与运行环境说明
12. [`plans/frontend-page-plan.md`](plans/frontend-page-plan.md)：前端页面规划

## 2. 根目录说明

```text
    .
    ├── .github
    ├── deliverables
    │   ├── docs
    │   └── uml
    ├── docs
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
| `deliverables/uml/` | UML、ER 与部署图目录 |

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

## 6. UML 与设计图索引

### 6.1 用例图

| 文件 | 说明 |
|---|---|
| [`deliverables/uml/system-use-case-overview.puml`](deliverables/uml/system-use-case-overview.puml) | 系统总用例图 |
| [`deliverables/uml/management-use-cases.puml`](deliverables/uml/management-use-cases.puml) | 管理侧用例图 |
| [`deliverables/uml/teacher-use-cases.puml`](deliverables/uml/teacher-use-cases.puml) | 教师侧用例图 |
| [`deliverables/uml/student-review-defense-use-cases.puml`](deliverables/uml/student-review-defense-use-cases.puml) | 学生 / 评阅 / 答辩侧用例图 |

### 6.2 类图

| 文件 | 说明 |
|---|---|
| [`deliverables/uml/domain-class-diagram.puml`](deliverables/uml/domain-class-diagram.puml) | 领域类图 |
| [`deliverables/uml/analysis-class-diagram.puml`](deliverables/uml/analysis-class-diagram.puml) | 分析类图 / 设计类图 |

### 6.3 顺序图

| 文件 | 说明 |
|---|---|
| [`deliverables/uml/sequence-topic-review.puml`](deliverables/uml/sequence-topic-review.puml) | 课题申报与审核发布 |
| [`deliverables/uml/sequence-selection-confirmation.puml`](deliverables/uml/sequence-selection-confirmation.puml) | 学生选题与教师确认 |
| [`deliverables/uml/sequence-taskbook-approval.puml`](deliverables/uml/sequence-taskbook-approval.puml) | 任务书下达与审批 |
| [`deliverables/uml/sequence-proposal-review.puml`](deliverables/uml/sequence-proposal-review.puml) | 开题报告审核与评价 |
| [`deliverables/uml/sequence-midterm-evaluation.puml`](deliverables/uml/sequence-midterm-evaluation.puml) | 中期检查评价 |
| [`deliverables/uml/sequence-review-assignment.puml`](deliverables/uml/sequence-review-assignment.puml) | 评阅教师分配 |
| [`deliverables/uml/sequence-score-publish.puml`](deliverables/uml/sequence-score-publish.puml) | 答辩成绩录入与总评发布 |

### 6.4 活动图与状态图

| 文件 | 说明 |
|---|---|
| [`deliverables/uml/activity-topic-selection-flow.puml`](deliverables/uml/activity-topic-selection-flow.puml) | 课题与选题流程活动图 |
| [`deliverables/uml/activity-paper-process-flow.puml`](deliverables/uml/activity-paper-process-flow.puml) | 论文全过程活动图 |
| [`deliverables/uml/state-topic-lifecycle.puml`](deliverables/uml/state-topic-lifecycle.puml) | 课题状态图 |
| [`deliverables/uml/state-paper-material-lifecycle.puml`](deliverables/uml/state-paper-material-lifecycle.puml) | 论文材料状态图 |

### 6.5 系统设计图

| 文件 | 说明 |
|---|---|
| [`deliverables/uml/package-diagram.puml`](deliverables/uml/package-diagram.puml) | 包图 |
| [`deliverables/uml/component-diagram.puml`](deliverables/uml/component-diagram.puml) | 构件图 |
| [`deliverables/uml/database-er-diagram.puml`](deliverables/uml/database-er-diagram.puml) | 数据库 ER 图 |
| [`deliverables/uml/deployment-diagram.puml`](deliverables/uml/deployment-diagram.puml) | 部署图 |

## 7. 当前进度位置

截至目前，**前端页面设计之前的分析与建模内容已完成**，下一阶段可以继续：

1. 细化页面信息架构
2. 细化路由与权限对照表
3. 设计页面原型与界面截图
4. 开始整理设计报告正文
