# 毕业设计管理系统小组分工与交付物规范

## 1. 小组分工建议

依据 `Requirement.md`，本项目建议按“不超过 4 人”的规模组织实施，并由组长统一协调进度、命名规范和最终提交材料。

### 1.1 角色分工建议

| 角色 | 主要职责 | 重点产出 |
|---|---|---|
| 组长 / 总协调 | 统筹进度、统一术语、整合文档、把控最终提交 | 进度表、整合报告、PPT、录屏脚本 |
| 需求与用例负责人 | 需求获取、问题分析、参与者识别、用例建模 | 调研计划、访谈提纲、用例图、用例说明 |
| 结构设计负责人 | 领域分析、类图、数据库、包图、构件图、部署图 | 类图、ER 图、系统设计说明 |
| 过程与原型负责人 | 顺序图、活动图、状态图、界面原型、截图素材 | 动态图、页面原型、演示素材 |

### 1.2 协作要求

1. 所有成员统一使用本仓库中的中文领域术语。
2. 用例名称、类名称、数据表名称、页面名称需保持前后一致。
3. 图与文档由组长统一校对后再纳入最终报告。
4. 每位成员需保留本人完成内容记录，便于最终报告中填写“自己所做的工作”。

## 2. 交付物目录规范

建议后续正式成果按下列目录归档：

```text
deliverables
  ├── 01-requirement-analysis
  │   ├── requirement-acquisition-plan.md
  │   ├── interview-outline.md
  │   └── problem-analysis.md
  ├── 02-use-case
  │   ├── use-case-analysis.md
  │   ├── use-case-realizations.md
  │   └── diagrams
  ├── 03-structure-design
  │   ├── domain-class-design.md
  │   ├── database-design.md
  │   └── diagrams
  ├── 04-dynamic-design
  │   └── diagrams
  ├── 05-system-design
  │   ├── system-design.md
  │   ├── deployment-design.md
  │   └── diagrams
  ├── 06-interface-design
  │   ├── frontend-page-plan.md
  │   ├── prototypes
  │   └── screenshots
  ├── 07-report
  │   └── 学号+姓名.pdf
  └── 08-presentation
      ├── 建模汇报X组.pptx
      └── 建模汇报X组.mp4
```

## 3. 文件命名规范

### 3.1 文档命名

- 规划与设计说明文档统一使用英文文件名。
- 文档标题使用中文，便于直接进入课程报告。
- 文件名建议使用 `kebab-case`，例如：
  - `requirement-analysis.md`
  - `use-case-realizations.md`
  - `database-design.md`

### 3.2 图文件命名

- UML 图统一使用 `.puml` 保存 PlantUML 源文件。
- 渲染后的图片统一放在 `deliverables/render/`，并与 `.puml` 源文件保持同名 `.png`。
- 文件名采用“图类型 + 业务主题”的结构，例如：
  - `system-use-case-overview.puml`
  - `domain-class-diagram.puml`
  - `sequence-taskbook-approval.puml`
  - `deployment-diagram.puml`

### 3.3 原型与截图命名

- 原型图或截图建议按“模块-页面-版本”命名，例如：
  - `topic-list-v1.png`
  - `proposal-review-v1.png`
  - `score-summary-v1.png`

### 3.4 最终提交前命名核对

最终整理提交材料时，建议额外核对以下文件名是否符合课程要求：

1. 最终 PDF 报告命名为 `学号+姓名.pdf`
2. 汇报 PPT 命名为 `建模汇报X组.pptx`
3. 录屏文件命名为 `建模汇报X组.mp4`
4. 页面截图可统一按“模块-页面-版本”方式命名，便于整理附录和演示素材

## 4. 最终提交清单

最终至少应包含以下内容：

1. 调研计划或访谈计划
2. 用例模型与重点用例说明
3. 类图
4. 顺序图
5. 活动图 / 状态图
6. 数据库设计与 ER 图
7. 包图 / 构件图
8. 部署图
9. 界面设计说明与原型图
10. 最终 PDF 报告
11. 汇报 PPT
12. 录屏文件

## 5. 个人工作说明模板

最终报告中的个人工作说明建议采用以下结构：

1. 小组成员与组长信息
2. 本人负责模块
3. 本人完成文档与图
4. 本人参与协调或整合工作
5. 本人贡献说明
