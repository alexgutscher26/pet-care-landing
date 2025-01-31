import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function LongTermSuccess() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="secondary" className="h-6">
              Why PetCare Exists
            </Badge>
            <h2 className="text-3xl font-serif font-medium tracking-tight sm:text-4xl md:text-5xl">
              The Long Game of Pet Wellness
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You know what's funny about building a lasting relationship with your pet? It's a lot like tending to a
                garden. You don't see results overnight, but with consistent care and attention, something magical
                happens.
              </p>
              <p>
                We've seen it countless times – pet parents checking health metrics daily, hoping for quick
                improvements, feeling concerned when progress seems slow. But here's what we've learned: true pet
                wellness isn't about dramatic overnight changes. It's about getting 1% better each day, showing up when
                motivation is low, and trusting that these small improvements compound over time.
              </p>
            </div>
          </div>
          <div className="lg:pl-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Small Steps, Big Results</h3>
              <Progress value={85} className="h-2 w-full" />
              <p className="text-sm text-muted-foreground">85% of pet parents see improvement within 3 months</p>
            </div>
            <blockquote className="border-l-2 pl-6 italic">
              "The difference between a healthy pet and a thriving pet is what you do consistently, not occasionally."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

