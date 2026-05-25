# 图文一致性检查结果

## 1. 检查范围

- `deliverables/docs/requirements-analysis.md`
- `deliverables/docs/use-case-analysis.md`
- `deliverables/docs/use-case-realizations.md`
- `deliverables/docs/domain-class-design.md`
- `deliverables/docs/system-design.md`
- `deliverables/docs/interface-design.md`
- `deliverables/docs/database-design.md`
- `deliverables/docs/deployment-design.md`
- `INDEX.md`
- `plans/frontend-page-plan.md`

## 2. 一致性检查结果

| 检查项 | 结果 | 说明 |
|---|---|---|
| 系统主题统一为“毕业设计管理系统” | 通过 | 主要文档标题与内容一致 |
| 角色集合一致 | 通过 | 管理员、教学秘书、教学院长、专业负责人、指导教师、评阅教师、答辩录入员、学生保持一致 |
| 核心流程一致 | 通过 | 课题、任务书、开题、中期、论文、评阅、答辩、总评链路一致 |
| 多主体评价改进点一致 | 通过 | 需求分析、用例实现、类图和数据库均有体现 |
| 成绩权重规则一致 | 通过 | `Blueprint.md`、数据库设计和成绩相关说明保持一致 |
| UML 源文件与渲染图对应关系一致 | 通过 | `deliverables/uml/` 与 `deliverables/render/` 已对齐 |
| 界面设计与前端规划一致 | 通过 | `interface-design.md` 与 `frontend-page-plan.md` 可对应 |
| 术语使用一致 | 基本通过 | 主要术语已统一，后续需在最终 PPT / 报告导出时继续保持 |

## 3. 后续关注点

1. 最终 PDF、PPT 和录屏中的角色称呼应继续沿用当前文档术语。
2. 截图标题建议与 `interface-design.md` 和 `frontend-page-plan.md` 中的页面名称保持一致。
3. 个人工作说明和小组信息补入后，应再次检查是否与报告封面和 PPT 一致。

## 4. 结论

当前仓库内的图、文档和前端说明已形成较高一致性，剩余一致性风险主要集中在最终导出材料阶段，而不是现有设计文档本身。
