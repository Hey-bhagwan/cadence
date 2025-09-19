// components/TaskItem.tsx
'use client'

import { deleteTask, updateTaskStatus, chunkAndSaveTask } from "@/app/actions";
import { Task } from "../types";

// Helper object to map categories to colors
const categoryColors: { [key: string]: string } = {
    'Work': 'bg-blue-100 text-blue-800',
    'Learning': 'bg-green-100 text-green-800',
    'Personal': 'bg-yellow-100 text-yellow-800',
    'Fitness': 'bg-red-100 text-red-800',
    'Other': 'bg-gray-100 text-gray-800',
};

export default function TaskItem({ task }: { task: Task }) {
    const isSubtask = task.parent_id !== null;

    const formattedDate = task.due_date 
      ? new Date(task.due_date + 'T00:00:00').toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }) 
      : null;

    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
            <div className="flex items-center gap-3">
                {/* --- ADD SUBTASK INDICATOR --- */}
                {isSubtask && <span className="text-gray-400">↳</span>}
                {/* --------------------------- */}
                <span className={`${task.is_completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                </span>

                {/* --- CONDITIONALLY HIDE BADGES FOR SUBTASKS --- */}
                {!isSubtask && (
                    <>
                        <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[task.category] || categoryColors['Other']}`}>
                            {task.category}
                        </span>
                        {formattedDate && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                {formattedDate}
                            </span>
                        )}
                    </>
                )}
                {/* --------------------------------------------- */}
            </div>
            <div className="flex gap-2 items-center">
                {!isSubtask && (
                    <form action={chunkAndSaveTask}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <input type="hidden" name="taskDescription" value={task.title} />
                        <button 
                            type="submit" 
                            className="px-3 py-1 text-xs text-white bg-purple-500 rounded hover:bg-purple-600"
                            title="Break into smaller subtasks with AI"
                        >
                            ✨ Chunk
                        </button>
                    </form>
                )}
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