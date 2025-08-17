"use client"

import type React from "react"
import { Search, Filter, X, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

interface SearchAndFilterProps {
  onSearchChange: (searchTerm: string) => void
  onCategoryChange: (category: string) => void
  searchTerm: string
  selectedCategory: string
  categories: string[]
}

export function SearchAndFilter({
  onSearchChange,
  onCategoryChange,
  searchTerm,
  selectedCategory,
  categories,
}: SearchAndFilterProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const clearSearch = () => {
    onSearchChange("")
  }

  const clearAllFilters = () => {
    onSearchChange("")
    onCategoryChange("全部")
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索名言名句、作者、出处或标签..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between md:hidden">
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                筛选分类
                <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-3">
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {(searchTerm || selectedCategory !== "全部") && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              清除筛选
            </Button>
          )}
        </div>

        {/* Desktop Filter */}
        <div className="hidden md:flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchTerm || selectedCategory !== "全部") && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              清除筛选
            </Button>
          )}
        </div>
      </form>

      {/* Category Tags - Always visible on desktop, collapsible on mobile */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-2">
          {categories.slice(1).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Mobile Category Tags - Only show when filters are open */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent className="md:hidden">
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.slice(1).map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-95"
                onClick={() => {
                  onCategoryChange(category)
                  setIsFiltersOpen(false)
                }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== "全部") && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <span>当前筛选:</span>
          {searchTerm && (
            <Badge variant="outline" className="gap-1 max-w-48 truncate">
              搜索: {searchTerm}
              <X className="h-3 w-3 cursor-pointer hover:text-foreground" onClick={clearSearch} />
            </Badge>
          )}
          {selectedCategory !== "全部" && (
            <Badge variant="outline" className="gap-1">
              分类: {selectedCategory}
              <X className="h-3 w-3 cursor-pointer hover:text-foreground" onClick={() => onCategoryChange("全部")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
