# 名言名句网 - 古今智慧，一言千金

一个基于 Next.js 15 的现代化名言名句展示网站，致力于传播古今中外的经典智慧与正能量。

## 🌟 项目特色

- **精选内容**：收录28条经典名言名句，涵盖古代智慧与现代启示
- **优雅界面**：采用现代化设计，支持深色/浅色主题切换
- **智能搜索**：支持按内容、作者、出处、标签等多维度搜索
- **分类筛选**：按励志、哲理、学习等分类快速查找
- **收藏功能**：一键收藏喜爱的名言，随时回顾
- **响应式设计**：完美适配手机、平板、电脑等各种设备
- **开源共建**：完全开源，欢迎社区贡献

## 🚀 在线体验

访问 [名言名句网](https://mymj.nanhaiblog.top/) 立即体验！

## 📱 功能介绍

### 核心功能
- **名言展示**：卡片式展示，美观易读
- **智能搜索**：实时搜索，支持模糊匹配
- **分类筛选**：按主题分类浏览
- **收藏管理**：个人收藏夹，方便回顾
- **分享功能**：支持复制和分享名言
- **详情页面**：单独页面展示名言背景

### 页面说明
- **首页** (`/`)：展示所有名言，支持搜索和筛选
- **收藏页** (`/favorites`)：查看已收藏的名言
- **关于页** (`/about`)：项目介绍和参与方式
- **详情页** (`/quote/[id]`)：单个名言的详细信息

## 🛠️ 技术栈

- **前端框架**：Next.js 15 (App Router)
- **编程语言**：TypeScript
- **样式方案**：Tailwind CSS 4.1.9
- **UI组件**：shadcn/ui (基于 Radix UI)
- **图标库**：Lucide React
- **主题管理**：next-themes
- **包管理**：pnpm

## 🏗️ 本地开发

### 环境要求
- Node.js 18+
- pnpm 包管理器

### 快速开始

```bash
# 克隆项目
git clone https://github.com/yan5236/mymjwz.git
cd mymjwz

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 可用命令

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 📁 项目结构

```
mymjwz/
├── app/                    # Next.js App Router
│   ├── about/             # 关于页面
│   ├── favorites/         # 收藏页面
│   ├── quote/[id]/        # 名言详情页
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 基础组件
│   ├── header.tsx        # 头部导航
│   ├── quote-card.tsx    # 名言卡片
│   ├── quotes-list.tsx   # 名言列表
│   └── search-and-filter.tsx # 搜索筛选
├── lib/                  # 工具函数
│   ├── quotes-data.ts    # 名言数据管理
│   ├── favorites.ts      # 收藏功能
│   └── quote-markdown-loader.ts # Markdown加载器
├── quotes/               # 名言内容（Markdown格式）
└── public/              # 静态资源
```

## 🔍 数据结构

每条名言包含以下信息：
- **id**: 唯一标识符
- **content**: 名言内容
- **author**: 作者
- **source**: 出处（书籍、演讲等）
- **category**: 分类（励志、哲理、学习等）
- **tags**: 标签数组（主题标签）

## 🤝 参与贡献

我们欢迎所有热爱文化、喜欢分享的朋友参与贡献！

### 贡献方式
1. **内容贡献**：添加更多经典名言名句
2. **功能改进**：优化网站功能和用户体验
3. **问题反馈**：通过 GitHub Issues 提交问题
4. **代码贡献**：提交 Pull Request 改进代码

### 如何添加新名言
1. 在 `quotes/` 目录下创建新的 Markdown 文件
2. 按照以下格式编写：
   ```markdown
   ---
   id: 29
   author: "作者名"
   source: "出处"
   category: "分类"
   tags: ["标签1", "标签2"]
   ---
   
   名言内容
   ```
3. 提交 PR 即可！

## 📄 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](LICENSE) 文件。

## 💝 致谢

感谢所有为这个项目做出贡献的朋友们！特别感谢：
- 古今中外的智者先贤，留下这些珍贵的智慧结晶
- 开源社区的开发者们，提供了优秀的技术栈和工具
- 每一位使用者和贡献者，让这个项目变得更好

## 📞 联系我们

- **GitHub Issues**: [提交问题或建议](https://github.com/yan5236/mymjwz/issues)
- **项目仓库**: [yan5236/mymjwz](https://github.com/yan5236/mymjwz)

---

**名言名句网** - 传播智慧，分享正能量 ❤️