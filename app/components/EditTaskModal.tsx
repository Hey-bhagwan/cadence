// components/EditTaskModal.tsx
'use client'

import { useState } from 'react';
import { Task } from '../types';
import { updateTask } from '@/app/actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DatePicker } from '@/components/ui/date-picker';

export default function EditTaskModal({ task, isOpen, setIsOpen }: { task: Task; isOpen: boolean; setIsOpen: (open: boolean) => void; }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  // The DatePicker works with Date objects, not strings
  const [date, setDate] = useState<Date | undefined>(
    task.due_date ? new Date(task.due_date) : undefined
  );

  const handleSubmit = async () => {
    await updateTask({
      id: task.id,
      title,
      description,
      // Format the Date object back to a 'YYYY-MM-DD' string for the action
      dueDate: date ? date.toISOString().split('T')[0] : ''
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border border-slate-800 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Task title" 
            className="border-slate-700 bg-slate-950/50 text-white focus-visible:ring-indigo-500"
          />
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Add a description..." 
            className="border-slate-700 bg-slate-950/50 text-white focus-visible:ring-indigo-500 min-h-[100px]"
          />
          {/* Replace the old input with the new DatePicker component */}
          <div className="[&>button]:bg-slate-950/50 [&>button]:border-slate-700 [&>button]:text-white [&>button]:hover:bg-slate-800">
             <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 border-0"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}