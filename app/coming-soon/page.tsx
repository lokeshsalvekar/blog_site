"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="fixed inset-0 -z-10 opacity-10">
        <Image src="/images/earth-background.png" alt="Earth background" fill className="object-cover" />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">Coming Soon</h1>
          <p className="text-xl text-muted-foreground mb-12">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>

          <div className="grid grid-cols-4 gap-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">{timeLeft.days}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">{timeLeft.hours}</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">{timeLeft.minutes}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">{timeLeft.seconds}</div>
              <div className="text-sm text-muted-foreground">Seconds</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
