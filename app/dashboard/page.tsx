// app/dashboard/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardClientPage from './DashboardClientPage'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })
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