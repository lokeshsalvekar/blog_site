"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  socialLogin: (provider: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("megh_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("megh_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, accept specific credentials
        if (email === "admin@megh.com" && password === "admin123") {
          const userData: User = {
            id: "1",
            email: "admin@megh.com",
            name: "Admin User",
            isAdmin: true,
          }
          setUser(userData)
          localStorage.setItem("megh_user", JSON.stringify(userData))
          toast({
            title: "Login successful",
            description: "Welcome back, Admin User!",
          })
          setIsLoading(false)
          resolve(true)
          return
        }

        if (email === "user@example.com" && password === "password") {
          const userData: User = {
            id: "2",
            email: "user@example.com",
            name: "Regular User",
            isAdmin: false,
          }
          setUser(userData)
          localStorage.setItem("megh_user", JSON.stringify(userData))
          toast({
            title: "Login successful",
            description: "Welcome back, Regular User!",
          })
          setIsLoading(false)
          resolve(true)
          return
        }

        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
        setIsLoading(false)
        resolve(false)
      }, 1000)
    })
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, always succeed
        const userData: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name,
          isAdmin: false,
        }
        setUser(userData)
        localStorage.setItem("megh_user", JSON.stringify(userData))
        toast({
          title: "Account created",
          description: `Welcome to Megh, ${name}!`,
        })
        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  const socialLogin = async (provider: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call for social login
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random user data for simulation
        const providers = {
          google: {
            name: "Google User",
            email: "user@gmail.com",
          },
          github: {
            name: "GitHub User",
            email: "user@github.com",
          },
        }

        const providerData = providers[provider] || { name: "Social User", email: "user@social.com" }

        const userData: User = {
          id: Math.random().toString(36).substring(2, 9),
          email: providerData.email,
          name: providerData.name,
          isAdmin: false,
        }

        setUser(userData)
        localStorage.setItem("megh_user", JSON.stringify(userData))
        toast({
          title: "Login successful",
          description: `Welcome, ${providerData.name}!`,
        })
        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("megh_user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, socialLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
