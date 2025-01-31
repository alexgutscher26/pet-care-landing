import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type React from "react" // Added import for React
import { RainbowButton } from "./ui/rainbow-button"

export function SimplePricing() {
  return (
    <section className="relative py-24 overflow-hidden ">
      {/* Blue to Red gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-red-500/20 
        opacity-50 blur-3xl"
      />

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-serif font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Simple concept, simple pricing
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            For the price of a pet treat per month, you could be ensuring your pet's optimal health! Most pet parents
            miss important care milestones due to lack of proper tracking.
          </p>

          <div className="mt-8 space-y-2">
            <div className="text-4xl font-bold">$5 / month</div>
            <p className="text-sm text-muted-foreground">30-day money back guarantee • Cancel anytime</p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>AI-powered pet care recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Notifications via Email, SMS, or App alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Comprehensive health tracking dashboard</span>
            </div>
          </div>

          <RainbowButton>Get Started</RainbowButton>
        </div>
      </div>
    </section>
  )
}
