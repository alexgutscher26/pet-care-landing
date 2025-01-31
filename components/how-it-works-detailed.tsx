export function HowItWorksDetailed() {
  return (
    <section className="py-24">
          <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[800px] rounded-lg border bg-card p-8">
          <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div>
                <h3 className="font-bold">Sign Up & Connect</h3>
                <p className="text-muted-foreground">
                  Create your account and connect your preferred communication channels for pet care updates
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <div>
                <h3 className="font-bold">Add Your Pet's Information</h3>
                <p className="text-muted-foreground">
                  Input your pet's details and health history so our AI can provide personalized care recommendations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <div>
                <h3 className="font-bold">Receive Smart Care Support</h3>
                <p className="text-muted-foreground">
                  Get thoughtful reminders and insights that help you maintain optimal care for your pet's well-being
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

