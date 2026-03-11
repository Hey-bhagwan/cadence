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

  export interface Insight {
    id: number;
    user_id: string;
    insight_type: string;
    category: 'Work' | 'Learning' | 'Personal' | 'Fitness' | 'Other';
    value: string; // The hour, e.g., '10'
    updated_at: string;
  }

  export type TaskCategory = 'Work' | 'Learning' | 'Personal' | 'Fitness' | 'Other';