// components/HabitInsight.tsx
import { Insight } from '../types';

// Helper function to format the hour
function formatHour(hour: string) {
    const h = parseInt(hour, 10);
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    if (h < 12) return `${h} AM`;
    return `${h - 12} PM`;
}

export default function HabitInsight({ insights }: { insights: Insight[] }) {
    if (!insights || insights.length === 0) {
        return null;
    }

    const insight = insights[0];

    return (
        <div className="p-4 mb-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
            <p>
                💡 <strong>Productivity Tip:</strong> You complete most of your <strong>&apos;{insight.category}&apos;</strong> tasks around <strong>{formatHour(insight.value)}</strong>. Try scheduling them for that time!
            </p>
        </div>
    );
}