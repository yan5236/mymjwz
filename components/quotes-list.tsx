"use client"

import { useState } from "react"
import { QuoteCard } from "@/components/quote-card"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"
import type { Quote } from "@/lib/quotes-data"

interface QuotesListProps {
  quotes: Quote[]
  searchTerm: string
  selectedCategory: string
}

export function QuotesList({ quotes, searchTerm, selectedCategory }: QuotesListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {quotes.length > 0 ? (
            <>
              找到 <span className="font-medium text-foreground">{quotes.length}</span> 条名言名句
            </>
          ) : (
            <>未找到匹配的名言名句</>
          )}
        </p>

        {quotes.length > 0 && (
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {quotes.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "grid gap-6 md:grid-cols-2 lg:grid-cols-1"
          }
        >
          {quotes.map((quote, index) => (
            <div
              key={quote.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
            >
              <QuoteCard quote={quote} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-6xl">📚</div>
          <h3 className="text-lg font-medium text-foreground">暂无匹配结果</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {searchTerm || selectedCategory !== "全部" ? "尝试调整搜索条件或选择其他分类" : "暂时没有名言名句数据"}
          </p>
        </div>
      )}
    </div>
  )
}
