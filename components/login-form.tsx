'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/protected/dashboard')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
      <div className="flex flex-col gap-2 text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
        <p className="text-sm text-slate-400">Welcome back to Cadence</p>
      </div>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass-input placeholder:text-slate-500"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-[#22d3ee] hover:text-white transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass-input placeholder:text-slate-500"
          />
        </div>
        
        {error && <p className="text-sm text-rose-500 font-medium bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</p>}
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center disabled:hover:scale-100"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log in'}
        </button>
      </form>
      
      <div className="text-center text-sm text-slate-400 mt-2">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign-up" className="font-semibold text-white hover:text-[#22d3ee] transition-colors">
          Sign up
        </Link>
      </div>
    </div>
  )
}
