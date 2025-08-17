import { loadQuotesFromMarkdown, getCategoriesFromMarkdown } from './quote-markdown-loader'

/**
 * Quote 名言数据接口
 * 定义单个名言的数据结构
 */
export interface Quote {
  id: number        // 唯一标识符
  content: string   // 名言内容
  author: string    // 作者
  source: string    // 出处（书籍、演讲等）
  category: string  // 分类（人生哲理、励志名言等）
  tags: string[]    // 标签数组（主题标签）
}

// 后备数据已移除，现在完全依赖 markdown 文件

// 现在只使用 markdown 文件作为数据源
const DATA_SOURCE = 'markdown'

/**
 * 获取名言数据 - 从 markdown 文件加载
 * @returns Promise<Quote[]> 名言数据数组
 */
async function loadQuotes(): Promise<Quote[]> {
  try {
    return await loadQuotesFromMarkdown()
  } catch (error) {
    console.error('Error loading quotes from markdown:', error)
    return []
  }
}

/**
 * 获取分类列表 - 从 markdown 文件加载
 * @returns Promise<string[]> 分类列表，包含"全部"选项
 */
async function loadCategories(): Promise<string[]> {
  try {
    return await getCategoriesFromMarkdown()
  } catch (error) {
    console.error('Error loading categories from markdown:', error)
    return ["全部"]
  }
}

/**
 * 同步获取名言数据（用于服务端组件）
 * @returns Promise<Quote[]> 名言数据数组
 */
export async function getQuotes(): Promise<Quote[]> {
  return await loadQuotes()
}

/**
 * 同步获取分类列表（用于服务端组件）
 * @returns Promise<string[]> 分类列表
 */
export async function getCategories(): Promise<string[]> {
  return await loadCategories()
}

// 为了保持向后兼容性，导出空数组（现在完全依赖 markdown 文件）
export const quotes: Quote[] = []
export const categories: string[] = ["全部"]

/**
 * 筛选名言数据
 * 根据搜索词和分类条件过滤名言
 * 
 * @param quotes - 原始名言数据数组
 * @param searchTerm - 搜索关键词，支持内容、作者、出处、标签搜索
 * @param category - 分类筛选条件，"全部"表示不筛选
 * @returns Quote[] 筛选后的名言数组
 */
export function filterQuotes(quotes: Quote[], searchTerm: string, category: string): Quote[] {
  return quotes.filter((quote) => {
    // 检查是否匹配搜索条件（大小写不敏感）
    const matchesSearch =
      searchTerm === "" ||
      quote.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    // 检查是否匹配分类条件
    const matchesCategory = category === "全部" || quote.category === category

    // 必须同时满足搜索和分类条件
    return matchesSearch && matchesCategory
  })
}
