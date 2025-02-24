'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
//import Image from 'next/image'

interface LoginFormData {
  email: string
  password: string
}

export function LoginForm() {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      console.error('Login error:', error)
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo placeholder - replace src with your actual logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl text-white font-bold">FH</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-500">
              Please enter your details to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label> */}
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label> */}
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Image/Decoration */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 p-8">
        <div className="w-full flex flex-col items-center justify-center text-white space-y-8">
          <h2 className="text-4xl font-bold text-center">
            Food Hygiene Reports
          </h2>
          <p className="text-xl text-center max-w-md">
            Streamline your food safety management with our comprehensive reporting system
          </p>
          {/* You can add an illustration or image here */}
        </div>
      </div>
    </div>
  )
}