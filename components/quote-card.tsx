"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Share2, BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getCategoryStyle } from "@/lib/utils"
import type { Quote } from "@/lib/quotes-data"

interface QuoteCardProps {
  quote: Quote
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const [liked, setLiked] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked(!liked)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSharing(true)

    const shareData = {
      title: `${quote.author}的名言`,
      text: `"${quote.content}" —— ${quote.author}`,
      url: `${window.location.origin}/quote/${quote.id}`,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`"${quote.content}" —— ${quote.author} ${shareData.url}`)
      }
    } catch (err) {
      console.error("分享失败:", err)
    } finally {
      setTimeout(() => setIsSharing(false), 1000)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover:-translate-y-1 active:translate-y-0">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Link href={`/quote/${quote.id}`} className="block">
            <blockquote className="text-lg md:text-xl font-serif leading-relaxed text-card-foreground hover:text-primary transition-colors cursor-pointer line-clamp-4">
              "{quote.content}"
            </blockquote>
          </Link>

          <div className="flex items-start justify-between text-sm text-muted-foreground gap-4">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="font-medium truncate">— {quote.author}</div>
              {quote.source && (
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">《{quote.source}》</span>
                </div>
              )}
            </div>

            <Badge variant="outline" className={`${getCategoryStyle(quote.category)} flex-shrink-0 text-xs font-medium px-2 py-1 shadow-sm`}>
              {quote.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex flex-wrap gap-1 min-w-0 flex-1 mr-2">
              {quote.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs truncate">
                  #{tag}
                </Badge>
              ))}
              {quote.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{quote.tags.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 transition-all duration-200 ${
                  liked ? "text-red-500 hover:text-red-600" : "hover:text-accent"
                } hover:scale-110 active:scale-95`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:text-accent transition-all duration-200 hover:scale-110 active:scale-95"
                onClick={handleShare}
                disabled={isSharing}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Link href={`/quote/${quote.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:text-accent transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
