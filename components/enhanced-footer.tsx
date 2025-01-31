import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Heart } from "lucide-react"

export function EnhancedFooter() {
  return (
    <footer className="relative border-t">
      {/* Gradient background that connects with pricing section */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-purple-500/10 to-red-500/20 
        opacity-50" />
      
      <div className="container relative px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">About PetCare</h3>
            <p className="text-sm text-muted-foreground">
              Empowering pet parents with AI-driven care solutions for happier, healthier pets.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>for pets</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="#features" className="hover:text-primary">
                Features
              </Link>
              <Link href="#pricing" className="hover:text-primary">
                Pricing
              </Link>
              <Link href="#about" className="hover:text-primary">
                About Us
              </Link>
              <Link href="#contact" className="hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stay Updated</h3>
            <form className="flex flex-col space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button type="submit" variant="outline">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground"> 2024 PetCare.ai. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
