import { notFound } from "next/navigation"
import { QuoteDetail } from "@/components/quote-detail"
import { RelatedQuotes } from "@/components/related-quotes"
import { Footer } from "@/components/footer"
import { getQuotes } from "@/lib/quotes-data"
import { getQuoteFromMarkdown } from "@/lib/quote-markdown-loader"
import type { Metadata } from "next"

interface QuotePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const quote = await getQuoteFromMarkdown(Number.parseInt(params.id))

  if (!quote) {
    return {
      title: "名言未找到 - 名言名句网",
    }
  }

  return {
    title: `${quote.content} - ${quote.author} | 名言名句网`,
    description: `${quote.author}的经典名言："${quote.content}"，出自《${quote.source}》。更多${quote.category}类名言名句，尽在名言名句网。`,
  }
}

export default async function QuotePage({ params }: QuotePageProps) {
  const [quote, allQuotes] = await Promise.all([
    getQuoteFromMarkdown(Number.parseInt(params.id)),
    getQuotes()
  ])

  if (!quote) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          <QuoteDetail quote={quote} />
          <RelatedQuotes currentQuote={quote} allQuotes={allQuotes} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const quotes = await getQuotes()
  return quotes.map((quote) => ({
    id: quote.id.toString(),
  }))
}
