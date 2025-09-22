// components/AddTaskForm.tsx
'use client'

import { addTask } from "@/app/actions";
import { useRef } from "react";
import { TaskCategory } from "../types";

// The categories we defined in our database enum
const categories: TaskCategory[]= ['Work', 'Learning', 'Personal', 'Fitness', 'Other'];

export default function AddTaskForm({ onCategoryChange }: { onCategoryChange: (category: TaskCategory) => void }) {
    const ref = useRef<HTMLFormElement>(null);
    
    return (
        <form 
          ref={ref}
          action={async (formData) => {
            await addTask(formData)
            ref.current?.reset()
          }} 
          className="flex gap-4 mb-8"
        >
            <input
                type="text"
                name="title"
                placeholder="What do you need to do?"
                className="flex-grow p-2 border rounded"
            />
            <input 
                type="date"
                name="due_date"
                className="p-2 border rounded text-gray-500"
            />
            <select 
                name="category" 
                className="p-2 border rounded bg-white text-gray-500"
                // The cast to TaskCategory tells TypeScript we know this value is valid
                onChange={(e) => onCategoryChange(e.target.value as TaskCategory)}
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">
                Add Tasktask
            </button>
        </form>
    )
}