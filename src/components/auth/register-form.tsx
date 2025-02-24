'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'

interface RegisterFormData {
  name: string
  surname: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export function RegisterForm() {
  const [error, setError] = useState('')
  const { register: registerUser } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RegisterFormData>()
  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      await registerUser(data.email, data.password, data.name, data.surname, data.phone)
    } catch (error) {
      console.error('Registration error:', error)
      setError('Failed to create account')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo placeholder */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl text-white font-bold">FH</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>
            <p className="text-gray-500">
              Please enter your details to register
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="First name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('surname', { required: 'Surname is required' })}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Last name"
                />
                {errors.surname && (
                  <p className="mt-1 text-sm text-red-500">{errors.surname.message}</p>
                )}
              </div>
            </div>

            <div>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9+\s-()]{8,}$/,
                    message: 'Invalid phone number'
                  }
                })}
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
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
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in
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
            Join our platform to streamline your food safety management with comprehensive reporting
          </p>
        </div>
      </div>
    </div>
  )
}