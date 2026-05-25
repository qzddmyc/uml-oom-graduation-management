# 毕业设计管理系统系统设计章节写作提纲

## 1. 章节定位

本章节用于说明系统从技术路线、界面设计、数据库、包图、构件图到部署方案的整体设计思路，体现系统如何从分析模型过渡到可展示、可扩展的实现方案。

## 2. 建议章节结构

### 2.1 技术路线

- **写作重点**：解释为什么课程展示阶段采用 Vue 3、Mock 数据、Markdown、PlantUML 和 draw.io。
- **主要来源**：`deliverables/docs/system-design.md`

### 2.2 界面设计说明

- **写作重点**：说明信息架构、统一布局、角色化页面和关键展示页面。
- **主要来源**：`deliverables/docs/interface-design.md`、`plans/frontend-page-plan.md`

### 2.3 数据库设计

- **写作重点**：说明核心数据表、关系、状态字段与成绩计算机制。
- **主要来源**：`deliverables/docs/database-design.md`
- **配套图文件**：`database-er-diagram.puml/.png`

### 2.4 包图与构件图设计

- **写作重点**：说明系统模块边界、职责分层和前端原型与数据模块之间的关系。
- **主要来源**：`deliverables/docs/system-design.md`
- **配套图文件**：
  - `package-diagram.puml/.png`
  - `component-diagram.puml/.png`

### 2.5 部署设计

- **写作重点**：区分课程演示环境与完整系统逻辑部署方案。
- **主要来源**：`deliverables/docs/deployment-design.md`
- **配套图文件**：`deployment-diagram.puml/.png`

## 3. 写作建议

1. 先交代“课程展示环境”和“完整系统设计”是两个层次。
2. 以界面设计承接需求和 UML 成果，以数据库和包图/构件图承接结构设计，以部署图收束整体方案。
3. 说明当前原型虽然使用 Mock 数据，但并不影响数据库、构件和部署成果的完整表达。

## 4. 建议章节结论

系统设计章节的结论建议强调：

1. 原型实现与建模成果之间是一致的，不是孤立存在。
2. 数据结构、模块划分和部署结构均围绕毕业设计全过程管理展开。
3. 界面设计说明使技术方案能够以更直观的方式进入报告与汇报材料。
