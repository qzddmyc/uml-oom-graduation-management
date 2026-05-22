# 毕业设计管理系统数据库设计

## 1. 设计目标

数据库设计用于表达系统的核心数据结构、数据关联关系与状态管理机制，支撑课程要求中的“数据库设计”成果。

虽然演示原型阶段采用 Mock 数据，但数据库设计仍按完整系统思路进行。

## 2. 设计原则

1. 以业务流程为主线组织数据结构
2. 一个学生在同一届毕业设计中只保留一个正式课题关系
3. 过程材料、评价记录、答辩记录、成绩单均应保留状态字段
4. 重要对象保留提交时间、审核时间、发布状态等审计信息
5. 统计和归档以业务数据汇总为基础，不单独替代业务明细表

## 3. 核心数据表

### 3.1 组织与权限

| 表名 | 说明 | 关键字段 |
|---|---|---|
| `user` | 用户基础信息 | user_id, account, name, status, college_id, major_id |
| `role` | 角色定义 | role_id, role_code, role_name |
| `user_role` | 用户角色关系 | id, user_id, role_id |
| `college` | 学院信息 | college_id, college_name |
| `major` | 专业信息 | major_id, major_name, college_id |
| `class_group` | 班级信息 | class_id, class_name, major_id |

### 3.2 课题与选题

| 表名 | 说明 | 关键字段 |
|---|---|---|
| `topic` | 课题信息 | topic_id, title, source_type, proposer_id, major_id, status |
| `topic_review` | 课题审核记录 | review_id, topic_id, reviewer_id, review_result, review_comment, review_time |
| `topic_selection` | 学生选题志愿或确认记录 | selection_id, topic_id, student_id, priority_no, confirm_status |

### 3.3 过程材料

| 表名 | 说明 | 关键字段 |
|---|---|---|
| `task_book` | 任务书 | task_book_id, topic_id, student_id, supervisor_id, status, submit_time, approve_time |
| `proposal_report` | 开题报告 | proposal_id, topic_id, student_id, version_no, status, submit_time |
| `midterm_report` | 中期检查 | midterm_id, topic_id, student_id, version_no, status, submit_time |
| `translation_task` | 外文翻译材料 | translation_id, topic_id, student_id, status, submit_time |
| `thesis_material` | 论文初稿/定稿材料 | material_id, topic_id, student_id, material_type, version_no, status |
| `weekly_progress` | 周进展记录 | progress_id, topic_id, student_id, week_no, content, status |

### 3.4 评阅与答辩

| 表名 | 说明 | 关键字段 |
|---|---|---|
| `review_assignment` | 评阅教师分配 | assignment_id, topic_id, student_id, reviewer_id, status |
| `review_record` | 评阅结果 | review_record_id, assignment_id, score, comment, submit_time |
| `defense_group` | 答辩组 | group_id, major_id, group_name, defense_time, location |
| `defense_group_member` | 答辩组成员 | id, group_id, student_id |
| `defense_record` | 答辩成绩记录 | defense_record_id, group_id, student_id, recorder_id, defense_score |

### 3.5 成绩、规则与归档

| 表名 | 说明 | 关键字段 |
|---|---|---|
| `score_sheet` | 总成绩单 | score_sheet_id, student_id, guide_score, review_score, defense_score, final_score, publish_status |
| `deadline_rule` | 时间节点规则 | rule_id, college_id, stage_code, start_time, end_time |
| `adjustment_request` | 调整申请 | request_id, request_type, target_id, applicant_id, status |
| `archive_record` | 归档记录 | archive_id, student_id, archive_year, status |
| `export_task` | 导出任务记录 | export_id, export_type, operator_id, status |

## 4. 关键关系说明

1. `college` 与 `major` 为一对多关系。
2. `major` 与 `class_group` 为一对多关系。
3. `user` 与 `role` 通过 `user_role` 形成多对多关系。
4. `topic` 与 `topic_review` 为一对多关系。
5. `topic` 与 `topic_selection` 为一对多关系。
6. `topic` 与 `task_book`、`proposal_report`、`midterm_report`、`thesis_material` 等为一对多或一对一阶段性关系。
7. `review_assignment` 与 `review_record` 为一对一或一对多关系。
8. `defense_group` 与 `defense_group_member` 为一对多关系。
9. `student` 与 `score_sheet` 为一对一关系。

## 5. 状态字段建议

### 5.1 课题状态

- 草稿
- 待审核
- 审核通过
- 审核驳回
- 已发布
- 已选定
- 已调整
- 已关闭

### 5.2 材料状态

- 未提交
- 已提交
- 审核中
- 退回修改
- 已通过
- 已归档

### 5.3 成绩状态

- 待评分
- 指导已评分
- 评阅已评分
- 答辩已录入
- 待发布
- 已发布
- 调整中

## 6. 成绩计算说明

根据 `Blueprint.md`，总评成绩采用以下权重：

- 指导教师评分：30%
- 评阅教师评分：30%
- 答辩小组成绩：40%

系统中 `score_sheet.final_score` 可按上述规则计算生成。

## 7. 数据库设计成果清单

```text
deliverables
  ├── uml
  │   └── database-er-diagram.puml
  └── render
      └── database-er-diagram.png
```

## 8. 结论

数据库设计应重点支撑以下建模需求：

1. 角色与组织关系管理
2. 课题与学生的正式绑定关系
3. 过程材料的生命周期管理
4. 评阅、答辩、总评三段式成绩组织
5. 统计、导出、归档和调整流程的数据追踪
