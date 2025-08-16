"use client"

import { useState } from "react"
import { Quote, Menu, Home, Heart, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const getRandomQuote = () => {
    const randomId = Math.floor(Math.random() * 10) + 1
    return `/quote/${randomId}`
  }

  const closeSheet = () => setIsOpen(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Quote className="h-8 w-8 text-primary" />
            <span className="text-xl font-serif font-bold text-card-foreground">名言名句网</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              首页
            </Link>
            <Link href="/?category=励志" className="text-muted-foreground hover:text-foreground transition-colors">
              分类
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              收藏
            </Link>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hover:bg-accent hover:text-accent-foreground transition-colors bg-transparent"
            >
              <Link href={getRandomQuote()}>随机一句</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <Quote className="h-6 w-6 text-primary" />
                    名言名句网
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    onClick={closeSheet}
                    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    <Home className="h-5 w-5" />
                    首页
                  </Link>
                  <Link
                    href="/?category=励志"
                    onClick={closeSheet}
                    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    <Quote className="h-5 w-5" />
                    分类浏览
                  </Link>
                  <Link
                    href="#"
                    onClick={closeSheet}
                    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    <Heart className="h-5 w-5" />
                    我的收藏
                  </Link>
                  <div className="pt-4 border-t border-border">
                    <Button asChild className="w-full justify-start gap-3 bg-transparent" variant="outline">
                      <Link href={getRandomQuote()} onClick={closeSheet}>
                        <Shuffle className="h-5 w-5" />
                        随机一句
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
