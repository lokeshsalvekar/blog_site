"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Tag,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  Clock,
  MessageSquare,
  Bell,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

interface AdminSidebarProps {
  activePath?: string
  onLogout: () => void
}

export function AdminSidebar({ activePath, onLogout }: AdminSidebarProps) {
  const pathname = usePathname()
  const currentPath = activePath || pathname
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      title: "Posts",
      icon: FileText,
      path: "/admin/posts",
    },
    {
      title: "Categories",
      icon: Tag,
      path: "/admin/categories",
    },
    {
      title: "Comments",
      icon: MessageSquare,
      path: "/admin/comments",
    },
    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/admin/notifications",
    },
    {
      title: "Scheduled Posts",
      icon: Clock,
      path: "/admin/scheduled",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r border-border bg-card">
        <div className="flex items-center h-16 px-6 border-b border-border">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            <span className="text-primary">Blogsite</span>
            <span className="ml-2 text-sm font-normal text-muted-foreground">Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path

              if (
                item.path === "/admin/posts" ||
                item.path === "/admin/categories" ||
                item.path === "/admin/users" ||
                item.path === "/admin/comments" ||
                item.path === "/admin/notifications" ||
                item.path === "/admin/scheduled"
              ) {
                return (
                  <Link
                    key={item.path}
                    href="/coming-soon"
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                )
              }

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full justify-start" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center h-16 px-6 border-b border-border">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                  <span className="text-primary">Blogsite</span>
                  <span className="ml-2 text-sm font-normal text-muted-foreground">Admin</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = currentPath === item.path

                    if (
                      item.path === "/admin/posts" ||
                      item.path === "/admin/categories" ||
                      item.path === "/admin/users" ||
                      item.path === "/admin/comments" ||
                      item.path === "/admin/notifications" ||
                      item.path === "/admin/scheduled"
                    ) {
                      return (
                        <Link
                          key={item.path}
                          href="/coming-soon"
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.title}
                        </Link>
                      )
                    }

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.title}
                      </Link>
                    )
                  })}
                </nav>
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full justify-start" onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
