// supabase/functions/task-nudge-scheduler/index.ts (FINAL VERSION)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// This is a helper function to send the notification using native fetch
// It replaces the entire web-push library
async function sendNotification(subscription: any, payload: string) {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `vapid t=${subscription.vapidToken}, k=${Deno.env.get('NEXT_PUBLIC_VAPID_PUBLIC_KEY')!}`,
      'Content-Type': 'application/json',
    },
    body: payload,
  };

  const response = await fetch(subscription.endpoint, options);
  if (!response.ok) {
    console.error(`Failed to send notification: ${response.status} ${await response.text()}`);
  } else {
    console.log("Successfully sent notification.");
  }
}


Deno.serve(async (_req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { db: { schema: 'public' } }
    )

    const { data: upcomingTasks, error: tasksError } = await supabaseAdmin
      .rpc('get_tasks_due_tomorrow');

    if (tasksError) throw tasksError;
    if (!upcomingTasks || upcomingTasks.length === 0) {
      return new Response(JSON.stringify({ message: "No tasks due tomorrow to notify." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    for (const task of upcomingTasks) {
      const { data: subData, error: subError } = await supabaseAdmin
        .from('push_subscriptions')
        .select('subscription')
        .eq('user_id', task.user_id)
        .single();

      if (subError || !subData) {
        console.error("No subscription found for user:", task.user_id);
        continue;
      }
      
      const payload = JSON.stringify({
        title: 'Heads Up!',
        body: `🔔 Your task "${task.title}" is due tomorrow.`,
      });
      
      // Call our new helper function
      await sendNotification(subData.subscription, payload);
      
      await supabaseAdmin
        .from('tasks')
        .update({ last_notified_at: new Date().toISOString() })
        .eq('id', task.id);
    }
    
    return new Response(JSON.stringify({ message: `${upcomingTasks.length} notifications sent.` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
})