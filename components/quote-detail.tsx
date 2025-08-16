"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, BookOpen, Copy, Check, Download, Palette } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Quote } from "@/lib/quotes-data"

interface QuoteDetailProps {
  quote: Quote
}

export function QuoteDetail({ quote }: QuoteDetailProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [imageStyle, setImageStyle] = useState("classic")

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
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scale = 2 // 高分辨率
    canvas.width = 800 * scale
    canvas.height = 600 * scale
    ctx.scale(scale, scale)

    // 根据样式设置背景
    const styles = {
      classic: { bg: "#ffffff", primary: "#164e63", secondary: "#6b7280" },
      elegant: { bg: "#f8fafc", primary: "#0f172a", secondary: "#475569" },
      warm: { bg: "#fef7ed", primary: "#9a3412", secondary: "#a16207" },
    }

    const style = styles[imageStyle as keyof typeof styles] || styles.classic

    // 设置背景
    ctx.fillStyle = style.bg
    ctx.fillRect(0, 0, 800, 600)

    // 设置文字样式
    ctx.fillStyle = style.primary
    ctx.font = "32px serif"
    ctx.textAlign = "center"

    // 绘制名言内容
    const maxWidth = 700
    const words = quote.content.split("")
    let line = ""
    let y = 200

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i]
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 400, y)
        line = words[i]
        y += 50
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 400, y)

    // 绘制作者信息
    ctx.font = "24px sans-serif"
    ctx.fillStyle = style.secondary
    ctx.fillText(`—— ${quote.author}`, 400, y + 80)

    if (quote.source) {
      ctx.fillText(`《${quote.source}》`, 400, y + 120)
    }

    // 下载图片
    const link = document.createElement("a")
    link.download = `名言-${quote.author}-${quote.id}.png`
    link.href = canvas.toDataURL("image/png", 1.0)
    link.click()
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
                <Badge variant="secondary" className="bg-accent/10 text-accent-foreground text-sm">
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

            {/* 下载样式选择 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">图片样式:</span>
              </div>
              <Select value={imageStyle} onValueChange={setImageStyle}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">经典</SelectItem>
                  <SelectItem value="elegant">优雅</SelectItem>
                  <SelectItem value="warm">温暖</SelectItem>
                </SelectContent>
              </Select>
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
    </div>
  )
}
