"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { QuotesList } from "@/components/quotes-list"
import { SearchAndFilter } from "@/components/search-and-filter"
import { filterQuotes, type Quote } from "@/lib/quotes-data"

interface HomeClientProps {
  initialQuotes: Quote[]
  initialCategories: string[]
}

export function HomeClient({ initialQuotes, initialCategories }: HomeClientProps) {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  const filteredQuotes = useMemo(() => {
    return filterQuotes(initialQuotes, searchTerm, selectedCategory)
  }, [initialQuotes, searchTerm, selectedCategory])

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <div className="text-center space-y-3 md:space-y-4 animate-in fade-in slide-in-from-top-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">名言名句网</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          汇聚古今中外经典名言警句，让智慧的光芒照亮人生之路
        </p>
      </div>

      <div
        className="animate-in fade-in slide-in-from-top-4"
        style={{ animationDelay: "200ms", animationFillMode: "both" }}
      >
        <SearchAndFilter
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={initialCategories}
        />
      </div>

      <div
        className="animate-in fade-in slide-in-from-bottom-4"
        style={{ animationDelay: "400ms", animationFillMode: "both" }}
      >
        <QuotesList quotes={filteredQuotes} searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}