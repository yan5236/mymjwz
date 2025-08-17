"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, BookOpen, Copy, Check, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ImagePreviewDialog } from "@/components/image-preview-dialog"
import { getCategoryStyle } from "@/lib/utils"
import type { Quote } from "@/lib/quotes-data"

interface QuoteDetailProps {
  quote: Quote
}

export function QuoteDetail({ quote }: QuoteDetailProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [showImagePreview, setShowImagePreview] = useState(false)

  const handleCopy = async () => {
    const text = `"${quote.content}" —— ${quote.author}${quote.source ? ` 《${quote.source}》` : ""}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  const handleShare = async () => {
    setIsSharing(true)
    const shareData = {
      title: `${quote.author}的名言`,
      text: `"${quote.content}" —— ${quote.author}`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await handleCopy()
      }
    } catch (err) {
      console.error("分享失败:", err)
    } finally {
      setTimeout(() => setIsSharing(false), 1000)
    }
  }

  const handleDownload = () => {
    setShowImagePreview(true)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* 返回按钮 */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm" className="hover:bg-accent transition-colors">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">返回首页</span>
            <span className="sm:hidden">返回</span>
          </Link>
        </Button>
      </div>

      {/* 主要内容卡片 */}
      <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6 md:p-8 lg:p-12">
          <div className="space-y-6 md:space-y-8">
            {/* 名言内容 */}
            <div className="text-center space-y-4 md:space-y-6">
              <blockquote className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif leading-relaxed text-card-foreground">
                "{quote.content}"
              </blockquote>

              <div className="space-y-2">
                <div className="text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground">
                  —— {quote.author}
                </div>
                {quote.source && (
                  <div className="flex items-center justify-center gap-2 text-base md:text-lg text-muted-foreground">
                    <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                    <span>《{quote.source}》</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 分类和标签 */}
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">分类</div>
                <Badge variant="outline" className={`${getCategoryStyle(quote.category)} text-sm font-medium px-3 py-1 shadow-sm`}>
                  {quote.category}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">标签</div>
                <div className="flex flex-wrap gap-2">
                  {quote.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />


            {/* 操作按钮 */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant={liked ? "default" : "outline"}
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">{liked ? "已收藏" : "收藏"}</span>
                <span className="sm:hidden">{liked ? "已收藏" : "收藏"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex items-center gap-2 bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="hidden sm:inline">{copied ? "已复制" : "复制"}</span>
                <span className="sm:hidden">{copied ? "已复制" : "复制"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center gap-2 bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">分享</span>
                <span className="sm:hidden">分享</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2 bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">下载图片</span>
                <span className="sm:hidden">下载</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 图片预览对话框 */}
      <ImagePreviewDialog 
        quote={quote}
        open={showImagePreview}
        onOpenChange={setShowImagePreview}
      />
    </div>
  )
}
