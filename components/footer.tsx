import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <form className="flex w-full max-w-sm gap-2">
              <Input placeholder="Enter your email" type="email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
            <nav className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </nav>
            <p className="text-sm text-muted-foreground">© 2024 PetCare.ai. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

