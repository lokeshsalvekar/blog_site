"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle, LogOut, Loader2, Edit, Trash, Eye } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { AdminSidebar } from "@/components/admin-sidebar"

// Mock data for blog posts
const initialPosts = [
  {
    id: "1",
    title: "Serverless Deployment: The Future of Cloud Computing",
    category: "Static",
    date: "May 15, 2025",
    status: "Published",
    slug: "serverless-deployment",
    content: "<p>This is a sample blog post about serverless deployment.</p>",
  },
  {
    id: "2",
    title: "Container Orchestration: Managing Containerized Applications at Scale",
    category: "Web",
    date: "June 2, 2025",
    status: "Published",
    slug: "container-orchestration",
    content: "<p>Learn how to manage containerized applications at scale.</p>",
  },
  {
    id: "3",
    title: "Multi-Cloud Management: Strategies for Success",
    category: "Backend",
    date: "June 28, 2025",
    status: "Draft",
    slug: "multi-cloud-management",
    content: "<p>Best practices for managing resources across multiple cloud providers.</p>",
  },
  {
    id: "4",
    title: "Optimizing AWS Lambda Functions for Performance",
    category: "Static",
    date: "May 5, 2025",
    status: "Published",
    slug: "optimizing-lambda-functions",
    content: "<p>Learn how to optimize your Lambda functions for better performance and lower costs.</p>",
  },
]

// Mock data for categories
const initialCategories = [
  { id: "1", name: "Static", count: 12 },
  { id: "2", name: "Web", count: 8 },
  { id: "3", name: "Backend", count: 15 },
  { id: "4", name: "Database", count: 6 },
  { id: "5", name: "Security", count: 11 },
  { id: "6", name: "DevOps", count: 9 },
]

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [categories, setCategories] = useState(initialCategories)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostStatus, setNewPostStatus] = useState("Draft")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isSubmittingPost, setIsSubmittingPost] = useState(false)
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false)
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false)
  const [editPostDialogOpen, setEditPostDialogOpen] = useState(false)
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)

  const router = useRouter()
  const { toast } = useToast()
  const { user, logout } = useAuth()

  // Check if user is authenticated and is admin
  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }
  }, [user, router, toast])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleDeletePost = (id: string) => {
    setDeletingItemId(id)

    // Simulate API call
    setTimeout(() => {
      setPosts(posts.filter((post) => post.id !== id))
      setDeletingItemId(null)

      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully",
      })
    }, 1000)
  }

  const handleDeleteCategory = (id: string) => {
    setDeletingItemId(id)

    // Simulate API call
    setTimeout(() => {
      setCategories(categories.filter((category) => category.id !== id))
      setDeletingItemId(null)

      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully",
      })
    }, 1000)
  }

  const handleCreatePost = () => {
    setIsSubmittingPost(true)

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Math.random().toString(36).substring(2, 9),
        title: newPostTitle,
        category: newPostCategory,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        status: newPostStatus,
        slug: newPostTitle
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
        content: newPostContent,
      }

      setPosts([newPost, ...posts])
      setNewPostTitle("")
      setNewPostCategory("")
      setNewPostContent("")
      setNewPostStatus("Draft")
      setNewPostDialogOpen(false)
      setIsSubmittingPost(false)

      toast({
        title: "Post created",
        description: "The post has been created successfully",
      })
    }, 1000)
  }

  const handleCreateCategory = () => {
    setIsSubmittingCategory(true)

    // Simulate API call
    setTimeout(() => {
      const newCategory = {
        id: Math.random().toString(36).substring(2, 9),
        name: newCategoryName,
        count: 0,
      }

      setCategories([...categories, newCategory])
      setNewCategoryName("")
      setNewCategoryDialogOpen(false)
      setIsSubmittingCategory(false)

      toast({
        title: "Category created",
        description: "The category has been created successfully",
      })
    }, 1000)
  }

  const handleEditPost = (post: any) => {
    router.push(`/admin/edit-blog/${post.slug}`)
  }

  const handleViewPost = (post: any) => {
    router.push(`/blog/${post.slug}`)
  }

  const handleAddNewPost = () => {
    router.push("/admin/add-blog")
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setNewCategoryName(category.name)
    setEditCategoryDialogOpen(true)
  }

  const handleUpdateCategory = () => {
    setIsSubmittingCategory(true)

    // Simulate API call
    setTimeout(() => {
      const updatedCategories = categories.map((category) =>
        category.id === editingCategory.id
          ? {
              ...category,
              name: newCategoryName,
            }
          : category,
      )

      setCategories(updatedCategories)
      setEditingCategory(null)
      setNewCategoryName("")
      setEditCategoryDialogOpen(false)
      setIsSubmittingCategory(false)

      toast({
        title: "Category updated",
        description: "The category has been updated successfully",
      })
    }, 1000)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar activePath="/admin/dashboard" onLogout={handleLogout} />

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex items-center h-16 bg-background border-b border-border px-6">
            <div className="flex-1">
              <h1 className="text-lg font-medium">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="md:hidden" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card className="hover-lift">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{posts.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {posts.filter((p) => p.status === "Published").length} published,{" "}
                    {posts.filter((p) => p.status === "Draft").length} drafts
                  </p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Across {posts.length} total posts</p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground mt-1">Actions in the last 7 days</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="posts" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                </TabsList>
                <div>
                  <Button className="mr-2 glow-effect" onClick={handleAddNewPost}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </div>
              </div>

              <TabsContent value="posts" className="space-y-4">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Category
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {posts.map((post) => (
                          <tr
                            key={post.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{post.title}</td>
                            <td className="p-4 align-middle">{post.category}</td>
                            <td className="p-4 align-middle">{post.date}</td>
                            <td className="p-4 align-middle">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  post.status === "Published"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                }`}
                              >
                                {post.status}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleViewPost(post)} title="View">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleEditPost(post)} title="Edit">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" title="Delete">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the post.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeletePost(post.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        {deletingItemId === post.id ? (
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="flex justify-end">
                  <Dialog open={newCategoryDialogOpen} onOpenChange={setNewCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="glow-effect">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Category</DialogTitle>
                        <DialogDescription>Add a new category for blog posts.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Category Name</Label>
                          <Input
                            id="name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Enter category name"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={handleCreateCategory} disabled={isSubmittingCategory}>
                          {isSubmittingCategory ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create Category"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Posts</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {categories.map((category) => (
                          <tr
                            key={category.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{category.name}</td>
                            <td className="p-4 align-middle">{category.count}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditCategory(category)}
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" title="Delete">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the category.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteCategory(category.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        {deletingItemId === category.id ? (
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      <Dialog open={editCategoryDialogOpen} onOpenChange={setEditCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Category Name</Label>
              <Input
                id="edit-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleUpdateCategory} disabled={isSubmittingCategory}>
              {isSubmittingCategory ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
