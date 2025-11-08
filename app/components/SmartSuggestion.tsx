// components/SmartSuggestion.tsx
'use client';

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
    <div>
      <h3 className="text-lg font-semibold mb-2">AI Suggestion</h3>
      <p className="text-gray-700 text-sm">
        It’s a great time to focus on{" "}
        <strong className="text-[#4FD1C5]">'{relevantInsight.category}'</strong> tasks around{" "}
        <strong className="text-[#4FD1C5]">{formatHour(relevantInsight.value)}</strong>.
      </p>
    </div>
  );
}
