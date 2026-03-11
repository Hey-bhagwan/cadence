'use client'

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteTask, updateTaskStatus, chunkAndSaveTask } from "@/app/actions";
import { Task } from "../types";
import { Pencil, X, Calendar, Sparkles, Check, Undo2, ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import EditTaskModel from './EditTaskModal';
import { motion, AnimatePresence } from 'framer-motion';

// --- Local Spinner Component ---
function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full h-3 w-3 border-b-2 ${className || 'border-white'}`}
    />
  );
}

// Map Priority to Border Color (assuming priority might be added later, fallback to category or Medium)
const getPriorityColor = (task: Task & { priority?: string }) => {
  const priority = task.priority || 'Medium'; // Fallback
  switch (priority.toLowerCase()) {
    case 'low': return 'border-l-gray-500';
    case 'high': return 'border-l-orange-500';
    case 'critical': return 'border-l-red-500';
    case 'medium':
    default: return 'border-l-blue-500';
  }
};

const categoryStyle: { [key: string]: string } = {
    'Work': 'bg-indigo-500/10 text-indigo-400',
    'Learning': 'bg-emerald-500/10 text-emerald-400',
    'Personal': 'bg-purple-500/10 text-purple-400',
    'Fitness': 'bg-rose-500/10 text-rose-400',
    'Other': 'bg-slate-500/10 text-slate-400',
};

// --- Helper Button Components ---

function DeleteButtonContent() {
  const { pending } = useFormStatus();
  return pending ? <Spinner className="border-rose-500" /> : <X size={14} />;
}

function ChunkButtonContent() {
  const { pending } = useFormStatus();
  return pending ? <Spinner className="border-[#22d3ee]" /> : <><Sparkles size={12} className="text-[#22d3ee]" /> Chunk with AI</>;
}

function CompleteButtonContent({ is_completed }: { is_completed: boolean }) {
  const { pending } = useFormStatus();
  if (pending) return <Spinner />;
  return is_completed ? <><Undo2 size={12} /> Undo</> : <><Check size={12} /> Complete</>;
}

// --- Main Component ---

export default function TaskItem({ task, subtasks }: { task: Task, subtasks: Task[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

    const formattedDate = task.due_date 
      ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
      : null;

    const hasDetails = (task.description && task.description.length > 0) || subtasks.length > 0;
    const isCompleted = task.is_completed;

    return (
        <motion.div 
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isCompleted ? 0.5 : 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className={`group bg-slate-900/60 border border-slate-800 backdrop-blur rounded-xl hover:bg-slate-900 transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-slate-700 flex flex-col relative overflow-hidden ${getPriorityColor(task)} border-l-4`}
        >
            <div className="p-4 flex flex-col h-full gap-3">
                {/* Task Header */}
                <div className="flex items-start justify-between gap-3">
                    <div 
                      className={`flex items-start gap-2 flex-grow ${hasDetails ? 'cursor-pointer' : ''}`}
                      onClick={() => hasDetails && setIsDetailsExpanded(!isDetailsExpanded)}
                    >
                        {hasDetails && (
                            <button className="mt-0.5 text-slate-500 hover:text-white transition-colors focus:outline-none">
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDetailsExpanded ? 'rotate-180 text-white' : ''}`} />
                            </button>
                        )}
                        <h3 className={`text-sm font-semibold leading-tight transition-colors ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                            {task.title}
                        </h3>
                    </div>
                    {/* Delete button appears on hover */}
                    <form action={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="submit" className="text-slate-500 hover:text-rose-400 p-1 rounded-md hover:bg-rose-500/10 transition-colors">
                            <DeleteButtonContent />
                        </button>
                    </form>
                </div>

                {/* Subtasks Display (Checklist style) */}
                <AnimatePresence>
                    {isDetailsExpanded && hasDetails && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                            <div className="pt-2 pb-1 space-y-3">
                                {task.description && (
                                    <div className={`text-xs text-slate-400 leading-relaxed ${hasDetails ? 'pl-6' : ''} ${isCompleted ? 'line-through' : ''}`}>
                                        <p>{task.description}</p>
                                    </div>
                                )}

                                {subtasks.length > 0 && (
                                    <div className={`space-y-1.5 ${hasDetails ? 'pl-6' : ''}`}>
                                        {subtasks.map((subtask, idx) => (
                                            <motion.div 
                                                key={subtask.id} 
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-start gap-2 text-xs group/subtask"
                                            >
                                                <form action={() => updateTaskStatus(subtask.id, !subtask.is_completed)} className="mt-0.5">
                                                    <button type="submit" className="text-slate-500 hover:text-emerald-400 transition-colors">
                                                        {subtask.is_completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Circle className="w-3.5 h-3.5" />}
                                                    </button>
                                                </form>
                                                <span className={`flex-1 transition-all ${subtask.is_completed ? 'line-through text-slate-600' : 'text-slate-400'}`}>
                                                    {subtask.title}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-grow" />

                {/* Task Metadata Row */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-medium ${categoryStyle[task.category] || categoryStyle['Other']}`}>
                        {task.category}
                    </span>
                    {formattedDate && (
                        <span className="flex items-center gap-1 bg-slate-700/40 text-slate-300 px-2 py-1 rounded-md text-[10px] font-medium">
                            <Calendar size={10} /> {formattedDate}
                        </span>
                    )}
                    {subtasks.length > 0 && (
                        <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-md text-[10px] font-medium">
                            <Sparkles size={10} /> AI Chunked
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-800/50">
                    <form action={chunkAndSaveTask}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <input type="hidden" name="taskDescription" value={task.title} />
                        <button type="submit" className="text-[11px] font-medium text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                            <ChunkButtonContent />
                        </button>
                    </form>
                    
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
                            <Pencil size={12} />
                        </button>
                        <form action={() => updateTaskStatus(task.id, !task.is_completed)}>
                            <button type="submit" className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-all ${isCompleted ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)]'}`}>
                                <CompleteButtonContent is_completed={isCompleted} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {isModalOpen && <EditTaskModel task={task} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
        </motion.div>
    );
}