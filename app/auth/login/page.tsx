"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Github, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSocialSubmitting, setIsSocialSubmitting] = useState<string | null>(null)
  const router = useRouter()
  const { login, signup, socialLogin } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await login(loginEmail, loginPassword)

    setIsSubmitting(false)
    if (success) {
      router.push("/")
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await signup(signupEmail, signupPassword, signupName)

    setIsSubmitting(false)
    if (success) {
      router.push("/")
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsSocialSubmitting(provider)
    const success = await socialLogin(provider)
    setIsSocialSubmitting(null)

    if (success) {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="text-primary">Megh</span>
            </Link>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <CardTitle className="text-2xl text-center mt-4">Welcome Back</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isSocialSubmitting !== null}
                  className="w-full"
                >
                  {isSocialSubmitting === "google" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FcGoogle className="mr-2 h-5 w-5" />
                  )}
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("github")}
                  disabled={isSocialSubmitting !== null}
                  className="w-full"
                >
                  {isSocialSubmitting === "github" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Github className="mr-2 h-5 w-5" />
                  )}
                  GitHub
                </Button>
              </div>

              <div className="flex items-center mt-6 mb-6">
                <Separator className="flex-grow" />
                <span className="mx-4 text-xs text-muted-foreground">OR</span>
                <Separator className="flex-grow" />
              </div>

              <CardContent className="px-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@megh.com or user@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary/80">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="admin123 or password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting || isSocialSubmitting !== null}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Sign in with Email
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            <TabsContent value="signup">
              <CardTitle className="text-2xl text-center mt-4">Create Account</CardTitle>
              <CardDescription className="text-center">Sign up for a new account to get started</CardDescription>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isSocialSubmitting !== null}
                  className="w-full"
                >
                  {isSocialSubmitting === "google" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FcGoogle className="mr-2 h-5 w-5" />
                  )}
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("github")}
                  disabled={isSocialSubmitting !== null}
                  className="w-full"
                >
                  {isSocialSubmitting === "github" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Github className="mr-2 h-5 w-5" />
                  )}
                  GitHub
                </Button>
              </div>

              <div className="flex items-center mt-6 mb-6">
                <Separator className="flex-grow" />
                <span className="mx-4 text-xs text-muted-foreground">OR</span>
                <Separator className="flex-grow" />
              </div>

              <CardContent className="px-0">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="john@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a secure password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting || isSocialSubmitting !== null}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Sign up with Email
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
