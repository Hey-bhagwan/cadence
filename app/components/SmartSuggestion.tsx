'use client';

import { Sparkles } from 'lucide-react';

type TaskCategory = 'Work' | 'Learning' | 'Personal' | 'Fitness' | 'Other';

interface Insight {
  category: TaskCategory;
  value: string;
}

function formatHour(hour: string) {
  const h = parseInt(hour, 10);
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

export default function SmartSuggestion({
  selectedCategory,
  insights,
}: {
  selectedCategory: TaskCategory | null;
  insights: Insight[];
}) {
  if (!selectedCategory || insights.length === 0) return null;

  const relevantInsight = insights.find((i) => i.category === selectedCategory);
  if (!relevantInsight) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#22d3ee] animate-pulse" />
        <h3 className="text-lg font-semibold text-white">Smart Suggestion</h3>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">
        It&apos;s a great time to focus on{" "}
        <strong className="text-[#22d3ee]">&apos;{relevantInsight.category}&apos;</strong> tasks around{" "}
        <strong className="text-[#22d3ee]">{formatHour(relevantInsight.value)}</strong>.
      </p>
    </div>
  );
}
