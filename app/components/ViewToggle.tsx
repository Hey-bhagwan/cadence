'use client'

import { useState } from 'react'
import TaskList from './TaskList'
import CalendarView from './CalendarView'
import { Task } from '../types'

export default function ViewToggle({ tasks }: { tasks: Task[] }) {
  const [view, setView] = useState<'list' | 'calendar'>('list')

  return (
    <div>
      {/* View Switch */}
      <div className="flex items-center justify-end gap-3 mb-4">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            view === 'list'
              ? 'bg-[#4FD1C5] text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          List
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            view === 'calendar'
              ? 'bg-[#4FD1C5] text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Calendar
        </button>
      </div>

      {/* Task Display */}
      {view === 'list' ? <TaskList tasks={tasks} /> : <CalendarView tasks={tasks} />}
    </div>
  )
}
