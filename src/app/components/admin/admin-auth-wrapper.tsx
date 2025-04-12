"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { LockIcon } from 'lucide-react'

// This is a simplified auth wrapper for demo purposes
// In a real application, you would use a proper authentication system
export default function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Check if user is already authenticated (using localStorage for demo)
  useEffect(() => {
    const auth = localStorage.getItem("workshop_admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple authentication for demo purposes
    // In a real application, you would validate against a backend
    if (username === "admin" && password === "password") {
      localStorage.setItem("workshop_admin_auth", "true")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid credentials. Try admin/password")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("workshop_admin_auth")
    setIsAuthenticated(false)
    router.push("/admin")
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <LockIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 mb-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
          <div className="p-4 pt-0 text-center text-sm text-muted-foreground">
            <p>Demo credentials: admin / password</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">Logged in as Admin</div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      {children}
    </div>
  )
}
