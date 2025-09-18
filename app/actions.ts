// app/actions.ts
'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function addTask(formData: FormData) {
  const title = formData.get('title')
  if (!title) return;

  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return;

  await supabase.from('tasks').insert({ title: title.toString(), user_id: session.user.id })
  revalidatePath('/dashboard')
}

export async function deleteTask(id: number) {
    const supabase = createServerComponentClient({ cookies })
    await supabase.from('tasks').delete().match({ id })
    revalidatePath('/dashboard')
}

export async function updateTaskStatus(id: number, is_completed: boolean) {
    const supabase = createServerComponentClient({ cookies })
    await supabase.from('tasks').update({ is_completed }).match({ id })
    revalidatePath('/dashboard')
}