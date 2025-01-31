import { MessageCircle, TrendingUp, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AiFeatures() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Badge variant="secondary" className="h-6">
            Features
          </Badge>
          <h2 className="text-3xl font-serif font-medium tracking-tight sm:text-4xl md:text-5xl">
            AI-Enhanced Pet Care System
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Your personal AI companion that understands the unique needs and challenges of pet parenthood
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 mt-16 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Smart Messages</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your pet's needs and sends personalized care reminders and recommendations
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Progress Tracking</h3>
            <p className="text-muted-foreground">
              Track your pet's health journey over time. We'll help you celebrate improvements and maintain consistent
              care
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Multi-Channel Delivery</h3>
            <p className="text-muted-foreground">
              Get updates and alerts through your preferred channels - email, SMS, or push notifications
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

