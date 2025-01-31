"use client";

import { Badge } from "@/components/ui/badge"
import { CTAButton } from "@/components/animated-button"
import { AnimatedList } from "@/components/ui/animated-list"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { useRef } from "react"
import { ArrowRightIcon } from "lucide-react"
import { AnimatedShinyText } from "./ui/animated-shiny-text"
import { AuroraText } from "./ui/aurora-text"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];

  const features = [
    <div key="feature-1" className="flex items-start gap-3 rounded-lg border bg-background/60 p-4 backdrop-blur-sm">
      <span className="mt-1 text-xl">🐾</span>
      <div>
        <p className="font-medium">Smart Pet Care Reminders</p>
        <p className="text-sm text-muted-foreground">Never miss a walk, meal, or playtime with AI-powered scheduling</p>
      </div>
    </div>,
    <div key="feature-2" className="flex items-start gap-3 rounded-lg border bg-background/60 p-4 backdrop-blur-sm">
      <span className="mt-1 text-xl">💊</span>
      <div>
        <p className="font-medium">Medication Tracking</p>
        <p className="text-sm text-muted-foreground">Track medications, dosages, and set precise reminder intervals</p>
      </div>
    </div>,
    <div key="feature-5" className="flex items-start gap-3 rounded-lg border bg-background/60 p-4 backdrop-blur-sm">
      <span className="mt-1 text-xl">🏥</span>
      <div>
        <p className="font-medium">Emergency Care Access</p>
        <p className="text-sm text-muted-foreground">Quick access to nearby vets and emergency care facilities</p>
      </div>
    </div>,
  ];

  return (
    <section className="relative min-h-screen" ref={containerRef}>
      <div className="absolute bottom-8 left-8 w-80">
        <AnimatedList delay={800} className="w-full">
          {features}
        </AnimatedList>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div className="container flex flex-col items-center px-4 md:px-6">
          <AnimatedShinyText className="inline-flex secondary mb-6 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <Badge>✨ Introducing Magic UI</Badge>
          </AnimatedShinyText>

          <h1 className="text-center font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your <AuroraText>Personal</AuroraText>
            <br />
            Pet Assistant
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-center text-lg text-muted-foreground">
            Managing pet care is hard. Sometimes you need
            <br />
            an AI companion to help you keep track.
          </p>

          <div className="mt-10">
            <CTAButton>Start Your Journey</CTAButton>
          </div>

          <div className="mt-8">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
          </div>

          <p suppressHydrationWarning className="mt-6 text-center text-sm text-muted-foreground">
            30-day money back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}