'use client'

import { useState } from 'react'
import TaskList from './TaskList'
import CalendarView from './CalendarView'
import { Task } from '../types'
import { CheckSquare, CalendarDays } from 'lucide-react'

export default function ViewToggle({ tasks }: { tasks: Task[] }) {
  const [view, setView] = useState<'list' | 'calendar'>('list')

  return (
    <div className="flex flex-col gap-4">
      {/* View Switch */}
      <div className="flex items-center justify-end gap-2 mb-2">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            view === 'list'
              ? 'bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
              : 'glass-card text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <CheckSquare className="w-4 h-4" /> List
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            view === 'calendar'
              ? 'bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
              : 'glass-card text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <CalendarDays className="w-4 h-4" /> Calendar
        </button>
      </div>

      {/* Task Display */}
      {view === 'list' ? <TaskList tasks={tasks} /> : <CalendarView tasks={tasks} />}
    </div>
  )
}
