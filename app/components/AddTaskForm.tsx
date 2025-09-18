// components/AddTaskForm.tsx
'use client'

import { addTask } from "@/app/actions";
import { useRef } from "react";

export default function AddTaskForm() {
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
            <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">
                Add Tasktask
            </button>
        </form>
    )
}