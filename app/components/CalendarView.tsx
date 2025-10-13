// components/CalendarView.tsx
'use client'

import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Task } from '../types'

// Setup for the calendar's date handling (remains the same)
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

// We can extend the library's own Event type for better type safety
interface CalendarEvent extends BigCalendarEvent {
  resource: number; // Add our custom resource property (the task id)
}

export default function CalendarView({ tasks }: { tasks: Task[] }) {
  // UPDATE 1: Performance Optimization with useMemo
  // This hook prevents the expensive work of filtering and mapping the tasks
  // on every single component re-render. It will only re-calculate
  // when the `tasks` prop itself has changed.
  const events: CalendarEvent[] = useMemo(() => {
    return tasks
      .filter(task => task.due_date) // Only include tasks that have a due date
      .map(task => {
        // UPDATE 2: Robust Date Parsing
        // Instead of concatenating strings, we use date-fns' `parse` function.
        // This is much safer and avoids common off-by-one-day errors that can
        // happen across different timezones. This assumes `task.due_date`
        // is in 'yyyy-MM-dd' format (e.g., "2025-10-08").
        const taskDate = parse(task.due_date!, 'yyyy-MM-dd', new Date());

        return {
          title: task.title,
          start: taskDate,
          end: taskDate,
          allDay: true, // Mark as an all-day event
          resource: task.id,
        }
      });
  }, [tasks]); // The dependency array ensures this code only runs when `tasks` changes

  return (
    // The rendered output remains the same
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