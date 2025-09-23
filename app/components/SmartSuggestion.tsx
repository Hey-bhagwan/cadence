// components/SmartSuggestion.tsx
'use client';

// The Task Category enum we defined in the database
type TaskCategory = 'Work' | 'Learning' | 'Personal' | 'Fitness' | 'Other';

// The shape of our insight data
interface Insight {
    category: TaskCategory;
    value: string; // The hour, e.g., '10'
}

function formatHour(hour: string) {
    const h = parseInt(hour, 10);
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    if (h < 12) return `${h} AM`;
    return `${h - 12} PM`;
}

// It now takes the currently selected category and all insights as props
export default function SmartSuggestion({ selectedCategory, insights }: { selectedCategory: TaskCategory | null, insights: Insight[] }) {
    if (!selectedCategory || insights.length === 0) {
        return null; // Don't show anything if no category is selected
    }

    // Find the specific insight for the selected category
    const relevantInsight = insights.find(i => i.category === selectedCategory);

    if (!relevantInsight) {
        return null; // Don't show if we have no insight for this category yet
    }

    return (
        <div className="p-4 mb-6 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 animate-fade-in">
            <p>
                🧠 <strong>Smart Suggestion:</strong> You&apos;re great at <strong>&apos;{relevantInsight.category}&apos;</strong> tasks around <strong>{formatHour(relevantInsight.value)}</strong>. Consider scheduling this new task for then!
            </p>
        </div>
    );
}