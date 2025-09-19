// components/HabitInsight.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Helper function to format the hour
function formatHour(hour: string) {
    const h = parseInt(hour, 10);
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    if (h < 12) return `${h} AM`;
    return `${h - 12} PM`;
}

export default async function HabitInsight() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return null;

    const { data: insights } = await supabase
        .from('user_insights')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('insight_type', 'peak_productivity_hour');

    if (!insights || insights.length === 0) {
        return null; // Don't show anything if no insights are found
    }

    // For this MVP, we'll just show the first insight we find
    const insight = insights[0];

    return (
        <div className="p-4 mb-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
            <p>
                💡 **Productivity Tip:** You complete most of your <strong>&apos;{insight.category}&apos;</strong> tasks around <strong>{formatHour(insight.value)}</strong>. Try scheduling them for that time!
            </p>
        </div>
    );
}