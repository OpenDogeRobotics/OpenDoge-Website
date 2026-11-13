# OpenDoge Website

OpenDoge 开源小型四足机器人项目的官方网站。单页应用，中英双语，展示系统架构、核心特性、代码仓库、技术规格、快速上手、路线图与社区信息。

技术栈：**React 19 · TypeScript 5 · Vite 7 · Tailwind CSS 4**，通过 `vite-plugin-singlefile` 构建为单个 HTML 文件，可直接托管在任意静态站点服务上。

## 快速开始

要求 Node.js `^20.19` 或 `>=22.12`（Vite 7 的最低版本要求）。

```bash
npm install
npm run dev       # 本地开发，默认 http://localhost:5173
npm run build     # 构建到 dist/（单文件 index.html）
npm run preview   # 预览构建结果
```

## 目录结构

```
.
├── index.html              # 入口 HTML（SEO / OG 元信息）
├── src/
│   ├── App.tsx             # 页面组装
│   ├── components/         # 各区块组件
│   │   ├── Hero / Pipeline / Features / Repos / Specs
│   │   ├── TechStack / QuickStart / Roadmap / Community
│   │   ├── Navbar / Footer / RobotDiagram
│   │   └── ui/             # CodeBlock、Icons、Logo、Reveal、SectionHeader
│   ├── data/               # 页面文案与数据
│   │   ├── site.ts         # 导航、Hero、通用文案
│   │   ├── repos.ts        # 仓库卡片信息
│   │   ├── specs.ts        # 技术规格
│   │   └── quickstart.ts   # 快速开始步骤与代码片段
│   ├── lib/i18n.tsx        # 中英文切换（localStorage 记忆）
│   ├── utils/cn.ts         # className 合并
│   └── assets/             # 渲染图等静态资源
└── .shots/                 # 页面截图脚本（内部工具）
```

## 修改内容

页面文案集中在 `src/data/`。所有可展示文本使用中英双语对 `l("中文", "English")` 定义，由 `src/lib/i18n.tsx` 按当前语言解析；新增文案时同步补齐两种语言。默认语言为中文，用户切换后记住选择。

样式使用 Tailwind CSS 4（`src/index.css` 中的 `@theme` 定义品牌色板与字体），无独立样式表。

## 相关仓库

- [OpenDogeRobotics](https://github.com/OpenDogeRobotics) — 组织主页
- [OpenDoge-ROS2](https://github.com/OpenDogeRobotics/OpenDoge-ROS2) — ROS 2 运控工作区与历史资料归档
- [GOUJIAO](https://github.com/OpenDogeRobotics/GOUJIAO) — 项目文档站

## 许可证

[MIT](LICENSE)
