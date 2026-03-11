'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected/dashboard`,
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
      <div className="flex flex-col gap-2 text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
        <p className="text-sm text-slate-400">Join Cadence to build better habits</p>
      </div>
      
      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
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
          <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
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
        
        <div className="flex flex-col gap-2">
          <label htmlFor="repeat-password" className="text-sm font-medium text-slate-300">Repeat Password</label>
          <input
            id="repeat-password"
            type="password"
            required
            placeholder="••••••••"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass-input placeholder:text-slate-500"
          />
        </div>
        
        {error && <p className="text-sm text-rose-500 font-medium bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</p>}
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center disabled:hover:scale-100"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign up'}
        </button>
      </form>
      
      <div className="text-center text-sm text-slate-400 mt-2">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-white hover:text-[#22d3ee] transition-colors">
          Login
        </Link>
      </div>
    </div>
  )
}
