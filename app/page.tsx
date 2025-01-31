import { Metadata } from 'next'
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AiPersonalization } from "@/components/ai-personalization"
import { AiFeatures } from "@/components/ai-features"
import { HowItWorksDetailed } from "@/components/how-it-works-detailed"
import { LongTermSuccess } from "@/components/long-term-success"
import { SimplePricing } from "@/components/simple-pricing"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FeaturesGradient } from "@/components/features-gradient"
import { AnimatedBeamMultipleOutputDemo } from "@/components/process-diagram"

export const metadata: Metadata = {
  title: 'Pet Care - Modern Pet Management Made Easy',
  description: 'Simplify your pet care routine with our comprehensive pet management platform. Track health records, schedule appointments, and manage multiple pets effortlessly.',
  openGraph: {
    title: 'Pet Care - Modern Pet Management Made Easy',
    description: 'Simplify your pet care routine with our comprehensive pet management platform.',
    images: [
      {
        url: '/og-landing.jpg',
        width: 1200,
        height: 630,
        alt: 'Pet Care Landing Page'
      }
    ]
  }
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
        <AiPersonalization />
        <AiFeatures />
        <AnimatedBeamMultipleOutputDemo />
        <HowItWorksDetailed />
        <LongTermSuccess />
        <SimplePricing />
      </main>
      <EnhancedFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Pet Care',
            description: 'A comprehensive pet management platform for tracking pet health, schedules, and care.',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1250'
            }
          })
        }}
      />
    </div>
  )
}
