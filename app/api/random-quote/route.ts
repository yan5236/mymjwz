import { NextResponse } from 'next/server'
import { loadQuotesFromMarkdown } from '@/lib/quote-markdown-loader'

export async function GET() {
  try {
    const quotes = await loadQuotesFromMarkdown()
    
    if (quotes.length === 0) {
      return NextResponse.json({ error: 'No quotes available' }, { status: 404 })
    }
    
    // 从实际存在的名言中随机选择一个
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomQuote = quotes[randomIndex]
    
    return NextResponse.json({ id: randomQuote.id })
  } catch (error) {
    console.error('Error fetching random quote:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}