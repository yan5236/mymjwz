"use client"

import type { Quote } from "./quotes-data"

const FAVORITES_KEY = "quotes-favorites"

/**
 * 获取收藏的名言列表
 */
export function getFavorites(): Quote[] {
  if (typeof window === "undefined") return []
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("获取收藏列表失败:", error)
    return []
  }
}

/**
 * 添加名言到收藏
 */
export function addToFavorites(quote: Quote): void {
  if (typeof window === "undefined") return
  
  try {
    const favorites = getFavorites()
    const isAlreadyFavorited = favorites.some(fav => fav.id === quote.id)
    
    if (!isAlreadyFavorited) {
      const updatedFavorites = [...favorites, quote]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
    }
  } catch (error) {
    console.error("添加收藏失败:", error)
  }
}

/**
 * 从收藏中移除名言
 */
export function removeFromFavorites(quoteId: number): void {
  if (typeof window === "undefined") return
  
  try {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter(fav => fav.id !== quoteId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
  } catch (error) {
    console.error("移除收藏失败:", error)
  }
}

/**
 * 检查名言是否已收藏
 */
export function isFavorited(quoteId: number): boolean {
  if (typeof window === "undefined") return false
  
  try {
    const favorites = getFavorites()
    return favorites.some(fav => fav.id === quoteId)
  } catch (error) {
    console.error("检查收藏状态失败:", error)
    return false
  }
}

/**
 * 切换收藏状态
 */
export function toggleFavorite(quote: Quote): boolean {
  const isCurrentlyFavorited = isFavorited(quote.id)
  
  if (isCurrentlyFavorited) {
    removeFromFavorites(quote.id)
    return false
  } else {
    addToFavorites(quote)
    return true
  }
}