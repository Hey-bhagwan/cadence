'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useState } from 'react'
import { Loader2, MailCheck } from 'lucide-react'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
      {success ? (
        <div className="flex flex-col items-center justify-center text-center gap-6 w-full py-8">
          <div className="w-16 h-16 rounded-full bg-[#4f46e5]/20 flex items-center justify-center mb-2">
            <MailCheck className="w-8 h-8 text-[#22d3ee]" />
          </div>
          <div className="flex flex-col gap-2">
             <h1 className="text-3xl font-bold tracking-tight text-white">Check Your Email</h1>
             <p className="text-slate-400 text-sm">If you registered using your email, you will receive a password reset link shortly.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 text-center mb-2">
             <h1 className="text-3xl font-bold tracking-tight text-white">Reset Password</h1>
             <p className="text-sm text-slate-400">Type in your email and we&apos;ll send you a link to reset your password</p>
          </div>
          
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
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
             
             {error && <p className="text-sm text-rose-500 font-medium bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</p>}
             
             <button 
               type="submit" 
               disabled={isLoading}
               className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center disabled:hover:scale-100"
             >
               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send reset email'}
             </button>
          </form>
          
          <div className="text-center text-sm text-slate-400 mt-2">
             Already have an account?{' '}
             <Link href="/auth/login" className="font-semibold text-white hover:text-[#22d3ee] transition-colors">
               Login
             </Link>
          </div>
        </>
      )}
    </div>
  )
}
