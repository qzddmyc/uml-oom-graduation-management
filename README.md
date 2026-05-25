# 毕业设计管理系统建模项目

本仓库用于完成**面向对象建模课程大作业**，项目主题为**毕业设计管理系统**。当前已形成需求分析、UML 建模、数据库设计、部署设计文档，并在 `frontend/` 下实现了可演示的前端原型。

## 项目文件指引

- 项目文件索引请见：[INDEX.md](./INDEX.md)
- 前端说明文件请见：[frontend/README.md](./frontend/README.md)
- 课程要求与当前产出映射请见：[OUTPUT.md](./OUTPUT.md)
- 汇报 PPT 详细规划请见：[PPT.md](./PPT.md)
- 项目整体待办请见：[plans/project-todo.md](./plans/project-todo.md)

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
 ├── INDEX.md
 ├── OUTPUT.md
 ├── PPT.md
 ├── deliverables
 │   ├── docs
 │   ├── render
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
- `INDEX.md`：仓库导航入口，便于快速定位文档、图和前端原型说明
- `OUTPUT.md`：课程要求与当前产出映射表
- `PPT.md`：逐页汇报 PPT 规划文档
- `plans/rough-implementation-plan.md`：项目总体粗略规划
- `plans/frontend-page-plan.md`：前端页面与原型规划
- `plans/project-todo.md`：完整任务清单与进度跟踪
- `deliverables/docs/`：需求分析、系统设计说明等正式文字成果
- `deliverables/docs/interface-design.md`：界面设计说明
- `deliverables/uml/`：PlantUML 源文件目录
- `deliverables/render/`：由 `.puml` 渲染生成的图片目录
- `frontend/`：Vue 3 + Mock 数据前端原型代码

## 当前技术路线

- 前端：Vue 3 + JavaScript
- 数据方式：Mock 数据
- 图与文档：Markdown + PlantUML + draw.io

## 建议工作顺序

1. 先阅读 `docs/Requirement.md`
2. 再查看 `INDEX.md`
3. 然后查看 `plans/project-todo.md`
4. 结合 `deliverables/` 与 `frontend/` 理解当前成果
5. 最后整理设计报告、PPT、截图与录屏材料

## 前端打包步骤

如需打包前端原型，可按以下步骤执行：

1. 进入前端目录：`cd ./frontend`
2. 首次安装依赖：`npm install`
3. 执行生产构建：`npm run build`
4. 构建完成后，静态产物位于 `frontend/dist/`

## PlantUML 渲染方式

需要 Linux 环境，以 Ubuntu 为例：

```bash
sudo apt update
sudo apt install -y plantuml graphviz fonts-noto-cjk fonts-wqy-zenhei
fc-cache -fv
mkdir -p ./deliverables/render
plantuml -charset UTF-8 -o ../render ./deliverables/uml/*.puml
```

渲染完成后，生成的图片统一输出到 `deliverables/render/`，文件名与 `deliverables/uml/` 中的 `.puml` 源文件保持一一对应。

## 说明

当前仓库仍以**设计文档与规划文件**为主；其中前端原型支持在 `frontend/` 目录执行 `npm run build`，仓库其余部分没有统一的 build、test 或 lint 命令。
