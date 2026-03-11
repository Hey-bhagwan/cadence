// components/CalendarView.tsx
'use client'

import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Task } from '../types'

const locales = {
  'en-US': enUS,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent extends BigCalendarEvent {
  resource: number;
}

export default function CalendarView({ tasks }: { tasks: Task[] }) {
  const events: CalendarEvent[] = useMemo(() => {
    return tasks
      .filter(task => task.due_date) // Only include tasks that have a due date
      .map(task => {
        // --- THIS IS THE CORRECTED LINE ---
        // Use the standard `new Date()` constructor which handles full timestamps correctly.
        const taskDate = new Date(task.due_date!);

        return {
          title: task.title,
          start: taskDate,
          end: taskDate,
          allDay: true,
          resource: task.id,
        }
      });
  }, [tasks]);

  return (
    <div style={{ height: '70vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '20px 0' }}
      />
    </div>
  )
}