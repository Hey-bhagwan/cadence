import { Insight } from '../types';
import { TrendingUp } from 'lucide-react';

function formatHour(hour: string) {
  const h = parseInt(hour, 10);
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

export default function HabitInsight({ insights }: { insights: Insight[] }) {
  if (!insights || insights.length === 0) return null;
  const insight = insights[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-[#4f46e5]" />
        <h3 className="text-lg font-semibold text-white">Productivity Pattern</h3>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">
        You complete most of your <strong className="text-[#22d3ee]">&apos;{insight.category}&apos;</strong> tasks around{" "}
        <strong className="text-[#22d3ee]">{formatHour(insight.value)}</strong>. Schedule your next session for this time to maximize focus!
      </p>
    </div>
  );
}
