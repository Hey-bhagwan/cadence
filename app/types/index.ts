// types/index.ts

export interface Task {
    id: number;
    title: string;
    description: string | null;
    is_completed: boolean;
    created_at: string;
    due_date: string | null;
    user_id: string;
    parent_id: number | null;
    category: string;
  }