'use client'

import { useState } from 'react';
import { Task, Insight, TaskCategory } from '../../types';
import AddTaskForm from '../../components/AddTaskForm';
import ViewToggle from '../../components/ViewToggle';
import HabitInsight from '../../components/HabitInsight';
import SmartSuggestion from '../../components/SmartSuggestion';
import { Sparkles, Brain } from 'lucide-react';

export default function DashboardClientPage({ tasks, insights }: { tasks: Task[], insights: Insight[] }) {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left/Center Area (Main Content) */}
        <div className="xl:col-span-8 space-y-8">
          {/* Section 1: Daily Focus */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Daily Focus <Sparkles className="w-5 h-5 text-[#22d3ee]" />
            </h2>
            <p className="text-slate-400">Here&apos;s what needs your attention today.</p>
          </div>

          {/* Section 2: Add Task */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#4f46e5] to-[#7c3aed]"></div>
            <AddTaskForm onCategoryChange={setSelectedCategory} />
          </div>

          {/* Section 3: Task List */}
          <div className="glass-panel p-6 rounded-2xl border-white/5">
            <ViewToggle tasks={tasks} />
          </div>
        </div>

        {/* Right Sidebar (AI Insights) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-[#7c3aed]" />
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          </div>
          
          <div className="glass-card p-6 rounded-2xl border-t border-[#4f46e5]/30 shadow-[0_8px_32px_rgba(79,70,229,0.1)]">
            <HabitInsight insights={insights} />
          </div>
          
          <div className="glass-card p-6 rounded-2xl border-t border-[#22d3ee]/30 shadow-[0_8px_32px_rgba(34,211,238,0.1)]">
            <SmartSuggestion selectedCategory={selectedCategory} insights={insights} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
