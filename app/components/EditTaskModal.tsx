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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description..." />
          {/* Replace the old input with the new DatePicker component */}
          <DatePicker date={date} setDate={setDate} />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}