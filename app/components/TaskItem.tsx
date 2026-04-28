'use client'

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteTask, updateTaskStatus, chunkAndSaveTask } from "@/app/actions";
import { Task } from "../types";
import { Pencil, Calendar, Sparkles, CheckCircle2, Circle, Trash2, AlignLeft } from 'lucide-react';
import EditTaskModel from './EditTaskModal';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function Spinner({ className }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${className || 'border-indigo-500'}`} />
  );
}

const categoryStyle: { [key: string]: string } = {
    'Work': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Learning': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Personal': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Fitness': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'Other': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

function DeleteButtonContent() {
  const { pending } = useFormStatus();
  return pending ? <Spinner className="border-rose-500 w-3.5 h-3.5" /> : <Trash2 size={15} className="text-slate-400 hover:text-rose-400 transition-colors" />;
}

function ChunkButtonContent() {
  const { pending } = useFormStatus();
  return pending ? <Spinner className="border-cyan-500 w-3.5 h-3.5" /> : <><Sparkles size={14} className="text-cyan-400" /> Chunk with AI</>;
}

function CompleteCheckbox({ isCompleted }: { isCompleted: boolean }) {
  const { pending } = useFormStatus();
  return (
      <button 
        type="submit" 
        disabled={pending}
        className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-indigo-400 transition-colors focus:outline-none disabled:opacity-50"
      >
        {pending ? (
           <Spinner className="border-indigo-400 w-5 h-5" />
        ) : isCompleted ? (
           <CheckCircle2 className="w-5 h-5 text-indigo-500" />
        ) : (
           <Circle className="w-5 h-5" />
        )}
      </button>
  );
}

export default function TaskItem({ task, subtasks }: { task: Task, subtasks: Task[] }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const formattedDate = task.due_date 
      ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
      : null;

    const hasDetails = (task.description && task.description.length > 0) || subtasks.length > 0;
    const isCompleted = task.is_completed;

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <>
        <motion.div 
          layout
          variants={itemVariant}
          className={`group bg-[#0f172a]/80 backdrop-blur-md border ${isCompleted ? 'border-slate-800/50 bg-slate-900/40' : 'border-slate-700/50 hover:border-indigo-500/50'} rounded-2xl transition-all duration-300 flex flex-col relative overflow-hidden shadow-lg hover:shadow-indigo-500/10`}
        >
            <div className="p-5 flex flex-col h-full gap-4">
                {/* Header: Checkbox & Title & Actions */}
                <div className="flex items-start gap-3">
                    <form action={() => updateTaskStatus(task.id, !isCompleted)}>
                        <CompleteCheckbox isCompleted={isCompleted} />
                    </form>
                    
                    <div className="flex-grow flex flex-col gap-1 min-w-0">
                        <div 
                          className="flex items-center justify-between gap-2 cursor-pointer"
                          onClick={() => setIsDetailsModalOpen(true)}
                        >
                            <h3 className={`text-base font-medium truncate transition-all duration-300 ${isCompleted ? 'line-through text-slate-500' : 'text-slate-100 group-hover:text-white'}`}>
                                {task.title}
                            </h3>
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${categoryStyle[task.category] || categoryStyle['Other']}`}>
                                {task.category}
                            </span>
                            {formattedDate && (
                                <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                                    <Calendar size={12} /> {formattedDate}
                                </span>
                            )}
                            {hasDetails && (
                                <span className="flex items-center gap-1 text-slate-400 text-[10px] font-medium bg-slate-800/50 px-2 py-0.5 rounded-full border border-slate-700/50">
                                    <AlignLeft size={10} /> Details
                                </span>
                            )}
                            {subtasks.length > 0 && (
                                <span className="flex items-center gap-1 text-cyan-400 text-[10px] font-medium bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                                    <Sparkles size={10} /> {subtasks.length} subtasks
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions - visible on hover on larger screens, always available but subtle */}
                <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#0f172a]/90 backdrop-blur-sm rounded-lg p-1 border border-slate-700/50">
                    <button onClick={() => setIsEditModalOpen(true)} className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors">
                        <Pencil size={15} />
                    </button>
                    <form action={() => deleteTask(task.id)}>
                        <button type="submit" className="p-1.5 rounded-md hover:bg-rose-500/10 transition-colors flex items-center justify-center">
                            <DeleteButtonContent />
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>

        {isEditModalOpen && <EditTaskModel task={task} isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />}

        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
            <DialogContent className="sm:max-w-[500px] bg-slate-900 border border-slate-800 text-white shadow-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader className="mb-2">
                    <div className="flex items-center gap-3 pr-6">
                        <form action={() => updateTaskStatus(task.id, !isCompleted)}>
                            <CompleteCheckbox isCompleted={isCompleted} />
                        </form>
                        <DialogTitle className={`text-xl font-semibold leading-tight ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                            {task.title}
                        </DialogTitle>
                    </div>
                </DialogHeader>
                
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${categoryStyle[task.category] || categoryStyle['Other']}`}>
                            {task.category}
                        </span>
                        {formattedDate && (
                            <span className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                                <Calendar size={14} /> Due: {formattedDate}
                            </span>
                        )}
                    </div>

                    {task.description && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <AlignLeft size={14} /> Description
                            </h4>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                                {task.description}
                            </div>
                        </div>
                    )}

                    {subtasks.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <CheckCircle2 size={14} /> Subtasks
                            </h4>
                            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 space-y-1">
                                {subtasks.map((subtask) => (
                                    <div key={subtask.id} className="flex items-start gap-3 p-2 hover:bg-slate-900 rounded-lg transition-colors group/subtask">
                                        <form action={() => updateTaskStatus(subtask.id, !subtask.is_completed)} className="mt-0.5 flex-shrink-0">
                                            <button type="submit" className="text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none">
                                                {subtask.is_completed ? <CheckCircle2 className="w-4 h-4 text-indigo-500" /> : <Circle className="w-4 h-4" />}
                                            </button>
                                        </form>
                                        <span className={`text-sm flex-1 ${subtask.is_completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                            {subtask.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isCompleted && (
                        <div className="pt-4 border-t border-slate-800 mt-2">
                            <form action={chunkAndSaveTask}>
                                <input type="hidden" name="taskId" value={task.id} />
                                <input type="hidden" name="taskDescription" value={task.title} />
                                <button type="submit" className="w-full text-sm font-medium text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group">
                                    <ChunkButtonContent />
                                    <span className="text-slate-400 text-xs font-normal ml-2 group-hover:text-slate-300 transition-colors">(Break down into subtasks)</span>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
}