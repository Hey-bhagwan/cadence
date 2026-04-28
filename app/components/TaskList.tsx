'use client'

import TaskItem from './TaskItem';
import { Task } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskList({ tasks }: { tasks: Task[] }) {
    const parentTasks = tasks.filter(task => task.parent_id === null);

    // Sort: incomplete first, then by date descending
    const sortedTasks = [...parentTasks].sort((a, b) => {
        if (a.is_completed !== b.is_completed) {
            return a.is_completed ? 1 : -1;
        }
        
        const dateA = a.due_date ? new Date(a.due_date).getTime() : (a.created_at ? new Date(a.created_at).getTime() : 0);
        const dateB = b.due_date ? new Date(b.due_date).getTime() : (b.created_at ? new Date(b.created_at).getTime() : 0);
        
        return dateB - dateA; // Descending
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
            <AnimatePresence mode="popLayout">
                {sortedTasks.map((parentTask) => {
                    const subtasks = tasks.filter(task => task.parent_id === parentTask.id);
                    return (
                        <TaskItem key={parentTask.id} task={parentTask} subtasks={subtasks} />
                    );
                })}
            </AnimatePresence>
        </motion.div>
    );
}