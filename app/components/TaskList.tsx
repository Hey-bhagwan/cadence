// components/TaskList.tsx
import TaskItem from './TaskItem'
import { Task } from '../types'

export default function TaskList({ tasks }: { tasks: Task[] }) {
    // Filter for parent tasks (tasks without a parent_id)
    const parentTasks = tasks.filter(task => task.parent_id === null);

    return (
        <div className="space-y-4">
            {parentTasks.map((parentTask) => {
                // Find all children for the current parent task
                const subtasks = tasks.filter(task => task.parent_id === parentTask.id);
                return (
                    <div key={parentTask.id} className="bg-gray-50 p-4 rounded-lg">
                        <TaskItem task={parentTask} />
                        {subtasks.length > 0 && (
                            <div className="ml-8 mt-2 space-y-2 border-l-2 pl-4">
                                {subtasks.map(subtask => (
                                    <TaskItem key={subtask.id} task={subtask} />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}