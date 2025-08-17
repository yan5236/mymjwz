"use client"

import type React from "react"
import { Github, Heart } from "lucide-react"
import Link from "next/link"

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 项目信息 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">名言名句网</h3>
            <p className="text-sm text-muted-foreground">
              收录古今中外经典名言名句，传播智慧与思想
            </p>
          </div>

          {/* 链接 */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">相关链接</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link 
                href="https://github.com/yan5236/mymjwz" 
                className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub 仓库
              </Link>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">版权信息</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>© 2025 名言名句网</p>
              <p className="inline-flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500" fill="currentColor" /> 
                by developers
              </p>
            </div>
          </div>
        </div>

        {/* 底部分割线和简化版权 */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>© 2025 名言名句网. All rights reserved.</p>
            <p>基于 Next.js 15 构建</p>
          </div>
        </div>
      </div>
    </footer>
  )
}