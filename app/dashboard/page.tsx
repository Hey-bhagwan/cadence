// app/dashboard/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AddTaskForm from '../components/AddTaskForm'
import TaskItem from '../components/TaskItem'

export const dynamic = 'force-dynamic' // Ensures the page is always fresh

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
      <div className="space-y-4">
          {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
          ))}
      </div>
    </div>
  )
}