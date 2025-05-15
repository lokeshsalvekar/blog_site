"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Database, Server, Shield, Github, Linkedin, Mail, Rss, Twitter, Search } from "lucide-react"
import { useRouter } from "next/navigation"

// Static topic data for GitHub Pages
const topics = [
  {
    title: "Serverless Computing",
    description: "Deploy applications without managing servers. Scale automatically and pay only for what you use.",
    icon: <Cloud className="h-6 w-6" />,
    count: 12,
    slug: "serverless",
  },
  {
    title: "Container Orchestration",
    description:
      "Manage containerized applications with powerful orchestration tools like Kubernetes and Docker Swarm.",
    icon: <Database className="h-6 w-6" />,
    count: 8,
    slug: "containers",
  },
  {
    title: "Infrastructure as Code",
    description: "Automate infrastructure provisioning and management with code-based approaches.",
    icon: <Server className="h-6 w-6" />,
    count: 15,
    slug: "iac",
  },
  {
    title: "Cloud Security",
    description: "Protect your cloud resources and data with best practices and security tools.",
    icon: <Shield className="h-6 w-6" />,
    count: 6,
    slug: "security",
  },
  {
    title: "Multi-Cloud Strategy",
    description: "Leverage multiple cloud providers to optimize costs and improve reliability.",
    icon: <Cloud className="h-6 w-6" />,
    count: 9,
    slug: "multi-cloud",
  },
  {
    title: "DevOps Practices",
    description: "Implement continuous integration, delivery, and deployment for faster releases.",
    icon: <Server className="h-6 w-6" />,
    count: 11,
    slug: "devops",
  },
]

export default function TopicsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [filteredTopics, setFilteredTopics] = useState(topics)
  const [isSearching, setIsSearching] = useState(false)

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setIsSearching(false)
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  // Filter topics based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          topic.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      )
      setFilteredTopics(filtered)
    } else {
      setFilteredTopics(topics)
    }
  }, [debouncedSearchTerm])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsSearching(true)
  }

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              <span className="text-primary">Megh</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/articles/" className="text-muted-foreground hover:text-foreground transition-colors">
                Articles
              </Link>
              <Link href="/topics/" className="text-foreground transition-colors border-b-2 border-primary pb-1">
                Services
              </Link>
              <Link href="/about/" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden sm:flex" onClick={handleSubscribeClick}>
                Subscribe
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Link href="/contact">Get Started</Link>
              </Button>
              <button className="md:hidden text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Our Services</h1>

          <div className="relative mb-8 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>

          {filteredTopics.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No services found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic, index) => (
                <TopicCard
                  key={index}
                  title={topic.title}
                  description={topic.description}
                  icon={topic.icon}
                  count={topic.count}
                  slug={topic.slug}
                />
              ))}
            </div>
          )}
        </section>
      </main>

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
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Rss className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Serverless Deployment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Container Orchestration
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Multi-Cloud Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    CI/CD Pipelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Monitoring & Logging
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Code Samples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
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
    </div>
  )
}

function TopicCard({ title, description, icon, count, slug = "" }) {
  return (
    <Link href={`/articles/`} className="group">
      <Card className="bg-card border-border hover:border-primary/50 transition-colors h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">{icon}</div>
            <div className="bg-secondary px-3 py-1 rounded-full text-sm">{count} articles</div>
          </div>
          <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <span className="text-primary text-sm group-hover:text-primary/80 transition-colors">View articles →</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
