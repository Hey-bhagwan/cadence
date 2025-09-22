// components/CalendarView.tsx
'use client'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {format} from 'date-fns/format'
import {parse} from 'date-fns/parse'
import {startOfWeek} from 'date-fns/startOfWeek'
import {getDay} from 'date-fns/getDay'
import {enUS} from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Task } from '../types'

// Setup for the calendar's date handling
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

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: number;
}

export default function CalendarView({ tasks }: { tasks: Task[] }) {
  // Convert our tasks into the event format the calendar expects
  const events: CalendarEvent[] = tasks
    .filter(task => task.due_date) // Only include tasks that have a due date
    .map(task => {
      const taskDate = new Date(task.due_date + 'T00:00:00'); // Treat as local timezone
      return {
        title: task.title,
        start: taskDate,
        end: taskDate,
        allDay: true, // All our tasks are full-day events for now
        resource: task.id,
      }
    });

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