// app/dashboard/DashboardClientPage.tsx
'use client'

import { useState, useEffect } from 'react';
import { Task, Insight, TaskCategory } from '../../types';

import AddTaskForm from '../../components/AddTaskForm';
import ViewToggle from '../../components/ViewToggle';
import HabitInsight from '../../components/HabitInsight';
import SmartSuggestion from '../../components/SmartSuggestion';
import EnableNotificationsButton from '../../components/EnableNotificationsButton';
import { sendNudgeNotification } from '@/app/actions';

// The component now receives tasks and insights as props
export default function DashboardClientPage({ tasks, insights }: { tasks: Task[], insights: Insight[] }) {
    const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

    useEffect(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/worker.js')
          .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
          .catch((err) => console.error('Service Worker registration failed:', err));
          //hey
      }
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-end gap-2">
                <EnableNotificationsButton />
                <button 
                  onClick={async () => await sendNudgeNotification()}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded"
                >
                  Send Test Nudge
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>
            
            <HabitInsight insights={insights} />

            <SmartSuggestion selectedCategory={selectedCategory} insights={insights} />
            
            <AddTaskForm onCategoryChange={setSelectedCategory} />

            <ViewToggle tasks={tasks} />
        </div>
    );
}