// components/TaskItem.tsx
'use client'

import { deleteTask, updateTaskStatus, chunkAndSaveTask } from "@/app/actions";
import { Task } from '../types'

export default function TaskItem({ task }: { task: Task }) {
    // We don't want the AI button on subtasks
    const isSubtask = task.parent_id !== null;
    // Helper to format the date nicely
    const formattedDate = task.due_date 
      ? new Date(task.due_date + 'T00:00:00').toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }) 
      : null;

    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
            <span className={`${task.is_completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
            </span>
            {formattedDate && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {formattedDate}
                    </span>
                )}
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