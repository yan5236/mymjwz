import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-8xl">📖</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-foreground">名言未找到</h1>
          <p className="text-muted-foreground">抱歉，您访问的名言页面不存在或已被移除。</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回上页
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
