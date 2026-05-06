// components/CalendarView.tsx
'use client'

import { useState, useMemo } from 'react'
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, isSameDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Task } from '../types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TaskItem from './TaskItem'

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events: CalendarEvent[] = useMemo(() => {
    return tasks
      .filter(task => task.due_date && task.parent_id === null) // Only main tasks
      .map(task => {
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

  const handleSelectEvent = (event: CalendarEvent) => {
    if (event.start) {
      setSelectedDate(event.start);
      setIsModalOpen(true);
    }
  };

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const selectedTasks = useMemo(() => {
    if (!selectedDate) return [];
    return tasks.filter(task => 
      task.due_date && 
      task.parent_id === null && 
      isSameDay(new Date(task.due_date), selectedDate)
    );
  }, [tasks, selectedDate]);

  return (
    <>
      <div style={{ height: '70vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '20px 0' }}
          selectable={true}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onDrillDown={(date) => {
            setSelectedDate(date);
            setIsModalOpen(true);
          }}
          className="bg-slate-900/50 rounded-xl p-4 text-slate-300 [&_.rbc-event]:bg-indigo-500 [&_.rbc-event]:rounded-md [&_.rbc-today]:bg-slate-800"
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border border-slate-800 text-white shadow-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold">
              Tasks for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task, index) => {
                const subtasks = tasks.filter(t => t.parent_id === task.id);
                return (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    subtasks={subtasks} 
                    index={index} 
                  />
                );
              })
            ) : (
              <div className="text-slate-500 text-center py-10 glass-card rounded-xl">
                No tasks scheduled for this day. Enjoy your free time!
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}