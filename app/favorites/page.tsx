"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { QuoteCard } from "@/components/quote-card"
import { getFavorites } from "@/lib/favorites"
import { Heart } from "lucide-react"
import { PageAnimation, SlideInFromTop, StaggeredAnimation } from "@/components/page-animation"
import type { Quote } from "@/lib/quotes-data"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Quote[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFavorites(getFavorites())
  }, [])

  // 监听 storage 事件，当其他页面修改收藏时同步更新
  useEffect(() => {
    const handleStorageChange = () => {
      setFavorites(getFavorites())
    }

    window.addEventListener("storage", handleStorageChange)
    
    // 添加自定义事件监听，用于同一页面内的收藏状态更新
    window.addEventListener("favoritesChanged", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favoritesChanged", handleStorageChange)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6 md:py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">加载中...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="space-y-6">
          {/* 页面标题 */}
          <SlideInFromTop>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-8 w-8 text-red-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">我的收藏</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                您收藏的经典名言名句
              </p>
            </div>
          </SlideInFromTop>

          {/* 收藏统计 */}
          <PageAnimation delay={200}>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                共收藏 <span className="font-semibold text-primary">{favorites.length}</span> 条名言
              </p>
            </div>
          </PageAnimation>

          {/* 收藏列表 */}
          {favorites.length === 0 ? (
            <PageAnimation delay={400}>
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">还没有收藏任何名言</h3>
                <p className="text-muted-foreground mb-6">
                  浏览名言时点击心形图标即可收藏您喜欢的内容
                </p>
                <a 
                  href="/" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                >
                  去发现名言
                </a>
              </div>
            </PageAnimation>
          ) : (
            <PageAnimation delay={400}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {favorites.map((quote, index) => (
                  <div
                    key={quote.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ 
                      animationDelay: `${600 + index * 100}ms`, 
                      animationFillMode: "both" 
                    }}
                  >
                    <QuoteCard 
                      quote={quote}
                      onFavoriteChange={() => {
                        // 重新获取收藏列表以更新显示
                        setFavorites(getFavorites())
                      }}
                    />
                  </div>
                ))}
              </div>
            </PageAnimation>
          )}
        </div>
      </main>
    </div>
  )
}