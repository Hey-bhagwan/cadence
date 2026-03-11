// components/TaskList.tsx
import TaskItem from './TaskItem';
import { Task } from '../types';

export default function TaskList({ tasks }: { tasks: Task[] }) {
    // Filter for parent tasks (tasks without a parent_id)
    const parentTasks = tasks.filter(task => task.parent_id === null);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {parentTasks.map((parentTask) => {
                // Find all children for the current parent task
                const subtasks = tasks.filter(task => task.parent_id === parentTask.id);
                // Pass the subtasks to the TaskItem component
                return (
                    <TaskItem key={parentTask.id} task={parentTask} subtasks={subtasks} />
                );
            })}
        </div>
    );
}