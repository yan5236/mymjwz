"use client"

import { useState, useEffect } from "react"
import { Quote, Menu, Home, Heart, Shuffle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRandomQuote = async () => {
    try {
      const response = await fetch('/api/random-quote')
      const data = await response.json()
      
      if (data.id) {
        window.location.href = `/quote/${data.id}`
      } else {
        console.error('Failed to get random quote:', data.error)
      }
    } catch (error) {
      console.error('Error fetching random quote:', error)
    }
  }

  const closeSheet = () => setIsOpen(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 hover:scale-105">
            <Quote className="h-8 w-8 text-primary transition-all duration-300 hover:rotate-12" />
            <span className="text-xl font-serif font-bold text-card-foreground transition-all duration-300">名言名句网</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 relative group">
              <span>首页</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/favorites" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 relative group">
              <span>收藏</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 relative group">
              <span>关于</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-md"
              onClick={mounted ? handleRandomQuote : undefined}
            >
              随机一句
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
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
                    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-all duration-300 py-2 hover:scale-105 hover:bg-accent/50 rounded-lg px-2"
                  >
                    <Home className="h-5 w-5 transition-all duration-300" />
                    首页
                  </Link>
                  <Link
                    href="/favorites"
                    onClick={closeSheet}
                    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-all duration-300 py-2 hover:scale-105 hover:bg-accent/50 rounded-lg px-2"
                  >
                    <Heart className="h-5 w-5 transition-all duration-300" />
                    我的收藏
                  </Link>
                  <Link
                    href="/about"
                    onClick={closeSheet}
                    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-all duration-300 py-2 hover:scale-105 hover:bg-accent/50 rounded-lg px-2"
                  >
                    <Info className="h-5 w-5 transition-all duration-300" />
                    关于我们
                  </Link>
                  <div className="pt-4 border-t border-border">
                    <Button 
                      className="w-full justify-start gap-3 bg-transparent hover:scale-105 transition-all duration-300" 
                      variant="outline"
                      onClick={() => {
                        if (mounted) {
                          handleRandomQuote()
                          closeSheet()
                        }
                      }}
                    >
                      <Shuffle className="h-5 w-5 transition-all duration-300" />
                      随机一句
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
