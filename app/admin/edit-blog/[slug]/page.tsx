"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RichTextEditor } from "@/components/rich-text-editor"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Cloud, Loader2, Save, Trash } from "lucide-react"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Blog categories
const categories = [
  "Static",
  "Web",
  "Backend",
  "Database",
  "Security",
  "DevOps",
  "Cloud",
  "Architecture",
  "Performance",
  "AI",
  "Machine Learning",
  "Blockchain",
]

// Mock blog posts data
const blogPosts = {
  "serverless-deployment": {
    title: "Serverless Deployment: The Future of Cloud Computing",
    description:
      "Deploy your applications without managing servers. Scale automatically and pay only for what you use.",
    category: "Static",
    date: "May 15, 2025",
    author: "Alex Chen",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `
      <p>Serverless computing has revolutionized the way we deploy and scale applications in the cloud. With serverless, developers can focus on writing code without worrying about the underlying infrastructure.</p>
      
      <h2 id="what-is-serverless">What is Serverless Computing?</h2>
      <p>Serverless computing is a cloud computing execution model where the cloud provider manages the infrastructure and automatically allocates resources as needed. Unlike traditional cloud computing models, serverless doesn't require you to provision or manage servers. Instead, you simply deploy your code and the cloud provider takes care of the rest.</p>
      
      <h2 id="benefits">Benefits of Serverless Deployment</h2>
      <p>Serverless deployment offers several advantages for businesses of all sizes:</p>
      
      <ul>
        <li><strong>Cost Efficiency</strong>: With serverless, you only pay for the compute time you actually use. There's no need to pay for idle servers.</li>
        <li><strong>Automatic Scaling</strong>: Serverless platforms automatically scale your application in response to demand, ensuring optimal performance during traffic spikes.</li>
        <li><strong>Reduced Operational Overhead</strong>: Without servers to manage, your team can focus on developing features rather than maintaining infrastructure.</li>
        <li><strong>Faster Time to Market</strong>: Serverless enables rapid deployment and iteration, allowing you to bring new features to market faster.</li>
      </ul>
    `,
  },
}

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [readTime, setReadTime] = useState("5 min read")
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to edit a blog post.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    // Load blog post data
    const loadBlogPost = () => {
      setIsLoading(true)

      // Simulate API call to fetch blog post
      setTimeout(() => {
        const post = blogPosts[params.slug]

        if (post) {
          setTitle(post.title)
          setDescription(post.description)
          setCategory(post.category)
          setContent(post.content)
          setImageUrl(post.image)
          setImagePreview(post.image)
          setReadTime(post.readTime)
        } else {
          toast({
            title: "Blog post not found",
            description: "The blog post you're trying to edit doesn't exist.",
            variant: "destructive",
          })
          router.push("/admin/dashboard")
        }

        setIsLoading(false)
      }, 1000)
    }

    loadBlogPost()
  }, [user, params.slug, router, toast])

  // Calculate read time based on content length
  useEffect(() => {
    if (content) {
      // Strip HTML tags and calculate words
      const text = content.replace(/<[^>]*>/g, "")
      const words = text.split(/\s+/).length
      const minutes = Math.max(1, Math.ceil(words / 200)) // Assuming 200 words per minute reading speed
      setReadTime(`${minutes} min read`)
    }
  }, [content])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !category || !content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call to update blog post
    setTimeout(() => {
      toast({
        title: "Blog post updated",
        description: "Your blog post has been updated successfully.",
      })
      setIsSubmitting(false)
      router.push("/articles")
    }, 2000)
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call to delete blog post
    setTimeout(() => {
      toast({
        title: "Blog post deleted",
        description: "Your blog post has been deleted successfully.",
      })
      setIsDeleting(false)
      router.push("/admin/dashboard")
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="fixed inset-0 -z-10 opacity-10">
        <Image src="/images/earth-background.png" alt="Earth background" fill className="object-cover" />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Post
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter blog title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of your blog post"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image</Label>
                  <div className="flex items-center gap-4">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or enter image URL"
                      className="flex-1"
                    />
                  </div>
                  {(imagePreview || imageUrl) && (
                    <div className="relative h-40 mt-2 rounded-md overflow-hidden border border-border">
                      <Image src={imagePreview || imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor value={content} onChange={setContent} placeholder="Write your blog content here..." />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="preview">
              <Card className="p-6">
                <div className="max-w-3xl mx-auto">
                  {title ? (
                    <>
                      {category && (
                        <div className="flex items-center gap-2 text-sm text-primary mb-4">
                          <Cloud className="h-5 w-5" />
                          <span>{category}</span>
                        </div>
                      )}

                      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">{title}</h1>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{readTime}</span>
                        </div>
                        <div>
                          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </div>
                        <div>By {user?.name || "Anonymous"}</div>
                      </div>

                      {(imagePreview || imageUrl) && (
                        <div className="relative h-[400px] rounded-xl overflow-hidden border border-border mb-8">
                          <Image
                            src={imagePreview || imageUrl || "/placeholder.svg"}
                            alt="Featured image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {description && <p className="text-lg text-muted-foreground mb-8">{description}</p>}

                      {content ? (
                        <article className="prose prose-blue dark:prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: content }} />
                        </article>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>Start writing your content to see the preview here.</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <h2 className="text-2xl font-bold mb-4">Blog Post Preview</h2>
                      <p>Fill in the details in the editor tab to see a preview of your blog post.</p>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
