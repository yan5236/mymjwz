import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 分类标签颜色映射
export const categoryColors = {
  "励志": "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500",
  "人生感悟": "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-500",
  "爱情": "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-500",
  "友情": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500",
  "成功": "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500",
  "学习": "bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-yellow-500",
  "时间": "bg-gradient-to-r from-gray-600 to-slate-600 text-white border-gray-600",
  "梦想": "bg-gradient-to-r from-violet-500 to-purple-600 text-white border-violet-500",
  "坚持": "bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-teal-500",
} as const

export function getCategoryStyle(category: string): string {
  return categoryColors[category as keyof typeof categoryColors] || "bg-gradient-to-r from-slate-500 to-gray-500 text-white border-slate-500"
}
