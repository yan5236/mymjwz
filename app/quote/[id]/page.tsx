import { notFound } from "next/navigation"
import { QuoteDetail } from "@/components/quote-detail"
import { RelatedQuotes } from "@/components/related-quotes"
import { quotes } from "@/lib/quotes-data"
import type { Metadata } from "next"

interface QuotePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const quote = quotes.find((q) => q.id === Number.parseInt(params.id))

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

export default function QuotePage({ params }: QuotePageProps) {
  const quote = quotes.find((q) => q.id === Number.parseInt(params.id))

  if (!quote) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <QuoteDetail quote={quote} />
          <RelatedQuotes currentQuote={quote} />
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return quotes.map((quote) => ({
    id: quote.id.toString(),
  }))
}
