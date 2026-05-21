# 毕业设计（论文）管理系统建模项目

本仓库用于完成**面向对象建模课程大作业**，项目主题为**毕业设计（论文）管理系统**。当前重点是根据课程要求完成需求分析、UML 建模、数据库设计、部署设计、界面原型与设计报告等成果。

## 项目目标

围绕现有毕业设计管理系统中的问题，重新设计一套更完善的系统，重点包括：

- 补充开题评价、中期评价等过程控制环节
- 增加评价教师，完善评价主体
- 优化评阅、答辩分组等复杂操作
- 增强统计分析能力

## 仓库结构

```text
uml-oom-graduation-management
├── README.md
├── docs
│   ├── Blueprint.md
│   ├── Requirement.md
│   └── Workflow.md
└── plans
    ├── frontend-page-plan.md
    ├── project-todo.md
    └── rough-implementation-plan.md
```

## 主要内容

- `docs/Requirement.md`：课程要求与本项目需要完成的核心任务
- `plans/rough-implementation-plan.md`：项目总体粗略规划
- `plans/frontend-page-plan.md`：前端页面与原型规划
- `plans/project-todo.md`：完整任务清单与进度跟踪

## 当前技术路线

- 前端：Vue 3 + JavaScript
- 数据方式：Mock 数据
- 图与文档：Markdown + PlantUML + draw.io

## 建议工作顺序

1. 先阅读 `docs/Requirement.md`
2. 再查看 `plans/project-todo.md`
3. 按任务清单逐步细化需求、用例、类图、顺序图、活动图、状态图、数据库、部署图和界面设计
4. 最后整理设计报告、PPT 与录屏材料

## 说明

当前仓库以**设计文档与规划文件**为主，尚未定义 build、test 或 lint 命令。
