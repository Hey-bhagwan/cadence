'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { User, ChevronDown, Search, Bell, Menu, LayoutDashboard, CheckSquare, Calendar, Target, Settings, Sparkles, X, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EnableNotificationsButton from '../components/EnableNotificationsButton';
import { createClient } from '@/lib/supabase/client';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/worker.js')
        .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/protected/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Tasks', href: '/protected/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Planner', href: '/protected/planner', icon: <Calendar size={20} /> },
    { name: 'Goals', href: '/protected/goals', icon: <Target size={20} /> },
    { name: 'Settings', href: '/protected/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex overflow-hidden">
      
      {/* Left Sidebar (Desktop & Mobile) */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <>
            {/* Mobile backdrop */}
            {isMobile && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" 
                onClick={() => setSidebarOpen(false)} 
              />
            )}
            
            <motion.aside 
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed lg:relative z-50 w-[280px] h-full flex flex-col bg-[#020617] border-r border-white/10"
            >
              <div className="h-16 flex items-center px-6 border-b border-white/5 justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center glow-effect">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                    Cadence
                  </span>
                </Link>
                <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                <div className="text-xs font-semibold text-slate-500 mb-4 px-2 uppercase tracking-wider">Menu</div>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-indigo-600/20 text-indigo-400' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-white/5">
                <div className="glass-card p-4 rounded-xl flex flex-col gap-2 relative overflow-hidden group hover:border-[#4f46e5]/30 transition-colors">
                  <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Brain className="w-12 h-12 text-[#7c3aed]" />
                  </div>
                  <Sparkles className="w-5 h-5 text-[#7c3aed]" />
                  <p className="text-sm font-medium text-white relative z-10">Pro Plan</p>
                  <p className="text-xs text-slate-400 relative z-10">Get full AI capabilities.</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/10 bg-slate-900/80 backdrop-blur-md shrink-0 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center glass-input rounded-full px-4 h-10 w-64 lg:w-96">
              <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search tasks, goals..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-4 ml-4">
            <div className="hidden sm:block scale-90 opacity-80 hover:opacity-100 transition-opacity">
               <EnableNotificationsButton />
            </div>
            
            <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all relative group">
              <Bell size={18} className="group-hover:text-white transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer select-none glass-card pl-2 pr-3 py-1.5 rounded-full hover:bg-white/10 transition-all"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-white/5 mb-2">
                    <p className="text-sm font-medium text-white">My Account</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white" onClick={() => setUserMenuOpen(false)}>
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-white/5 hover:text-rose-300"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
