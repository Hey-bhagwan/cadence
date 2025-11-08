'use client'

import { addTask } from "@/app/actions";
import { useFormStatus } from 'react-dom';
import { useRef } from "react";
import { TaskCategory } from "../types";
import Spinner from './Spinner';

const categories: TaskCategory[] = ['Work', 'Learning', 'Personal', 'Fitness', 'Other'];

  function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <button 
        type="submit" 
        disabled={pending} // Disable button while pending
        className="flex justify-center items-center px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700 disabled:bg-teal-400 self-start"
      >
        {pending ? <Spinner /> : 'Add Task'}
      </button>
    );
  }

export default function AddTaskForm({ onCategoryChange }: { onCategoryChange: (category: TaskCategory) => void }) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addTask(formData)
        ref.current?.reset()
      }}
      className="grid grid-cols-2 gap-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        className="col-span-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        rows={3}
        className="col-span-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
      />
      <input
        type="date"
        name="due_date"
        className="p-3 border rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
      />
      <select
        name="category"
        onChange={(e) => onCategoryChange(e.target.value as TaskCategory)}
        className="p-3 border rounded-xl bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <SubmitButton />
    </form>
  );
}
