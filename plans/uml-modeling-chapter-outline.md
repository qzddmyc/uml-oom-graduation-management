# 毕业设计管理系统 UML 建模章节写作提纲

## 1. 章节定位

本章节用于集中展示系统在分析与设计阶段的 UML 建模成果，重点体现参与者、用例、对象结构、动态交互和状态变化之间的关系。

## 2. 建议章节结构

### 2.1 用例模型

- **写作重点**：说明系统参与者、职责边界、核心业务用例及用例域划分。
- **主要来源**：`deliverables/docs/use-case-analysis.md`
- **配套图文件**：
  - `system-use-case-overview.puml/.png`
  - `management-use-cases.puml/.png`
  - `teacher-use-cases.puml/.png`
  - `student-review-defense-use-cases.puml/.png`

### 2.2 重点用例实现与顺序图

- **写作重点**：围绕跨角色、跨阶段和带审批动作的用例，说明主成功场景、异常流程和后置条件。
- **主要来源**：`deliverables/docs/use-case-realizations.md`
- **配套图文件**：
  - `sequence-topic-review.puml/.png`
  - `sequence-selection-confirmation.puml/.png`
  - `sequence-taskbook-approval.puml/.png`
  - `sequence-proposal-review.puml/.png`
  - `sequence-midterm-evaluation.puml/.png`
  - `sequence-review-assignment.puml/.png`
  - `sequence-score-publish.puml/.png`

### 2.3 领域分析与类图

- **写作重点**：说明核心领域对象、实体类/边界类/控制类划分、关键属性和对象关系。
- **主要来源**：`deliverables/docs/domain-class-design.md`
- **配套图文件**：
  - `domain-class-diagram.puml/.png`
  - `analysis-class-diagram.puml/.png`

### 2.4 活动图与状态图

- **写作重点**：补充说明跨角色业务流转和核心对象状态生命周期。
- **主要来源**：`INDEX.md` 第 8.4 节中的活动图与状态图索引
- **配套图文件**：
  - `activity-topic-selection-flow.puml/.png`
  - `activity-paper-process-flow.puml/.png`
  - `state-topic-lifecycle.puml/.png`
  - `state-paper-material-lifecycle.puml/.png`

## 3. 图文衔接建议

1. 用“需求问题 -> 用例 -> 用例实现 -> 类结构 -> 动态流程 -> 状态变化”的顺序组织本章。
2. 每类图至少配一段文字说明其表达的业务含义，而不是只列文件名。
3. 顺序图与活动图应重点强调“新增评价节点”和“多主体协同”的改进点。
4. 类图与状态图应体现材料版本、状态流转和成绩形成机制。

## 4. 建议章节结论

本章结论可围绕以下三点展开：

1. 系统的核心价值在于把多角色协作流程标准化。
2. UML 建模成果共同支撑了课题、过程材料、评阅答辩和成绩发布等核心场景。
3. 静态结构与动态行为之间保持了一致的业务语义。
