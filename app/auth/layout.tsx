import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles, Brain, CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans overflow-hidden">
      {/* Left Side: Productivity Illustration/Gradient */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden items-start border-r border-white/10 bg-[#020617]/50">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#4f46e5]/20 blur-[100px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#7c3aed]/20 blur-[100px]" />
        </div>
        
        <Link href="/" className="relative z-10 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center glow-effect">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
            Cadence
          </span>
        </Link>
        
        {/* Abstract Illustration */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col gap-6 mt-12">
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 transform -rotate-2 hover:rotate-0 transition-all duration-500">
             <div className="w-10 h-10 rounded-full bg-[#4f46e5]/20 flex items-center justify-center shrink-0">
               <Brain className="w-5 h-5 text-[#22d3ee]" />
             </div>
             <div>
               <h3 className="text-white font-medium mb-1">AI-Powered Planning</h3>
               <p className="text-sm text-slate-400">Let Cadence analyze your habits and break down complex projects into simple tasks automatically.</p>
             </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 transform translate-x-8 hover:translate-x-4 transition-all duration-500">
             <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
               <CheckCircle2 className="w-5 h-5 text-emerald-400" />
             </div>
             <div>
               <h3 className="text-white font-medium mb-1">Focus on Execution</h3>
               <p className="text-sm text-slate-400">Stop worrying about what to do next. Just log in and execute your perfectly prioritized daily plan.</p>
             </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Stop Planning.<br/>
            <span className="text-gradient">Start Executing.</span>
          </h2>
          <p className="text-slate-400">Join thousands of high performers building better habits.</p>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 relative">
        <Link href="/" className="absolute top-6 left-6 flex lg:hidden items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </Link>
        
        <div className="w-full max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="glass-panel p-8 rounded-3xl shadow-2xl relative overflow-hidden">
             {/* Decorative top border */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4f46e5] to-[#22d3ee]"></div>
             {children}
           </div>
        </div>
      </div>
    </div>
  );
}
