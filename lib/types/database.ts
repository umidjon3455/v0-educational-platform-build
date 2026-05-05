// Database types for NEAT Educational Platform

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  total_points: number
  level: number
  streak_days: number
  last_activity_date: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  display_order: number
  created_at: string
}

export interface Module {
  id: string
  category_id: string
  name: string
  description: string | null
  icon: string | null
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  points_reward: number
  display_order: number
  created_at: string
  category?: Category
}

export interface Question {
  id: string
  module_id: string
  question_text: string
  question_type: 'multiple_choice' | 'true_false' | 'fill_blank'
  options: string[]
  correct_answer: string
  explanation: string | null
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  module_id: string
  questions_answered: number
  questions_correct: number
  completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
  module?: Module
}

export interface QuizAttempt {
  id: string
  user_id: string
  module_id: string
  score: number
  total_questions: number
  time_taken: number | null
  created_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string | null
  icon: string | null
  badge_color: string | null
  points_required: number | null
  achievement_type: 'points' | 'streak' | 'completion' | 'special'
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  achievement?: Achievement
}

export interface University {
  id: string
  name: string
  description: string | null
  location: string | null
  website: string | null
  image_url: string | null
  ranking: number | null
  programs: string[] | null
  created_at: string
}

export interface School {
  id: string
  name: string
  description: string | null
  location: string | null
  website: string | null
  image_url: string | null
  school_type: 'public' | 'private' | 'international'
  created_at: string
}

export interface City {
  id: string
  name: string
  description: string | null
  country: string | null
  image_url: string | null
  population: string | null
  highlights: string[] | null
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'achievement' | 'reminder' | 'system' | 'progress'
  read: boolean
  created_at: string
}

// Leaderboard entry type
export interface LeaderboardEntry {
  id: string
  full_name: string | null
  avatar_url: string | null
  total_points: number
  level: number
  streak_days: number
  rank?: number
}
