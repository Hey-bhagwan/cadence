// app/auth/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningUp, setIsSigningUp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSigningUp) {
      // Sign Up
      const { error } = await supabase.auth.signUp({ email, password })
      if (!error) {
        alert('Check your email for the confirmation link!')
        setIsSigningUp(false)
      } else {
        alert(error.message)
      }
    } else {
      // Sign In
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error) {
        router.push('/dashboard')
      } else {
        alert(error.message)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isSigningUp ? 'Create Account' : 'Sign In'}
        </h1>
        <form onSubmit={handleAuthAction}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <button
          onClick={() => setIsSigningUp(!isSigningUp)}
          className="w-full mt-4 text-sm text-center text-blue-500"
        >
          {isSigningUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}