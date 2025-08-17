# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 15 的名言名句网站，展示古今中外的经典名言警句，提供搜索、分类、分享等功能。

## 开发命令

```bash
# 开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 运行生产版本
pnpm start

# 代码检查
pnpm lint
```

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.1.9
- **UI组件**: shadcn/ui (基于 Radix UI)
- **图标**: Lucide React
- **主题**: next-themes (支持深色/浅色模式)
- **包管理**: pnpm

## 项目架构

### 目录结构
```
app/                    # Next.js App Router 页面
├── globals.css        # 全局样式
├── layout.tsx         # 根布局
├── page.tsx          # 首页
├── loading.tsx       # 加载组件
└── quote/[id]/       # 名言详情页面动态路由

components/             # React 组件
├── ui/               # shadcn/ui 基础组件
├── header.tsx        # 头部组件
├── quote-card.tsx    # 名言卡片
├── quote-detail.tsx  # 名言详情
├── quotes-list.tsx   # 名言列表
├── search-and-filter.tsx # 搜索筛选
└── theme-provider.tsx    # 主题提供者

lib/                   # 工具函数和数据
├── quotes-data.ts    # 名言数据和过滤逻辑
└── utils.ts         # 工具函数

public/               # 静态资源
styles/              # 额外样式文件
```

### 路径别名
- `@/*` 指向项目根目录
- 所有导入使用绝对路径，如 `@/components/ui/button`

### 数据结构
名言数据存储在 `lib/quotes-data.ts` 中，使用以下 TypeScript 接口：

```typescript
interface Quote {
  id: number
  content: string    // 名言内容
  author: string     // 作者
  source: string     // 出处
  category: string   // 分类
  tags: string[]     // 标签数组
}
```

## 组件系统

### shadcn/ui 配置
- 使用 "new-york" 风格
- 启用 RSC (React Server Components)
- 基础颜色: neutral
- CSS 变量模式启用
- 图标库: Lucide React

### 组件命名规范
- 组件文件使用 kebab-case（如 `quote-card.tsx`）
- 组件名使用 PascalCase（如 `QuoteCard`）
- UI 组件统一放在 `components/ui/` 目录

### 主题系统
- 使用 next-themes 管理主题
- 支持 'light', 'dark', 'system' 模式
- 主题存储键: 'quotes-ui-theme'
- 所有组件都支持主题切换

## 功能模块

### 核心功能
1. **名言展示**: 卡片式展示，支持网格和列表视图
2. **搜索功能**: 支持按内容、作者、出处、标签搜索
3. **分类筛选**: 按预定义分类过滤名言
4. **名言详情**: 单独页面显示名言详细信息
5. **分享功能**: 复制、分享、下载图片
6. **响应式设计**: 支持移动端和桌面端

### 页面路由
- `/` - 首页（名言列表和搜索）
- `/quote/[id]` - 名言详情页面

## 开发约定

### 样式指南
- 优先使用 Tailwind CSS 类名
- 使用 CSS 变量进行主题色彩管理
- 动画使用 tailwindcss-animate
- 响应式设计遵循移动优先原则

### 组件开发
- 优先使用 shadcn/ui 基础组件
- 自定义组件需要支持主题切换
- 使用 TypeScript 严格类型检查
- 组件 props 必须定义明确的接口

### 数据管理
- 当前使用静态数据，存储在 `lib/quotes-data.ts`
- 搜索和过滤逻辑在客户端执行
- 使用 React hooks (useState, useMemo) 管理状态

## 注意事项

- Next.js 配置中禁用了构建时的 ESLint 和 TypeScript 错误检查
- 图片优化被禁用 (`unoptimized: true`)
- 使用 pnpm 作为包管理器，注意 lock 文件
- 项目与 v0.app 同步，修改时需注意版本控制