'use client'

import { useState, useEffect, useRef } from 'react';
import { Task, Insight, TaskCategory } from '../../types';
import AddTaskForm from '../../components/AddTaskForm';
import ViewToggle from '../../components/ViewToggle';
import HabitInsight from '../../components/HabitInsight';
import SmartSuggestion from '../../components/SmartSuggestion';
import EnableNotificationsButton from '../../components/EnableNotificationsButton';
import { User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';


export default function DashboardClientPage({ tasks, insights }: { tasks: Task[], insights: Insight[] }) {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
 

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/worker.js')
        .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);

  const handleLogout = async () => {
    const supabase = createClient()
    try {
      await supabase.auth.signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setOpen(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[#1A202C] font-inter">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-3 border-b border-gray-200 bg-white">
        <Link href="/"><h1 className="text-xl font-semibold tracking-tight">Cadence</h1></Link>
        <div className="relative" ref={dropdownRef}>
          {/* Trigger */}
          <div
            className="flex items-center space-x-2 cursor-pointer select-none"
            onClick={() => setOpen(!open)}
          >
            <User className="w-6 h-6 text-gray-600" />
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${open ? 'rotate-180' : ''
                }`}
            />
          </div>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  {handleLogout}
                  alert('Logged out!')
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <main className="grid grid-cols-12 gap-8 px-8 py-8">
        {/* LEFT COLUMN - Main Content */}
        <section className="col-span-8 space-y-6">
          <div className="flex justify-end">
            <EnableNotificationsButton />
          </div>

          <h2 className="text-2xl font-semibold mb-2">Your Tasks</h2>

          {/* Add Task */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <AddTaskForm onCategoryChange={setSelectedCategory} />
          </div>

          {/* View Toggle */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ViewToggle tasks={tasks} />
          </div>
        </section>

        {/* RIGHT COLUMN - Insights */}
        <aside className="col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <HabitInsight insights={insights} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <SmartSuggestion selectedCategory={selectedCategory} insights={insights} />
          </div>
        </aside>
      </main>
    </div>
  );
}
