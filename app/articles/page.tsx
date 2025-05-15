"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cloud, Clock, Search, Filter, ChevronDown, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Static article data for GitHub Pages
const articles = [
  {
    title: "Serverless Deployment",
    description:
      "Deploy your applications without managing servers. Scale automatically and pay only for what you use.",
    category: "Static",
    date: "May 15, 2025",
    slug: "serverless-deployment",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Container Orchestration",
    description:
      "Manage your containerized applications with our powerful orchestration tools. Deploy, scale, and update with ease.",
    category: "Web",
    date: "June 2, 2025",
    slug: "container-orchestration",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Multi-Cloud Management",
    description:
      "Manage resources across multiple cloud providers from a single dashboard. Optimize costs and improve reliability.",
    category: "Backend",
    date: "June 28, 2025",
    slug: "multi-cloud-management",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Optimizing AWS Lambda Functions for Performance",
    description: "Learn how to optimize your Lambda functions for better performance and lower costs.",
    category: "Static",
    date: "May 5, 2025",
    slug: "optimizing-lambda-functions",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Kubernetes vs. ECS: Choosing the Right Container Orchestration",
    description: "Compare Kubernetes and Amazon ECS to find the best container orchestration solution for your needs.",
    category: "Web",
    date: "May 18, 2025",
    slug: "kubernetes-vs-ecs",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Implementing CI/CD Pipelines with GitHub Actions",
    description:
      "Set up continuous integration and deployment pipelines using GitHub Actions for your cloud applications.",
    category: "Backend",
    date: "June 3, 2025",
    slug: "cicd-github-actions",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&h=400&auto=format&fit=crop",
  },
]

// Extract unique categories
const categories = Array.from(new Set(articles.map((article) => article.category)))

export default function ArticlesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

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

  // Filter articles based on debounced search term and selected categories
  useEffect(() => {
    let filtered = articles

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          article.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      )
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((article) => selectedCategories.includes(article.category))
    }

    setFilteredArticles(filtered)
  }, [debouncedSearchTerm, selectedCategories])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsSearching(true)
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((c) => c !== category) : [...current, category],
    )
  }

  const handleAddBlogClick = () => {
    if (user) {
      router.push("/admin/add-blog")
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar activePath="/articles/" />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">All Articles</h1>
            <Button onClick={handleAddBlogClick} className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Blog
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder="Search articles..."
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  title={article.title}
                  description={article.description}
                  category={article.category}
                  date={article.date}
                  slug={article.slug}
                  image={article.image}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
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
