import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Quote } from "@/lib/quotes-data"

interface RelatedQuotesProps {
  currentQuote: Quote
  allQuotes: Quote[]
}

export function RelatedQuotes({ currentQuote, allQuotes }: RelatedQuotesProps) {
  // 获取相关名言：同分类或有相同标签的名言
  const relatedQuotes = allQuotes
    .filter((quote) => {
      if (quote.id === currentQuote.id) return false

      // 同分类
      if (quote.category === currentQuote.category) return true

      // 有相同标签
      const hasCommonTag = quote.tags.some((tag) => currentQuote.tags.includes(tag))
      if (hasCommonTag) return true

      return false
    })
    .slice(0, 4) // 最多显示4条

  if (relatedQuotes.length === 0) {
    return null
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-serif">
          相关名言
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {relatedQuotes.map((quote) => (
            <Link key={quote.id} href={`/quote/${quote.id}`}>
              <Card className="h-full hover:shadow-md transition-all duration-200 border-border/30 hover:border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <blockquote className="text-sm md:text-base font-serif leading-relaxed text-card-foreground line-clamp-3 hover:text-primary transition-colors">
                    "{quote.content}"
                  </blockquote>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>— {quote.author}</span>
                    <Badge variant="outline" className="text-xs">
                      {quote.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center pt-4">
          <Button asChild variant="outline">
            <Link href={`/?category=${encodeURIComponent(currentQuote.category)}`}>
              查看更多{currentQuote.category}名言
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
