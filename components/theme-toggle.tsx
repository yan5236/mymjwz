"use client"
import { Moon, Sun, Waves, Sunset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

/**
 * ThemeToggle 主题切换组件
 * 提供多种主题选择：浅色、深色、海洋、日落
 * 使用下拉菜单形式展示所有主题选项
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  /**
   * 根据当前主题返回对应的图标
   * @returns React 图标组件
   */
  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case "ocean":
        return <Waves className="h-[1.2rem] w-[1.2rem]" />
      case "sunset":
        return <Sunset className="h-[1.2rem] w-[1.2rem]" />
      default: // light 主题或未设置
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  return (
    <DropdownMenu>
      {/* 主题切换按钮 - 显示当前主题图标 */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          {getThemeIcon()}
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      {/* 主题选择下拉菜单 */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>浅色</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>深色</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("ocean")}>
          <Waves className="mr-2 h-4 w-4" />
          <span>海洋</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("sunset")}>
          <Sunset className="mr-2 h-4 w-4" />
          <span>日落</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
