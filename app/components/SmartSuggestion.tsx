// components/SmartSuggestion.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

function formatHour(hour: string) {
    const h = parseInt(hour, 10);
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    if (h < 12) return `${h} AM`;
    return `${h - 12} PM`;
}

export default async function SmartSuggestion() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    // For this MVP, we'll just get the first insight we find
    const { data: insights } = await supabase
        .from('user_insights')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('insight_type', 'peak_productivity_hour')
        .limit(1);
        
    if (!insights || insights.length === 0) {
        return null;
    }
    const insight = insights[0];

    return (
        <div className="p-4 mb-6 bg-purple-50 border border-purple-200 rounded-lg text-purple-800">
            <p>
                🧠 **Smart Suggestion:** You&apos;re most productive with **&apos;{insight.category}&apos;** tasks around **{formatHour(insight.value)}**. Try adding a new task for that time to get into your flow state.
            </p>
        </div>
    );
}