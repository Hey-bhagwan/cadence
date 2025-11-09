import { Insight } from '../types';

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
    <div>
      <h3 className="text-lg font-semibold mb-2">Your Productivity Pattern</h3>
      <p className="text-gray-700 text-sm">
        You complete most of your <strong className="text-[#4FD1C5]">&apos;{insight.category}&apos;</strong> tasks around{" "}
        <strong className="text-[#4FD1C5]">{formatHour(insight.value)}</strong>. Schedule your next session for this time!
      </p>
    </div>
  );
}
