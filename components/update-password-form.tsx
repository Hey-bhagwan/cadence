'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      // Update this route to redirect to an authenticated route. The user already has an active session.
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
        <h1 className="text-3xl font-bold tracking-tight text-white">Update Password</h1>
        <p className="text-sm text-slate-400">Please enter your new password below.</p>
      </div>
      
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-300">New Password</label>
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
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save new password'}
        </button>
      </form>
    </div>
  )
}
