"use client"

import { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Clock, Database, Eye, Server } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const newsletterRef = useRef<HTMLElement>(null)

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar activePath="/" />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Modern <span className="text-primary">Cloud Deployment</span> Made Simple
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Deploy, scale, and manage your applications with ease using Megh's powerful cloud platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90">
                  <Link href="/articles/">Explore Platform</Link>
                </Button>
                <Button variant="outline" className="border-border hover:bg-accent" onClick={scrollToNewsletter}>
                  Join Newsletter
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="Cloud infrastructure visualization"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Services</h2>
            <Link href="/categories/" className="text-primary hover:text-primary/80 text-sm flex items-center gap-2">
              View all <Eye className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard
              title="Static Service"
              description="Deploy static websites and assets with global CDN distribution for lightning-fast loading times."
              image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&h=400&auto=format&fit=crop"
              date="May 15, 2025"
              category="Static"
              icon={<Cloud className="h-5 w-5" />}
              slug="static-service"
            />
            <FeaturedCard
              title="Web Service"
              description="Host dynamic web applications with auto-scaling capabilities to handle any traffic load."
              image="https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=600&h=400&auto=format&fit=crop"
              date="June 2, 2025"
              category="Web"
              icon={<Server className="h-5 w-5" />}
              slug="web-service"
            />
            <FeaturedCard
              title="Backend Service"
              description="Run your API and backend services with high availability and seamless scaling."
              image="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&h=400&auto=format&fit=crop"
              date="June 28, 2025"
              category="Backend"
              icon={<Database className="h-5 w-5" />}
              slug="backend-service"
            />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArticleCard
              title="Optimizing Static Sites for Performance"
              description="Learn how to optimize your static websites for better performance and lower costs."
              category="Static"
              date="May 5, 2025"
              slug="optimizing-static-sites"
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Scaling Web Applications with Kubernetes"
              description="Discover how to scale your web applications using Kubernetes orchestration."
              category="Web"
              date="May 18, 2025"
              slug="scaling-web-applications"
              image="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Building Resilient Backend Services"
              description="Best practices for creating reliable and resilient backend services."
              category="Backend"
              date="June 3, 2025"
              slug="resilient-backend-services"
              image="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Securing Your Cloud Infrastructure"
              description="Best practices for securing your cloud infrastructure and protecting your data."
              category="Security"
              date="June 15, 2025"
              slug="securing-cloud-infrastructure"
              image="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Cost Optimization Strategies for AWS"
              description="Learn how to reduce your AWS bill with these proven cost optimization strategies."
              category="Cost Management"
              date="July 2, 2025"
              slug="aws-cost-optimization"
              image="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Multi-Region Deployment for High Availability"
              description="Improve the reliability of your applications with multi-region deployment strategies."
              category="Architecture"
              date="July 20, 2025"
              slug="multi-region-deployment"
              image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&h=400&auto=format&fit=crop"
            />
          </div>
        </section>

        <section ref={newsletterRef} id="newsletter" className="bg-card rounded-xl p-8 mb-20 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Stay Updated</h2>
              <p className="text-muted-foreground">
                Subscribe to our newsletter to receive the latest insights on cloud technologies, tutorials, and
                industry news.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background border-input focus-visible:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }) {
  return (
    <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-primary mb-2">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <Link href={`/blog/${slug}/`} className="text-primary hover:text-primary/80">
          Read more →
        </Link>
      </CardFooter>
    </Card>
  )
}

function ArticleCard({ title, description, category, date, slug = "", image }) {
  return (
    <Link href={`/blog/${slug}/`} className="group">
      <div className="space-y-3">
        <div className="relative h-48 rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
          <Image src={image || "/placeholder.svg"} alt={`${title} thumbnail`} fill className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-primary mb-2">
            <Cloud className="h-4 w-4" />
            <span>{category}</span>
          </div>
          <h3 className="font-medium group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
