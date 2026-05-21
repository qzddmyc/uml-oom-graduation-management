# 毕业设计管理系统前端原型

本目录为课程项目的前端原型实现，技术方案为 **Vue 3 + JavaScript + Pinia + Vue Router + Element Plus + Less + Mock 数据**。

## 目录说明

```text
frontend
├── src
│   ├── api
│   ├── assets
│   ├── components
│   │   └── common
│   ├── layout
│   ├── mock
│   │   ├── data
│   │   ├── modules
│   │   └── shared.js
│   ├── router
│   ├── stores
│   ├── styles
│   └── views
├── package.json
└── vite.config.js
```

## 当前已实现内容

1. 登录、角色切换、首页仪表盘。
2. 统一布局、路由守卫、权限元信息。
3. 课题、选题、任务书、开题、中期、论文、评阅、答辩、成绩、统计、归档、系统管理等页面原型。
4. mock 数据层、API 包装层和通用页面组件。
5. 若干重点页面的强化交互，如课题申报、学生选题、任务书审批、成绩汇总等。

## 本地运行

1. 进入目录：`Set-Location .\frontend`
2. 安装依赖：`npm install`
3. 启动开发环境：`npm run dev`

## 打包步骤

1. 进入目录：`Set-Location .\frontend`
2. 如未安装依赖，先执行：`npm install`
3. 执行构建：`npm run build`
4. 构建结果输出到：`frontend/dist/`

如果只需要提交静态前端文件，可使用 `dist/` 目录；如果需要完整演示源码，则保留整个 `frontend/` 目录。
