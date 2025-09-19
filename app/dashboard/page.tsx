// app/dashboard/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AddTaskForm from '../components/AddTaskForm'
import ViewToggle from '../components/ViewToggle' // Import the new toggle

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>
      <AddTaskForm />
      <ViewToggle tasks={tasks || []} />
    </div>
  )
}