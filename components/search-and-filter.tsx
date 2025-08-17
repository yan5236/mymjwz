"use client"

import type React from "react"
import { Search, Filter, X, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

/**
 * SearchAndFilter 组件的属性接口
 * @param onSearchChange - 搜索词变化时的回调函数
 * @param onCategoryChange - 分类变化时的回调函数
 * @param searchTerm - 当前搜索词
 * @param selectedCategory - 当前选中的分类
 * @param categories - 可用的分类列表
 */
interface SearchAndFilterProps {
  onSearchChange: (searchTerm: string) => void
  onCategoryChange: (category: string) => void
  searchTerm: string
  selectedCategory: string
  categories: string[]
}

/**
 * SearchAndFilter 搜索和筛选组件
 * 
 * 提供名言搜索和分类筛选功能，包括：
 * - 文本搜索：支持按内容、作者、出处、标签搜索
 * - 分类筛选：下拉选择器和快捷标签
 * - 响应式设计：移动端折叠式布局，桌面端展开式布局
 * - 筛选状态显示：当前激活的筛选条件
 * - 快捷清除：清除单个或所有筛选条件
 * 
 * 布局特点：
 * - 移动端：筛选选项可折叠，节省空间
 * - 桌面端：所有选项始终可见，操作更便捷
 */
export function SearchAndFilter({
  onSearchChange,
  onCategoryChange,
  searchTerm,
  selectedCategory,
  categories,
}: SearchAndFilterProps) {
  // 移动端筛选器展开状态
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  /**
   * 处理搜索表单提交（阻止默认行为）
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  /**
   * 清除搜索词
   */
  const clearSearch = () => {
    onSearchChange("")
  }

  /**
   * 清除所有筛选条件
   */
  const clearAllFilters = () => {
    onSearchChange("")
    onCategoryChange("全部")
  }

  return (
    <div className="space-y-4">
      {/* 搜索框区域 */}
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索名言名句、作者、出处或标签..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {/* 清除搜索按钮 */}
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

        {/* 移动端筛选器切换 */}
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

          {/* 移动端清除筛选按钮 */}
          {(searchTerm || selectedCategory !== "全部") && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              清除筛选
            </Button>
          )}
        </div>

        {/* 桌面端筛选器 */}
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

          {/* 桌面端清除筛选按钮 */}
          {(searchTerm || selectedCategory !== "全部") && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              清除筛选
            </Button>
          )}
        </div>
      </form>

      {/* 桌面端分类标签 - 始终可见 */}
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

      {/* 移动端分类标签 - 仅在筛选器展开时显示 */}
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
                  setIsFiltersOpen(false) // 选择后自动收起
                }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* 当前激活的筛选条件显示 */}
      {(searchTerm || selectedCategory !== "全部") && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <span>当前筛选:</span>
          {/* 搜索词标签 */}
          {searchTerm && (
            <Badge variant="outline" className="gap-1 max-w-48 truncate">
              搜索: {searchTerm}
              <X className="h-3 w-3 cursor-pointer hover:text-foreground" onClick={clearSearch} />
            </Badge>
          )}
          {/* 分类标签 */}
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
