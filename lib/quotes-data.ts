import { loadQuotesFromMarkdown, getCategoriesFromMarkdown } from './quote-markdown-loader'

export interface Quote {
  id: number
  content: string
  author: string
  source: string
  category: string
  tags: string[]
}

// 后备数据已移除，现在完全依赖 markdown 文件

// 现在只使用 markdown 文件作为数据源
const DATA_SOURCE = 'markdown'

/**
 * 获取名言数据 - 从 markdown 文件加载
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
 */
async function loadCategories(): Promise<string[]> {
  try {
    return await getCategoriesFromMarkdown()
  } catch (error) {
    console.error('Error loading categories from markdown:', error)
    return ["全部"]
  }
}

// 同步获取数据的函数（用于服务端组件）
export async function getQuotes(): Promise<Quote[]> {
  return await loadQuotes()
}

export async function getCategories(): Promise<string[]> {
  return await loadCategories()
}

// 为了保持向后兼容性，导出空数组（现在完全依赖 markdown 文件）
export const quotes: Quote[] = []
export const categories: string[] = ["全部"]

export function filterQuotes(quotes: Quote[], searchTerm: string, category: string): Quote[] {
  return quotes.filter((quote) => {
    const matchesSearch =
      searchTerm === "" ||
      quote.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = category === "全部" || quote.category === category

    return matchesSearch && matchesCategory
  })
}
