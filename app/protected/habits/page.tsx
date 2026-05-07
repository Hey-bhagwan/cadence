'use client'

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Target, Activity, Zap, TrendingUp } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const CATEGORY_COLORS = {
  'Work': '#6366f1', // indigo-500
  'Learning': '#10b981', // emerald-500
  'Personal': '#a855f7', // purple-500
  'Fitness': '#f43f5e', // rose-500
  'Other': '#64748b', // slate-500
};

// Mock Data for Habits Analytics
const categoryData = [
  { name: 'Work', value: 35 },
  { name: 'Learning', value: 20 },
  { name: 'Personal', value: 25 },
  { name: 'Fitness', value: 15 },
  { name: 'Other', value: 5 },
];

const timelineData = [
  { date: 'Mon', completed: 4 },
  { date: 'Tue', completed: 6 },
  { date: 'Wed', completed: 5 },
  { date: 'Thu', completed: 8 },
  { date: 'Fri', completed: 3 },
  { date: 'Sat', completed: 7 },
  { date: 'Sun', completed: 5 },
];

const productivityData = [
  { time: '6 AM', focus: 30 },
  { time: '9 AM', focus: 80 },
  { time: '12 PM', focus: 60 },
  { time: '3 PM', focus: 90 },
  { time: '6 PM', focus: 50 },
  { time: '9 PM', focus: 20 },
];

export default function HabitsPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Activity className="text-indigo-500" />
            Habit Analytics
          </h1>
          <p className="text-slate-400 mt-2">Track your progress, understand your patterns, and build better habits.</p>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* KPI Cards */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-16 h-16 text-indigo-500" />
            </div>
            <h3 className="text-slate-400 font-medium">Weekly Completion</h3>
            <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">84%</span>
                <span className="text-emerald-400 flex items-center text-sm font-medium mb-1"><TrendingUp size={16} className="mr-1"/> +5%</span>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-16 h-16 text-emerald-500" />
            </div>
            <h3 className="text-slate-400 font-medium">Current Streak</h3>
            <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">12 Days</span>
                <span className="text-slate-500 text-sm mb-1">Personal Best: 15</span>
            </div>
        </motion.div>

        {/* Categories Pie Chart */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 lg:row-span-2 flex flex-col gap-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white">Task Distribution</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.Other} />
                            ))}
                        </Pie>
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                {categoryData.map(cat => (
                    <div key={cat.name} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat.name as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.Other }}></span>
                        {cat.name}
                    </div>
                ))}
            </div>
        </motion.div>

        {/* Timeline Bar Chart */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:col-span-2 flex flex-col gap-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white">Activity Timeline</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                            cursor={{ fill: '#1e293b', opacity: 0.4 }}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                        />
                        <Bar dataKey="completed" name="Tasks Completed" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

        {/* Peak Productivity Line Chart */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:col-span-2 flex flex-col gap-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white">Peak Productivity Hours</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                        />
                        <Line type="monotone" dataKey="focus" name="Focus Level" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
