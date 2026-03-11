"use client";

import { motion } from "framer-motion";
import { Brain, Clock, Bell, ArrowRight, CheckCircle2, Sparkles, TrendingUp, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4f46e5]/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-[#22d3ee]/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#020617]/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center glow-effect transition-all duration-300">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
              Cadence
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8 text-slate-300 text-sm font-medium">
            {["Features", "Productivity", "About", "Pricing"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="relative group hover:text-white transition-colors">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#22d3ee] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hidden md:block text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Sign In
            </Link>
            <Link href="/auth/sign-up" className="relative overflow-hidden rounded-full bg-white/10 border border-white/20 px-6 py-2 text-sm font-medium text-white hover:bg-white/20 glow-effect transition-all flex items-center gap-2 group">
              <span className="relative z-10">Start Executing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 max-w-full bg-gradient-to-r from-[#4f46e5]/80 to-[#7c3aed]/80 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4f46e5]/10 border border-[#4f46e5]/20 text-[#22d3ee] text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Cadence AI Planner 2.0 is here</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 max-w-5xl leading-tight"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <span className="text-white">Stop Planning.</span>
            <br />
            <span className="text-gradient hover:glow-effect transition-all duration-300 cursor-default">Start Executing.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your intelligent partner that turns complex projects into simple, actionable steps. Break through procrastination with AI-driven workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          >
            <Link href="/auth/sign-up" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0f172a] font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2 group">
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="#features" className="w-full sm:w-auto px-8 py-4 rounded-full glass-card hover:bg-white/10 transition-all font-medium text-white flex items-center justify-center">
              Explore Features
            </Link>
          </motion.div>

          {/* Floating Stats */}
          <div className="absolute top-[30%] left-[10%] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0, y: [0, -10, 0] }} transition={{ opacity: { duration: 1, delay: 0.6 }, x: { duration: 1, delay: 0.6 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
              className="glass-card rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">10x</div>
                <div className="text-xs text-slate-400">productivity</div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-[40%] right-[10%] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0, y: [0, 10, 0] }} transition={{ opacity: { duration: 1, delay: 0.8 }, x: { duration: 1, delay: 0.8 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
              className="glass-card rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee]">
                <Brain className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">AI-powered</div>
                <div className="text-xs text-slate-400">planning engine</div>
              </div>
            </motion.div>
          </div>

          {/* Dashboard Mockup */}
          <motion.div
            className="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-black/40 shadow-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
          >
            <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            
            <div className="p-2 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
              <div className="hidden md:flex flex-col gap-4 col-span-3 border-r border-white/10 pr-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-10 rounded-lg ${i === 2 ? 'bg-[#4f46e5]/20 border border-[#4f46e5]/30' : 'bg-white/5'} w-full flex items-center px-4 gap-3`}>
                    <div className={`w-5 h-5 rounded ${i === 2 ? 'bg-[#22d3ee]/50' : 'bg-white/10'}`}></div>
                    <div className={`h-2 rounded-full ${i === 2 ? 'bg-[#22d3ee]/80 w-16' : 'bg-white/20 w-20'}`}></div>
                  </div>
                ))}
              </div>

              <div className="col-span-1 md:col-span-6 flex flex-col gap-4 text-left">
                <div className="h-12 w-full glass-card rounded-xl flex items-center px-4 gap-3">
                   <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>
                   <div className="h-3 bg-white/40 rounded-full w-48"></div>
                </div>
                
                <div className="h-16 w-full glass-card border border-[#4f46e5]/50 relative overflow-hidden rounded-xl flex items-center px-4 gap-4 glow-effect">
                   <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/10 to-transparent"></div>
                   <div className="w-6 h-6 rounded-full bg-[#4f46e5] flex items-center justify-center z-10">
                     <CheckCircle2 className="w-4 h-4 text-white" />
                   </div>
                   <div className="flex flex-col gap-1 z-10 flex-1">
                     <span className="text-sm font-semibold text-white">Review Q3 Marketing Strategy</span>
                     <div className="flex gap-2">
                       <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">High Priority</span>
                       <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Marketing</span>
                     </div>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center z-10">
                     <Sparkles className="w-4 h-4 text-[#22d3ee]" />
                   </div>
                </div>

                <div className="h-12 w-full glass-card rounded-xl flex items-center px-4 gap-3 opacity-60">
                   <div className="w-5 h-5 rounded-full border-2 border-emerald-500/50 bg-emerald-500/20 flex items-center justify-center">
                     <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                   </div>
                   <div className="h-2.5 bg-white/20 rounded-full w-32 line-through"></div>
                </div>
              </div>

              <div className="hidden md:flex flex-col col-span-3 gap-4 text-left">
                <div className="h-auto glass-card rounded-xl border border-[#7c3aed]/30 p-4 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-30">
                    <Brain className="w-16 h-16 text-[#7c3aed]" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#7c3aed]" />
                    <span className="text-xs font-medium text-[#7c3aed]">AI Suggestion</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Based on your habits, you have highest focus around 9 AM. Let&apos;s schedule &quot;Review Strategy&quot; then.
                  </p>
                  <div className="mt-auto flex gap-2">
                    <div className="h-8 flex-1 rounded-lg bg-[#4f46e5] flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-opacity-80 transition-colors">Apply</div>
                    <div className="h-8 flex-1 rounded-lg bg-white/5 flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-white/10 transition-colors">Dismiss</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none shimmer opacity-10 mix-blend-overlay"></div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 relative">
          <div className="container mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Intelligent Workflow, <span className="text-gradient">Zero Friction.</span>
              </motion.h2>
              <motion.p 
                className="text-slate-400 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Designed to help you plan smarter, work faster, and build lasting habits with the power of artificial intelligence.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: <Brain className="w-6 h-6 text-[#22d3ee]" />,
                  title: "AI Task Breakdown",
                  desc: "Automatically dissects massive projects into bite-sized, achievable micro-tasks so you never feel overwhelmed again.",
                  delay: 0.2
                },
                {
                  icon: <Clock className="w-6 h-6 text-[#7c3aed]" />,
                  title: "Habit Intelligence",
                  desc: "Learns your peak performance hours over time and automatically suggests scheduling high-focus tasks when you're most alert.",
                  delay: 0.3
                },
                {
                  icon: <Bell className="w-6 h-6 text-rose-400" />,
                  title: "Contextual Nudges",
                  desc: "Smart notifications that gently guide you to act precisely at the right moment, avoiding meaningless calendar clutter.",
                  delay: 0.4
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-8 rounded-3xl group border-t border-white/20 relative overflow-hidden text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:bg-white/10 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#22d3ee] transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020617] py-12 px-6 mt-auto relative z-10">
        <div className="container mx-auto max-w-6xl border-b border-white/10 pb-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
               <Sparkles className="w-3 h-3 text-white" />
             </div>
             <span className="font-bold text-white tracking-wide">Cadence</span>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-400 font-medium">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
          
          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
               <Twitter className="w-4 h-4" />
             </a>
             <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
               <Github className="w-4 h-4" />
             </a>
             <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
               <Linkedin className="w-4 h-4" />
             </a>
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()} Cadence Labs Inc. All rights reserved. Let&apos;s build the future of work.
        </div>
      </footer>
    </div>
  );
}
