import Link from 'next/link';
import { MailCheck } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 w-full">
      <div className="w-16 h-16 rounded-full bg-[#4f46e5]/20 flex items-center justify-center mb-2">
        <MailCheck className="w-8 h-8 text-[#22d3ee]" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Check your email</h1>
        <p className="text-slate-400 max-w-sm">We&apos;ve sent a confirmation link to your inbox. Please verify your email before signing in.</p>
      </div>
      
      <Link 
        href="/auth/login"
        className="w-full py-3 mt-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        Return to Login
      </Link>
    </div>
  )
}
