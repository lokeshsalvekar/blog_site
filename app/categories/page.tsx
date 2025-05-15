"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Database, Server, Shield, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Static topic data for GitHub Pages
const categories = [
  {
    title: "Static Service",
    description: "Deploy static websites and assets with global CDN distribution for lightning-fast loading times.",
    icon: <Cloud className="h-6 w-6" />,
    count: 12,
    slug: "static",
  },
  {
    title: "Web Service",
    description: "Host dynamic web applications with auto-scaling capabilities to handle any traffic load.",
    icon: <Server className="h-6 w-6" />,
    count: 8,
    slug: "web",
  },
  {
    title: "Backend Service",
    description: "Run your API and backend services with high availability and seamless scaling.",
    icon: <Database className="h-6 w-6" />,
    count: 15,
    slug: "backend",
  },
  {
    title: "Database Service",
    description: "Managed database solutions with automatic backups, scaling, and high availability.",
    icon: <Database className="h-6 w-6" />,
    count: 6,
    slug: "database",
  },
  {
    title: "Monitoring Service",
    description: "Real-time monitoring and alerting for your applications and infrastructure.",
    icon: <Shield className="h-6 w-6" />,
    count: 9,
    slug: "monitoring",
  },
  {
    title: "Security Service",
    description: "Protect your applications and data with advanced security features and compliance tools.",
    icon: <Shield className="h-6 w-6" />,
    count: 11,
    slug: "security",
  },
]

export default function CategoriesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(categories)
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

  // Filter categories based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = categories.filter(
        (category) =>
          category.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      )
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories(categories)
    }
  }, [debouncedSearchTerm])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsSearching(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar activePath="/categories/" />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Categories</h1>

          <div className="relative mb-8 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search categories..."
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

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No categories found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  count={category.count}
                  slug={category.slug}
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

function CategoryCard({ title, description, icon, count, slug = "" }) {
  return (
    <Link href={`/categories/${slug}`} className="group">
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
