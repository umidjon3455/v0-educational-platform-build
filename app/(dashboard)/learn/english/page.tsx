"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle2,
  Clock,
  Star,
  ArrowLeft
} from "lucide-react"

interface Module {
  id: string
  name: string
  description: string
  difficulty: string
  points_reward: number
  questionCount: number
  completed: boolean
  progress: number
}

// Default English modules
const defaultModules: Module[] = [
  {
    id: "vocab-basics",
    name: "Vocabulary Basics",
    description: "Learn essential English vocabulary for everyday communication",
    difficulty: "beginner",
    points_reward: 10,
    questionCount: 20,
    completed: false,
    progress: 0
  },
  {
    id: "grammar-essentials",
    name: "Grammar Essentials",
    description: "Master the fundamental rules of English grammar",
    difficulty: "beginner",
    points_reward: 15,
    questionCount: 25,
    completed: false,
    progress: 0
  },
  {
    id: "reading-comprehension",
    name: "Reading Comprehension",
    description: "Improve your ability to understand and analyze texts",
    difficulty: "intermediate",
    points_reward: 20,
    questionCount: 15,
    completed: false,
    progress: 0
  },
  {
    id: "idioms-phrases",
    name: "Idioms & Phrases",
    description: "Learn common English idioms and their meanings",
    difficulty: "intermediate",
    points_reward: 20,
    questionCount: 20,
    completed: false,
    progress: 0
  },
  {
    id: "advanced-vocabulary",
    name: "Advanced Vocabulary",
    description: "Expand your vocabulary with advanced English words",
    difficulty: "advanced",
    points_reward: 25,
    questionCount: 30,
    completed: false,
    progress: 0
  },
  {
    id: "writing-skills",
    name: "Writing Skills",
    description: "Develop your English writing abilities",
    difficulty: "advanced",
    points_reward: 30,
    questionCount: 20,
    completed: false,
    progress: 0
  }
]

export default function EnglishLearnPage() {
  const [modules, setModules] = useState<Module[]>(defaultModules)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadModules() {
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      
      // Try to load modules from database
      const { data: dbModules } = await supabase
        .from("modules")
        .select(`
          *,
          categories!inner (name),
          questions (count)
        `)
        .eq("categories.name", "English")
        .order("display_order")

      if (dbModules && dbModules.length > 0) {
        // Load user progress if logged in
        let progressMap: Record<string, any> = {}
        if (user) {
          const { data: progress } = await supabase
            .from("user_progress")
            .select("*")
            .eq("user_id", user.id)
          
          progressMap = (progress || []).reduce((acc: any, p: any) => {
            acc[p.module_id] = p
            return acc
          }, {})
        }

        setModules(dbModules.map((m: any) => ({
          id: m.id,
          name: m.name,
          description: m.description || "",
          difficulty: m.difficulty || "beginner",
          points_reward: m.points_reward || 10,
          questionCount: m.questions?.[0]?.count || 0,
          completed: progressMap[m.id]?.completed || false,
          progress: progressMap[m.id] 
            ? Math.round((progressMap[m.id].questions_correct / progressMap[m.id].questions_answered) * 100) || 0 
            : 0
        })))
      }
      
      setLoading(false)
    }

    loadModules()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "intermediate": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "advanced": return "bg-red-500/10 text-red-600 border-red-500/20"
      default: return "bg-gray-500/10 text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/learn">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">English</h1>
          </div>
          <p className="text-muted-foreground mt-1 ml-12">
            Master vocabulary, grammar, and communication skills
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Progress</p>
              <p className="text-2xl font-bold">
                {modules.filter(m => m.completed).length} / {modules.length} Modules
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {modules.reduce((sum, m) => sum + m.questionCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">
                  {modules.reduce((sum, m) => sum + m.points_reward, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Points Available</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.id} className="group hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty}
                </Badge>
                {module.completed && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
              <CardTitle className="text-lg mt-2">{module.name}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.questionCount} questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{module.points_reward} pts</span>
                </div>
              </div>
              <Button className="w-full group-hover:bg-primary" asChild>
                <Link href={`/learn/english/${module.id}/quiz`}>
                  {module.completed ? "Practice Again" : "Start Quiz"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
