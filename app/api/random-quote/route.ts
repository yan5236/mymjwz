import { NextResponse } from 'next/server'
import { loadQuotesFromMarkdown } from '@/lib/quote-markdown-loader'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // 首先尝试使用现有的加载器
    const quotes = await loadQuotesFromMarkdown()
    
    // 如果加载器返回空数组，尝试直接读取 quotes 目录
    if (quotes.length === 0) {
      console.log('Fallback: Loading quotes directly from filesystem')
      
      const quotesDir = path.join(process.cwd(), 'quotes')
      console.log('Quotes directory path:', quotesDir)
      
      // 检查目录是否存在
      if (fs.existsSync(quotesDir)) {
        const files = fs.readdirSync(quotesDir)
        const mdFiles = files.filter(file => file.endsWith('.md'))
        console.log('Found markdown files:', mdFiles.length)
        
        if (mdFiles.length > 0) {
          // 从文件名中提取ID并随机选择一个
          const fileIds = mdFiles
            .map(file => {
              const match = file.match(/^(\d+)-/)
              return match ? parseInt(match[1]) : null
            })
            .filter(id => id !== null)
          
          if (fileIds.length > 0) {
            const randomId = fileIds[Math.floor(Math.random() * fileIds.length)]
            return NextResponse.json({ id: randomId })
          }
        }
      } else {
        console.error('Quotes directory not found:', quotesDir)
      }
    } else {
      // 正常情况下从加载的名言中随机选择
      const randomIndex = Math.floor(Math.random() * quotes.length)
      const randomQuote = quotes[randomIndex]
      return NextResponse.json({ id: randomQuote.id })
    }
    
    return NextResponse.json({ error: 'No quotes available' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching random quote:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}