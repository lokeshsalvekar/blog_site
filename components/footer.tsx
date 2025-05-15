import Link from "next/link"
import { Github, Linkedin, Mail, Rss, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              <span className="text-primary">Megh</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Modern cloud deployment platform for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Rss className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/categories/static" className="hover:text-foreground transition-colors">
                  Static Service
                </Link>
              </li>
              <li>
                <Link href="/categories/web" className="hover:text-foreground transition-colors">
                  Web Service
                </Link>
              </li>
              <li>
                <Link href="/categories/backend" className="hover:text-foreground transition-colors">
                  Backend Service
                </Link>
              </li>
              <li>
                <Link href="/categories/database" className="hover:text-foreground transition-colors">
                  Database Service
                </Link>
              </li>
              <li>
                <Link href="/categories/monitoring" className="hover:text-foreground transition-colors">
                  Monitoring Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/resources/documentation" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/resources/api" className="hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/resources/examples" className="hover:text-foreground transition-colors">
                  Code Examples
                </Link>
              </li>
              <li>
                <Link href="/resources/tutorials" className="hover:text-foreground transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/resources/community" className="hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@megh.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Megh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
