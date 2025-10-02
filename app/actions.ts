// app/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { GoogleGenerativeAI } from "@google/generative-ai";
import webPush from 'web-push';

export async function addTask(formData: FormData) {
    const title = formData.get('title');
    const dueDate = formData.get('due_date');
    const category = formData.get('category'); // <-- Get the category

    if (!title) return;

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const taskToInsert: {
        title: string;
        user_id: string;
        category: string; // <-- Add category to the type
        due_date?: string;
    } = {
        title: title.toString(),
        user_id: session.user.id,
        category: category ? category.toString() : 'Other', // <-- Add the category value
    };

    if (dueDate && dueDate.toString().length > 0) {
        taskToInsert.due_date = `${dueDate.toString()}T00:00:00Z`;
    }

    await supabase.from('tasks').insert(taskToInsert);
    revalidatePath('/dashboard');
}

export async function deleteTask(id: number) {
    const supabase = await createClient();
    await supabase.from('tasks').delete().match({ id });
    revalidatePath('/dashboard');
}

export async function updateTaskStatus(id: number, is_completed: boolean) {
    const supabase = await createClient();

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
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
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
        const supabase = await createClient();
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
        throw e;
    }
}

export async function saveSubscription(subscription: object) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        throw new Error("User not authenticated");
    }

    // Upsert ensures we don't have duplicate subscriptions for a user
    const { error } = await supabase.from('push_subscriptions').upsert({
        user_id: session.user.id,
        subscription: subscription,
    });

    if (error) {
        console.error("Error saving subscription:", error);
        throw error;
    }
}

export async function sendNudgeNotification(userId: string, title: string, body: string) {
    const supabase = await createClient();

    // 1. Get the user's saved subscription from the database
    const { data, error } = await supabase
        .from('push_subscriptions')
        .select('subscription')
        .eq('user_id', userId)
        .single();

    if (error || !data) {
        console.error("No subscription found for user:", userId);
        return;
    }

    // 2. Configure web-push with your VAPID keys
    webPush.setVapidDetails(
        'mailto:ayushupa29@gmail.com', // Make sure you replaced this
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        process.env.VAPID_PRIVATE_KEY!
    );

    // 3. Send the notification
    try {
        const payload = JSON.stringify({
            title,
            body
        });

        await webPush.sendNotification(data.subscription, payload);
        console.log('Push notification sent successfully to:', userId);
    } catch (pushError) {
        console.error('Error sending push notification:', pushError);
    }
}

export async function updateTask(
    { id, title, description, dueDate }:
        { id: number; title: string; description: string; dueDate: string; }
) {
    const supabase = await createClient();

    const taskToUpdate: { title: string; description: string; due_date?: string; } = {
        title,
        description,
    };

    if (dueDate) {
        taskToUpdate.due_date = `${dueDate}T00:00:00Z`;
    }

    await supabase.from('tasks').update(taskToUpdate).eq('id', id);
    revalidatePath('/protected/dashboard');
}