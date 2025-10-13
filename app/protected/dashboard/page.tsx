// app/dashboard/page.tsx

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClientPage from './DashboardClientPage'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = await createClient() // <-- Await the promise

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  // Fetch all data here on the server
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: insights } = await supabase
    .from('user_insights')
    .select('*')
    .eq('user_id', session.user.id);
  
  // Pass the server-fetched data as props to the client component
  return <DashboardClientPage tasks={tasks || []} insights={insights || []} />
}