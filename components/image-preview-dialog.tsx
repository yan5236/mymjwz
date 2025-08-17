"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Quote } from "@/lib/quotes-data"

interface ImagePreviewDialogProps {
  quote: Quote
  open: boolean
  onOpenChange: (open: boolean) => void
}

const imageStyles = {
  classic: { 
    bg: "#f9fafb", 
    primary: "#164e63", 
    secondary: "#6b7280",
    name: "经典"
  },
  elegant: { 
    bg: "#f8fafc", 
    primary: "#0f172a", 
    secondary: "#475569",
    name: "优雅"
  },
  warm: { 
    bg: "#fef7ed", 
    primary: "#9a3412", 
    secondary: "#a16207",
    name: "温暖"
  },
  modern: {
    bg: "#18181b",
    primary: "#fafafa", 
    secondary: "#a1a1aa",
    name: "现代"
  },
  gradient: {
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    primary: "#ffffff",
    secondary: "#e2e8f0", 
    name: "渐变"
  }
}

export function ImagePreviewDialog({ quote, open, onOpenChange }: ImagePreviewDialogProps) {
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof imageStyles>("classic")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 生成预览图片
  const generatePreview = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scale = 1
    canvas.width = 400
    canvas.height = 300
    
    const style = imageStyles[selectedStyle]

    // 设置背景
    if (style.bg.startsWith("linear-gradient")) {
      // 处理渐变背景
      const gradient = ctx.createLinearGradient(0, 0, 400, 300)
      gradient.addColorStop(0, "#667eea")
      gradient.addColorStop(1, "#764ba2")
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = style.bg
    }
    ctx.fillRect(0, 0, 400, 300)

    // 设置文字样式
    ctx.fillStyle = style.primary
    ctx.font = "16px serif"
    ctx.textAlign = "center"

    // 绘制名言内容（简化版，用于预览）
    const maxWidth = 350
    const words = quote.content.split("")
    let line = ""
    let y = 120

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i]
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 200, y)
        line = words[i]
        y += 25
        if (y > 200) break // 预览图不显示太多文字
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 200, y)

    // 绘制作者信息
    ctx.font = "12px sans-serif"
    ctx.fillStyle = style.secondary
    ctx.fillText(`—— ${quote.author}`, 200, y + 40)

    if (quote.source) {
      ctx.fillText(`《${quote.source}》`, 200, y + 60)
    }
  }

  // 当样式改变时重新生成预览
  useEffect(() => {
    if (open) {
      // 使用setTimeout确保Canvas已经渲染到DOM中
      setTimeout(() => {
        generatePreview()
      }, 100)
    }
  }, [selectedStyle, open, quote])

  // 下载高质量图片
  const handleDownload = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scale = 2 // 高分辨率
    canvas.width = 800 * scale
    canvas.height = 600 * scale
    ctx.scale(scale, scale)

    const style = imageStyles[selectedStyle]

    // 设置背景
    if (style.bg.startsWith("linear-gradient")) {
      const gradient = ctx.createLinearGradient(0, 0, 800, 600)
      gradient.addColorStop(0, "#667eea")
      gradient.addColorStop(1, "#764ba2")
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = style.bg
    }
    ctx.fillRect(0, 0, 800, 600)

    // 设置文字样式
    ctx.fillStyle = style.primary
    ctx.font = "32px serif"
    ctx.textAlign = "center"

    // 绘制名言内容
    const maxWidth = 700
    const words = quote.content.split("")
    let line = ""
    let y = 200

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i]
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 400, y)
        line = words[i]
        y += 50
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 400, y)

    // 绘制作者信息
    ctx.font = "24px sans-serif"
    ctx.fillStyle = style.secondary
    ctx.fillText(`—— ${quote.author}`, 400, y + 80)

    if (quote.source) {
      ctx.fillText(`《${quote.source}》`, 400, y + 120)
    }

    // 下载图片
    const link = document.createElement("a")
    link.download = `名言-${quote.author}-${style.name}-${quote.id}.png`
    link.href = canvas.toDataURL("image/png", 1.0)
    link.click()
    
    // 下载完成后关闭对话框
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>图片预览与下载</DialogTitle>
          <DialogDescription>
            选择您喜欢的图片样式，预览效果后即可下载高质量图片
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 样式选择器 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">选择样式:</span>
            </div>
            <Select value={selectedStyle} onValueChange={(value) => setSelectedStyle(value as keyof typeof imageStyles)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(imageStyles).map(([key, style]) => (
                  <SelectItem key={key} value={key}>
                    {style.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 预览区域 */}
          <div className="flex justify-center">
            <div className="border rounded-lg p-4 bg-muted/50">
              <canvas
                ref={canvasRef}
                className="border rounded shadow-sm"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <p className="text-center text-sm text-muted-foreground mt-2">预览效果</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            下载图片
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}