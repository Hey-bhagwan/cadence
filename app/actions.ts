// app/actions.ts
'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    
    // If the task is being marked as complete, set the completed_at timestamp.
    // If it's being marked as incomplete, set it back to null.
    const updates = {
        is_completed,
        completed_at: is_completed ? new Date().toISOString() : null
    };

    await supabase.from('tasks').update(updates).match({ id })
    revalidatePath('/dashboard')
}

export async function chunkAndSaveTask(formData: FormData) {
  const taskId = formData.get('taskId')?.toString();
  const taskDescription = formData.get('taskDescription')?.toString();

  if (!taskId || !taskDescription) return;

  // 1. Call Gemini API
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
      You are a productivity assistant. Break down the following complex task 
      into a list of 2-4 simple, actionable subtasks.
      Task: "${taskDescription}"
      Respond ONLY with a valid JSON array of strings, like ["subtask 1", "subtask 2"].
  `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
      const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const subtaskTitles: string[] = JSON.parse(cleanedText);

      // 2. Save Subtasks to Supabase
      const supabase = createServerComponentClient({ cookies });
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const subtasksToInsert = subtaskTitles.map(title => ({
          title,
          user_id: session.user.id,
          parent_id: parseInt(taskId, 10), // Link to the parent task
      }));

      await supabase.from('tasks').insert(subtasksToInsert);
      revalidatePath('/dashboard');

  } catch (e) {
      console.error("Failed to parse AI response or save subtasks:", text, e);
      // Optionally, return an error message to the user
  }
}