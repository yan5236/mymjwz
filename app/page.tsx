import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomeClient } from "@/components/home-client"
import { getQuotes, getCategories } from "@/lib/quotes-data"

export default async function HomePage() {
  const [quotes, categories] = await Promise.all([
    getQuotes(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-8 flex-1">
        <Suspense fallback={<div>加载中...</div>}>
          <HomeClient initialQuotes={quotes} initialCategories={categories} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
