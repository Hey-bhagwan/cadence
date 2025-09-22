// app/dashboard/DashboardClientPage.tsx
'use client'

import { useState } from 'react';
import { Task, Insight, TaskCategory } from '../types';

import AddTaskForm from '../components/AddTaskForm';
import ViewToggle from '../components/ViewToggle';
import HabitInsight from '../components/HabitInsight';
import SmartSuggestion from '../components/SmartSuggestion';

// The component now receives tasks and insights as props
export default function DashboardClientPage({ tasks, insights }: { tasks: Task[], insights: Insight[] }) {
    const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>
            
            {/* The HabitInsight component now receives its data as a prop */}
            <HabitInsight insights={insights} />

            <SmartSuggestion selectedCategory={selectedCategory} insights={insights} />
            
            <AddTaskForm onCategoryChange={setSelectedCategory} />

            <ViewToggle tasks={tasks} />
        </div>
    );
}