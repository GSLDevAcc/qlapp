'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  companyId: string
  name: string
  surname: string
  phone: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, surname: string, phone: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  // For demo purposes - replace with actual authentication
  const login = async (email: string, password: string) => {
    if (email === 'demo@example.com' && password === 'password123') {
      setUser({
        id: '1',
        email: email,
        companyId: 'company1',
        name: 'Demo',
        surname: 'User',
        phone: '1234567890'
      })
      router.push('/dashboard')
    } else {
      throw new Error('Invalid credentials')
    }
  }

  // For demo purposes - replace with actual registration
  const register = async (
    email: string, 
    password: string, 
    name: string, 
    surname: string, 
    phone: string
  ) => {
    // Here you would typically make an API call to register the user
    // For demo, we'll just simulate a successful registration
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9), // Generate random ID
        email,
        companyId: 'company1',
        name,
        surname,
        phone
      }

      // Set the user state
      setUser(newUser)

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Registration failed')
    }
  }

  const logout = () => {
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}