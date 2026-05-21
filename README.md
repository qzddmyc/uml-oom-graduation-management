# 毕业设计管理系统建模项目

本仓库用于完成**面向对象建模课程大作业**，项目主题为**毕业设计管理系统**。当前已形成需求分析、UML 建模、数据库设计、部署设计文档，并在 `frontend/` 下实现了可演示的前端原型。

## 项目文件索引

项目文件索引请见：[index.md](./index.md)

## 前端文件说明

前端说明文件请见：[frontend/README.md](./frontend/README.md)

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
├── index.md
├── deliverables
│   ├── docs
│   └── uml
├── docs
│   ├── Blueprint.md
│   ├── Requirement.md
│   └── Workflow.md
├── frontend            # 前端项目根目录
└── plans
    ├── frontend-page-plan.md
    ├── project-todo.md
    └── rough-implementation-plan.md
```

## 主要内容

- `docs/Requirement.md`：课程要求与本项目需要完成的核心任务
- `index.md`：仓库导航入口，便于快速定位文档、图和前端原型说明
- `plans/rough-implementation-plan.md`：项目总体粗略规划
- `plans/frontend-page-plan.md`：前端页面与原型规划
- `plans/project-todo.md`：完整任务清单与进度跟踪
- `deliverables/docs/`：需求分析、系统设计说明等正式文字成果
- `deliverables/uml/`：UML、ER 图与部署图等正式图形成果
- `frontend/`：Vue 3 + Mock 数据前端原型代码

## 当前技术路线

- 前端：Vue 3 + JavaScript
- 数据方式：Mock 数据
- 图与文档：Markdown + PlantUML + draw.io

## 建议工作顺序

1. 先阅读 `docs/Requirement.md`
2. 再查看 `index.md`
3. 然后查看 `plans/project-todo.md`
4. 结合 `deliverables/` 与 `frontend/` 理解当前成果
5. 最后整理设计报告、PPT、截图与录屏材料

## 前端打包步骤

如需打包前端原型，可按以下步骤执行：

1. 进入前端目录：`cd ./frontend`
2. 首次安装依赖：`npm install`
3. 执行生产构建：`npm run build`
4. 构建完成后，静态产物位于 `frontend/dist/`
5. 如需提交前端打包结果，可将 `frontend/dist/` 作为静态发布文件；如需提交源码演示，则保留整个 `frontend/` 目录

## 说明

当前仓库仍以**设计文档与规划文件**为主；其中前端原型支持在 `frontend/` 目录执行 `npm run build`，仓库其余部分没有统一的 build、test 或 lint 命令。
