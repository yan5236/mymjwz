import type { Quote } from './quotes-data'

// 仅在服务端运行时导入Node.js模块
let fs: typeof import('fs') | null = null
let path: typeof import('path') | null = null
let matter: typeof import('gray-matter') | null = null

// 动态导入，仅在服务端环境执行
async function loadDependencies() {
  if (typeof window === 'undefined') {
    // 服务端环境
    if (!fs) {
      fs = await import('fs')
      path = await import('path')
      matter = (await import('gray-matter')).default
    }
  }
}

interface QuoteFrontmatter {
  id: number
  author: string
  source: string
  category: string
  tags: string[]
}

export class QuoteMarkdownLoader {
  private quotesDir: string
  
  constructor(quotesDir: string = 'quotes') {
    this.quotesDir = quotesDir
  }
  
  /**
   * 加载单个md文件并解析为Quote对象
   */
  private async loadQuoteFromFile(filePath: string): Promise<Quote | null> {
    try {
      await loadDependencies()
      
      if (!fs || !path || !matter) {
        console.warn('Dependencies not available (client-side environment)')
        return null
      }
      
      const fullPath = path.join(process.cwd(), this.quotesDir, filePath)
      
      if (!fs.existsSync(fullPath)) {
        console.warn(`Quote file not found: ${fullPath}`)
        return null
      }
      
      const fileContent = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContent)
      
      // 验证必需的前置元数据
      const requiredFields = ['id', 'author', 'category', 'tags']
      for (const field of requiredFields) {
        if (!(field in data)) {
          console.warn(`Missing required field '${field}' in ${filePath}`)
          return null
        }
      }
      
      const frontmatter = data as QuoteFrontmatter
      
      // 构建Quote对象
      const quote: Quote = {
        id: frontmatter.id,
        content: content.trim(),
        author: frontmatter.author,
        source: frontmatter.source || '',
        category: frontmatter.category,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : []
      }
      
      return quote
    } catch (error) {
      console.error(`Error loading quote from ${filePath}:`, error)
      return null
    }
  }
  
  /**
   * 加载所有md文件并返回Quote数组
   */
  async loadAllQuotes(): Promise<Quote[]> {
    try {
      await loadDependencies()
      
      if (!fs || !path) {
        console.warn('Dependencies not available (client-side environment)')
        return []
      }
      
      const quotesPath = path.join(process.cwd(), this.quotesDir)
      
      if (!fs.existsSync(quotesPath)) {
        console.warn(`Quotes directory not found: ${quotesPath}`)
        return []
      }
      
      const files = fs.readdirSync(quotesPath)
      const mdFiles = files.filter(file => file.endsWith('.md'))
      
      const quotes: Quote[] = []
      
      for (const file of mdFiles) {
        const quote = await this.loadQuoteFromFile(file)
        if (quote) {
          quotes.push(quote)
        }
      }
      
      // 按id排序
      quotes.sort((a, b) => a.id - b.id)
      
      return quotes
    } catch (error) {
      console.error('Error loading quotes:', error)
      return []
    }
  }
  
  /**
   * 根据id获取特定的名言
   */
  async getQuoteById(id: number): Promise<Quote | undefined> {
    const quotes = await this.loadAllQuotes()
    return quotes.find(quote => quote.id === id)
  }
  
  /**
   * 获取所有分类
   */
  async getAllCategories(): Promise<string[]> {
    const quotes = await this.loadAllQuotes()
    const categories = new Set(quotes.map(quote => quote.category))
    return ['全部', ...Array.from(categories).sort()]
  }
  
  /**
   * 获取所有标签
   */
  async getAllTags(): Promise<string[]> {
    const quotes = await this.loadAllQuotes()
    const tags = new Set<string>()
    quotes.forEach(quote => {
      quote.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }
}

// 创建默认实例
export const quoteLoader = new QuoteMarkdownLoader()

// 导出便捷函数
export async function loadQuotesFromMarkdown(): Promise<Quote[]> {
  return quoteLoader.loadAllQuotes()
}

export async function getQuoteFromMarkdown(id: number): Promise<Quote | undefined> {
  return quoteLoader.getQuoteById(id)
}

export async function getCategoriesFromMarkdown(): Promise<string[]> {
  return quoteLoader.getAllCategories()
}

export async function getTagsFromMarkdown(): Promise<string[]> {
  return quoteLoader.getAllTags()
}