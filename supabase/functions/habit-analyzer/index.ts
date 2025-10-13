// supabase/functions/habit-analyzer/index.ts

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // This is needed for the function to be invoked from the browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { // Add this options object
        db: {
          schema: 'public',
        }
      }
    )

    // 1. Get all users
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError) throw usersError;

    for (const user of users) {
      console.log(`Analyzing data for user: ${user.id}`);

      // 2. Get all tasks completed by this user in the last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data: tasks, error: tasksError } = await supabaseAdmin
        .from('tasks')
        .select('category, completed_at')
        .eq('user_id', user.id)
        .eq('is_completed', true)
        .gte('completed_at', thirtyDaysAgo);

      if (tasksError) {
        console.error(`Error fetching tasks for user ${user.id}:`, tasksError);
        continue;
      }

      if (!tasks || tasks.length < 5) { // Don't analyze if there isn't enough data
        console.log(`Not enough data for user ${user.id}. Skipping.`);
        continue;
      }

      // 3. Analyze the data to find the peak hour for each category
      const completionsByHour: { [category: string]: { [hour: number]: number } } = {};

      for (const task of tasks) {
        if (!task.completed_at || !task.category) continue;

        const hour = new Date(task.completed_at).getHours(); // Get hour (0-23) in local time
        if (!completionsByHour[task.category]) {
          completionsByHour[task.category] = {};
        }
        if (!completionsByHour[task.category][hour]) {
          completionsByHour[task.category][hour] = 0;
        }
        completionsByHour[task.category][hour]++;
      }

      // 4. Find the peak hour and save the insight
      for (const category in completionsByHour) {
        const hours = completionsByHour[category];
        const peakHour = Object.keys(hours).reduce((a, b) => hours[a] > hours[b] ? a : b);

        const insight = {
          user_id: user.id,
          insight_type: 'peak_productivity_hour',
          category: category,
          value: peakHour, // Storing the hour (e.g., '14' for 2 PM)
          updated_at: new Date().toISOString()
        };

        // Upsert the insight into the database
        const { error: upsertError } = await supabaseAdmin.from('user_insights').upsert(insight);
        if (upsertError) {
          console.error(`Error upserting insight for user ${user.id}:`, upsertError);
        } else {
          console.log(`Insight saved for user ${user.id}, category ${category}: Peak hour is ${peakHour}.`);
        }
      }
    }

    return new Response(JSON.stringify({ message: "Habit analysis complete for all users." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})