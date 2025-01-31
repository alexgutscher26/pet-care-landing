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
    </div>
  )
}

