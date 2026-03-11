'use client'

import { addTask } from "@/app/actions";
import { useFormStatus } from 'react-dom';
import { useRef } from "react";
import { TaskCategory } from "../types";
import { Loader2, Plus, Sparkles } from 'lucide-react';

const categories: TaskCategory[] = ['Work', 'Learning', 'Personal', 'Fitness', 'Other'];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="flex justify-center items-center py-3 px-6 mt-2 w-full text-white bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] rounded-xl hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 font-medium font-inter"
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="flex items-center gap-2"><Plus className="w-5 h-5" /> Add Task</span>}
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
      className="flex flex-col gap-4 font-inter relative z-10"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300">What needs to be done?</label>
        <div className="relative">
          <input
            type="text"
            name="title"
            placeholder="E.g., Finish Q3 Report"
            required
            className="w-full p-3 pl-4 rounded-xl glass-input text-white placeholder:text-slate-500"
          />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#22d3ee] hover:text-white transition-colors" title="AI Autofill Suggestion">
             <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300">Description (optional)</label>
        <textarea
          name="description"
          placeholder="Add details..."
          rows={2}
          className="w-full p-3 pl-4 rounded-xl glass-input text-white placeholder:text-slate-500 resize-none"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">Due Date</label>
          <input
            type="date"
            name="due_date"
            className="w-full p-3 rounded-xl glass-input text-slate-200 focus:text-white [color-scheme:dark]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">Category</label>
          <select
            name="category"
            required
            onChange={(e) => onCategoryChange(e.target.value as TaskCategory)}
            className="w-full p-3 rounded-xl glass-input text-slate-200 focus:text-white [&>option]:bg-slate-800"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
