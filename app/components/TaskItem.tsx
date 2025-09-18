// components/TaskItem.tsx
'use client'

import { deleteTask, updateTaskStatus } from "@/app/actions";

interface Task {
    id: number;
    title: string;
    is_completed: boolean;
}

export default function TaskItem({ task }: { task: Task }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg mb-2">
            <span className={`${task.is_completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
            </span>
            <div className="flex gap-2">
                <button 
                  onClick={() => updateTaskStatus(task.id, !task.is_completed)}
                  className={`px-3 py-1 text-sm rounded ${task.is_completed ? 'bg-yellow-400' : 'bg-green-500'} text-white`}
                >
                    {task.is_completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}