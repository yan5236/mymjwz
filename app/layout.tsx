import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "名言名句网 - 经典语录与智慧格言",
  description: "收录古今中外经典名言名句，提供分类筛选和搜索功能，让智慧触手可及",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${workSans.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="light" storageKey="quotes-ui-theme">
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
