// components/TaskItem.tsx
'use client'

import { useState } from "react";
import { deleteTask, updateTaskStatus, chunkAndSaveTask } from "@/app/actions";
import { Task } from "../types";
import { Pencil, X } from 'lucide-react';
import EditTaskModel from './EditTaskModal';

const categoryColors: { [key: string]: string } = {
    'Work': 'bg-blue-100 text-blue-800',
    'Learning': 'bg-green-100 text-green-800',
    'Personal': 'bg-yellow-100 text-yellow-800',
    'Fitness': 'bg-red-100 text-red-800',
    'Other': 'bg-gray-100 text-gray-800',
};

// This component now receives its own subtasks as a prop
export default function TaskItem({ task, subtasks }: { task: Task, subtasks: Task[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const formattedDate = task.due_date 
      ? new Date(task.due_date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }) 
      : null;

    const isLongDescription = task.description && task.description.length > 100;

    return (
        // This is now the main card container
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
            {/* Main Task Content */}
            <div className="flex-grow">
                <div className="flex items-start justify-between">
                    <span className={`font-medium ${task.is_completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                    </span>
                    <form action={() => deleteTask(task.id)}>
                        <button type="submit" className="text-gray-400 hover:text-red-500 transition-colors">
                            <X size={18} />
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-2 text-xs mt-2">
                    <span className={`px-2 py-1 rounded-full ${categoryColors[task.category] || categoryColors['Other']}`}>
                        {task.category}
                    </span>
                    {formattedDate && (
                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            {formattedDate}
                        </span>
                    )}
                </div>
                {task.description && (
                    <div className="mt-2 text-sm text-gray-600">
                        <p className={!isExpanded && isLongDescription ? 'line-clamp-2' : ''}>
                            {task.description}
                        </p>
                        {isLongDescription && (
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)} 
                                className="text-blue-500 text-xs mt-1"
                            >
                                {isExpanded ? 'Show less' : 'Show more'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Subtasks Section */}
            {subtasks.length > 0 && (
                <div className="mt-4 pt-4 border-t space-y-2">
                    {subtasks.map(subtask => (
                        <div key={subtask.id} className="flex items-center justify-between text-sm">
                            <span className={`${subtask.is_completed ? 'line-through text-gray-500' : ''}`}>
                                ↳ {subtask.title}
                            </span>
                            <div className="flex items-center gap-2">
                                <form action={() => updateTaskStatus(subtask.id, !subtask.is_completed)}>
                                    <button type="submit" className="text-gray-400 hover:text-green-600">
                                        {subtask.is_completed ? "Undo" : "Done"}
                                    </button>
                                </form>
                                <form action={() => deleteTask(subtask.id)}>
                                    <button type="submit" className="text-gray-400 hover:text-red-500">
                                        <X size={14} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Footer with Actions */}
            <div className="flex items-center justify-end gap-2 mt-4 pt-2 border-t">
                <form action={chunkAndSaveTask} className="flex-grow">
                    <input type="hidden" name="taskId" value={task.id} />
                    <input type="hidden" name="taskDescription" value={task.title} />
                    <button type="submit" className="text-xs text-purple-600 hover:text-purple-800">
                        ✨ Chunk with AI
                    </button>
                </form>
                <form action={() => updateTaskStatus(task.id, !task.is_completed)}>
                    <button type="submit" className={`px-3 py-1 text-sm rounded ${task.is_completed ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-green-500 hover:bg-green-600'} text-white`}>
                        {task.is_completed ? 'Undo' : 'Complete'}
                    </button>
                </form>
                <button onClick={() => setIsModalOpen(true)} className="p-1 text-gray-500 hover:text-blue-600">
                    <Pencil size={16} />
                </button>
            </div>

            {isModalOpen && (
                <EditTaskModel 
                    task={task} 
                    isOpen={isModalOpen} 
                    setIsOpen={setIsModalOpen} 
                />
            )}
        </div>
    );
}