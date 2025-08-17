"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, Share2, BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getCategoryStyle } from "@/lib/utils"
import { toggleFavorite, isFavorited } from "@/lib/favorites"
import type { Quote } from "@/lib/quotes-data"

/**
 * QuoteCard 名言卡片组件的属性接口
 * @param quote - 要显示的名言数据
 * @param onFavoriteChange - 收藏状态改变时的回调函数（可选）
 */
interface QuoteCardProps {
  quote: Quote
  onFavoriteChange?: () => void
}

/**
 * QuoteCard 名言卡片组件
 * 
 * 展示单个名言的完整信息，包括：
 * - 名言内容（可点击跳转详情页）
 * - 作者和出处信息
 * - 分类标签和话题标签
 * - 互动按钮：收藏、分享、查看详情
 * 
 * 功能特点：
 * - 支持收藏功能，状态持久化到 localStorage
 * - 支持分享功能，优先使用 Web Share API，回退到复制文本
 * - 响应式设计，适配移动端和桌面端
 * - 悬停效果和动画交互
 */
export function QuoteCard({ quote, onFavoriteChange }: QuoteCardProps) {
  // 本地状态管理
  const [liked, setLiked] = useState(false) // 收藏状态
  const [isSharing, setIsSharing] = useState(false) // 分享中状态
  const [mounted, setMounted] = useState(false) // 组件挂载状态

  // 组件挂载时初始化收藏状态
  useEffect(() => {
    setMounted(true)
    setLiked(isFavorited(quote.id))
  }, [quote.id])

  /**
   * 处理收藏按钮点击
   * 切换收藏状态并通知其他组件
   */
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!mounted) return
    
    const newLikedState = toggleFavorite(quote)
    setLiked(newLikedState)
    
    // 触发自定义事件通知其他组件收藏状态已改变
    window.dispatchEvent(new CustomEvent("favoritesChanged"))
    
    // 调用回调函数（用于收藏页面实时更新）
    onFavoriteChange?.()
  }

  /**
   * 处理分享按钮点击
   * 使用 Web Share API 或复制到剪贴板
   */
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
        // 使用原生分享 API
        await navigator.share(shareData)
      } else {
        // 回退到复制到剪贴板
        await navigator.clipboard.writeText(`"${quote.content}" —— ${quote.author} ${shareData.url}`)
      }
    } catch (err) {
      console.error("分享失败:", err)
    } finally {
      setTimeout(() => setIsSharing(false), 1000)
    }
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/30 hover:-translate-y-2 active:translate-y-0 hover:scale-[1.02] hover:shadow-primary/10">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* 名言内容 - 可点击跳转详情页 */}
          <Link href={`/quote/${quote.id}`} className="block">
            <blockquote className="text-lg md:text-xl font-serif leading-relaxed text-card-foreground hover:text-primary transition-all duration-300 cursor-pointer line-clamp-4 group-hover:text-primary/90">
              "{quote.content}"
            </blockquote>
          </Link>

          {/* 作者和出处信息 */}
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

            {/* 分类标签 */}
            <Badge variant="outline" className={`${getCategoryStyle(quote.category)} flex-shrink-0 text-xs font-medium px-2 py-1 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105`}>
              {quote.category}
            </Badge>
          </div>

          {/* 标签和操作按钮区域 */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            {/* 话题标签 */}
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

            {/* 操作按钮组 */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* 收藏按钮 */}
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 transition-all duration-300 ${
                  liked ? "text-red-500 hover:text-red-600" : "hover:text-accent"
                } hover:scale-125 active:scale-95 hover:rotate-12`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 transition-all duration-300 ${liked ? "fill-current animate-pulse" : ""}`} />
              </Button>
              {/* 分享按钮 */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:text-accent transition-all duration-300 hover:scale-125 active:scale-95 hover:-rotate-12"
                onClick={handleShare}
                disabled={isSharing}
              >
                <Share2 className={`h-4 w-4 transition-all duration-300 ${isSharing ? "animate-spin" : ""}`} />
              </Button>
              {/* 查看详情按钮 */}
              <Link href={`/quote/${quote.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:text-accent transition-all duration-300 hover:scale-125 active:scale-95"
                >
                  <ExternalLink className="h-4 w-4 transition-all duration-300 hover:translate-x-0.5 hover:-translate-y-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
