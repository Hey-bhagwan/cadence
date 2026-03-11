import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 w-full">
      <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-2">
        <AlertCircle className="w-8 h-8 text-rose-500" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Something went wrong</h1>
        {params?.error ? (
          <p className="text-slate-400 max-w-sm">{params.error}</p>
        ) : (
          <p className="text-slate-400 max-w-sm">An unexpected authentication error occurred.</p>
        )}
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
