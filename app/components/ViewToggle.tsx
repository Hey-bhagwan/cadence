// components/ViewToggle.tsx
'use client'

import { useState } from 'react'
import TaskList from './TaskList' // We will create this next
import CalendarView from './CalendarView'

// Define the shape of our task from Supabase
interface Task {
    id: number;
    title: string;
    is_completed: boolean;
    due_date: string | null;
}

export default function ViewToggle({ tasks }: { tasks: Task[] }) {
    const [view, setView] = useState('list') // 'list' or 'calendar'

    return (
        <div>
            <div className="flex justify-end gap-2 mb-4">
                <button 
                    onClick={() => setView('list')}
                    className={`px-4 py-2 text-sm rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    List
                </button>
                <button 
                    onClick={() => setView('calendar')}
                    className={`px-4 py-2 text-sm rounded ${view === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Calendar
                </button>
            </div>

            {view === 'list' ? (
                <TaskList tasks={tasks} />
            ) : (
                <CalendarView tasks={tasks} />
            )}
        </div>
    )
}