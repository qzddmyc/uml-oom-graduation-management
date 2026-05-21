# 毕业设计（论文）管理系统领域分析与类图设计

## 1. 设计目标

领域分析的目标是从业务流程中提炼稳定的核心对象、对象关系与职责边界，为类图、数据库设计、顺序图和状态图提供统一语义基础。

## 2. 核心领域对象

### 2.1 组织与权限对象

- 用户（User）
- 角色（Role）
- 学院（College）
- 专业（Major）
- 班级（ClassGroup）
- 用户角色关系（UserRole）

### 2.2 课题与选题对象

- 课题（Topic）
- 课题审核记录（TopicReview）
- 选题记录（TopicSelection）

### 2.3 过程材料对象

- 任务书（TaskBook）
- 开题报告（ProposalReport）
- 中期检查（MidtermReport）
- 外文翻译（TranslationTask）
- 论文材料（ThesisMaterial）

### 2.4 评价与答辩对象

- 评阅分配（ReviewAssignment）
- 评阅记录（ReviewRecord）
- 答辩组（DefenseGroup）
- 答辩成员（DefenseMember）
- 答辩记录（DefenseRecord）
- 成绩单（ScoreSheet）

### 2.5 管理与服务对象

- 时间规则（DeadlineRule）
- 导出任务（ExportTask）
- 归档记录（ArchiveRecord）
- 特殊情况处理单（AdjustmentRequest）

## 3. 实体类、边界类、控制类划分

### 3.1 实体类

```text
    User
    Role
    College
    Major
    Topic
    TopicSelection
    TaskBook
    ProposalReport
    MidtermReport
    ThesisMaterial
    ReviewAssignment
    ReviewRecord
    DefenseGroup
    DefenseRecord
    ScoreSheet
    ArchiveRecord
```

### 3.2 边界类

```text
    TopicSubmissionPage
    TopicReviewPage
    SelectionPage
    TaskBookApprovalPage
    ProposalReviewPage
    MidtermReviewPage
    ReviewAssignmentPage
    DefenseScoreEntryPage
    ScorePublishPage
```

### 3.3 控制类

```text
    TopicController
    SelectionController
    TaskBookController
    ProposalController
    MidtermController
    ReviewController
    DefenseController
    ScoreController
    StatisticsController
```

## 4. 核心类属性设计

| 类 | 关键属性 |
|---|---|
| User | userId, name, account, status, collegeId, majorId |
| Role | roleId, roleName, roleCode |
| Topic | topicId, title, sourceType, status, teacherId, studentId, majorId |
| TopicSelection | selectionId, topicId, studentId, priority, confirmStatus |
| TaskBook | taskBookId, topicId, studentId, supervisorId, status, submitTime, approveTime |
| ProposalReport | proposalId, topicId, studentId, versionNo, status, submitTime |
| MidtermReport | midtermId, topicId, studentId, status, submitTime, reviewTime |
| ThesisMaterial | materialId, topicId, studentId, materialType, versionNo, status |
| ReviewAssignment | assignmentId, topicId, studentId, reviewerId, status |
| ReviewRecord | reviewId, assignmentId, reviewerId, score, comment, submitTime |
| DefenseGroup | groupId, majorId, groupName, defenseTime, location |
| DefenseRecord | defenseRecordId, groupId, studentId, defenseScore, recorderId |
| ScoreSheet | scoreSheetId, studentId, guideScore, reviewScore, defenseScore, finalScore, publishStatus |
| DeadlineRule | ruleId, collegeId, stageCode, startTime, endTime |
| ArchiveRecord | archiveId, studentId, archiveYear, status |

## 5. 核心关系设计

1. 一个用户可以拥有多个角色，一个角色也可分配给多个用户。
2. 一个课题可由教师或学生发起，但最终只对应一个正式选题结果。
3. 一个学生在一个毕业设计周期中只应有一个正式课题。
4. 一个课题关联多个过程材料：任务书、开题报告、中期检查、论文材料。
5. 一个论文评阅分配对应一个评阅教师，一个评阅教师可评阅多篇论文。
6. 一个答辩组可包含多个学生，一个学生只参加一个正式答辩组。
7. 一张成绩单汇总指导、评阅、答辩三部分成绩。

## 6. 类图成果清单

```text
    deliverables
    └── uml
        ├── domain-class-diagram.puml
        └── analysis-class-diagram.puml
```

## 7. 设计结论

类图设计的核心不是展示技术实现细节，而是体现：

1. 多角色协作关系
2. 课题与学生的正式关联关系
3. 材料对象的阶段性与状态性
4. 评阅、答辩、成绩对象的组合关系
5. 统计、归档和特殊处理对象的辅助支撑作用
