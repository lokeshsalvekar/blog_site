"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

interface NavbarProps {
  activePath?: string
}

export function Navbar({ activePath = "/" }: NavbarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            <span className="text-primary">Megh</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link
              href="/"
              className={
                activePath === "/"
                  ? "text-foreground transition-colors border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              Home
            </Link>
            <Link
              href="/articles/"
              className={
                activePath === "/articles/"
                  ? "text-foreground transition-colors border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              Articles
            </Link>
            <Link
              href="/services/"
              className={
                activePath === "/services/"
                  ? "text-foreground transition-colors border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              Services
            </Link>
            <Link
              href="/about/"
              className={
                activePath === "/about/"
                  ? "text-foreground transition-colors border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">{user.email}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user.isAdmin && (
                    <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>Dashboard</DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="hidden sm:flex" onClick={() => router.push("/auth/login")}>
                Sign In
              </Button>
            )}

            <Button className="bg-primary hover:bg-primary/90 hidden sm:flex">
              <Link href="/contact">Get Started</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-6">
                  <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                  <Link href="/articles/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Articles
                  </Link>
                  <Link href="/services/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Services
                  </Link>
                  <Link href="/about/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    About
                  </Link>
                  {user ? (
                    <>
                      {user.isAdmin && (
                        <Link href="/admin/dashboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                          Dashboard
                        </Link>
                      )}
                      <Button onClick={logout}>Logout</Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        router.push("/auth/login")
                        setIsOpen(false)
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                  <Button className="bg-primary hover:bg-primary/90">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
