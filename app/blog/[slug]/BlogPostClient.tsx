"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Cloud, Clock, Share2, Twitter, Facebook, Linkedin, Mail, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { IoLogoWhatsapp } from "react-icons/io"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface BlogPostProps {
  post: BlogPostType
}

interface BlogPostType {
  title: string
  date: string
  author: string
  category: string
  readTime: string
  image: string
  content: string
  sections: { id: string; title: string }[]
  relatedPosts: { title: string; category: string; image: string; slug: string }[]
}

export default function BlogPostClient({ post }: BlogPostProps) {
  const { toast } = useToast()
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  useEffect(() => {
    if (!post) {
      toast({
        title: "Post not found",
        description: "The requested blog post could not be found.",
        variant: "destructive",
      })
      return
    }
  }, [post, toast])

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Link copied",
      description: "The article link has been copied to your clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col">
          {/* Main Content */}
          <div className="max-w-3xl mx-auto flex-1">
            <Link
              href="/articles/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to articles
            </Link>

            <div className="flex items-center gap-2 text-sm text-primary mb-4">
              <Cloud className="h-5 w-5" />
              <span>{post.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div>{post.date}</div>
              <div>By {post.author}</div>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-border mb-8">
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Article hero image"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex justify-between items-center mb-8">
              <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-3 border-border hover:bg-accent">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share this article</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 justify-center"
                      onClick={() => {
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                          "_blank",
                        )
                      }}
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 justify-center"
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                          "_blank",
                        )
                      }}
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 justify-center"
                      onClick={() => {
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                          "_blank",
                        )
                      }}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 justify-center"
                      onClick={() => {
                        window.open(
                          `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + window.location.href)}`,
                          "_blank",
                        )
                      }}
                    >
                      <IoLogoWhatsapp className="h-4 w-4" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 justify-center"
                      onClick={() => {
                        window.open(
                          `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent("Check out this article: " + window.location.href)}`,
                          "_blank",
                        )
                      }}
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 justify-center"
                      onClick={() => copyToClipboard(window.location.href)}
                    >
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <article className="prose prose-blue dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <div className="border-t border-border mt-12 pt-8">
              <h3 className="text-xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {post.relatedPosts.map((relatedPost, index) => (
                  <Link href={`/blog/${relatedPost.slug}/`} className="group" key={index}>
                    <div className="space-y-3">
                      <div className="relative h-48 rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={`${relatedPost.title} thumbnail`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-primary mb-2">
                          <Cloud className="h-4 w-4" />
                          <span>{relatedPost.category}</span>
                        </div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
