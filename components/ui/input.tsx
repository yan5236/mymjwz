import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input 输入框组件 - 基于原生 input 元素的增强版本
 * 提供统一的样式和焦点状态处理，支持文件上传和表单验证
 * 
 * @param className - 额外的 CSS 类名
 * @param type - 输入框类型（text, password, email, file 等）
 * @param props - 其他 HTML input 属性
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 基础样式：边框、内边距、圆角、背景等
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        // 文件上传样式
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // 禁用状态样式
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // 焦点状态样式
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // 验证错误状态样式
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
