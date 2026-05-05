"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Target, 
  Flame,
  TrendingUp,
  ChevronRight,
  Star,
  Zap
} from "lucide-react"

interface UserStats {
  totalPoints: number
  level: number
  streakDays: number
  modulesCompleted: number
  questionsAnswered: number
  accuracy: number
}

interface RecentActivity {
  id: string
  moduleName: string
  categoryName: string
  score: number
  totalQuestions: number
  completedAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<UserStats>({
    totalPoints: 0,
    level: 1,
    streakDays: 0,
    modulesCompleted: 0,
    questionsAnswered: 0,
    accuracy: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      setUser(user)

      // Load user profile and stats
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profile) {
        // Load progress stats
        const { data: progress } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)

        const modulesCompleted = progress?.filter(p => p.completed).length || 0
        const questionsAnswered = progress?.reduce((sum, p) => sum + (p.questions_answered || 0), 0) || 0
        const questionsCorrect = progress?.reduce((sum, p) => sum + (p.questions_correct || 0), 0) || 0
        const accuracy = questionsAnswered > 0 ? Math.round((questionsCorrect / questionsAnswered) * 100) : 0

        setStats({
          totalPoints: profile.total_points || 0,
          level: profile.level || 1,
          streakDays: profile.streak_days || 0,
          modulesCompleted,
          questionsAnswered,
          accuracy
        })
      }

      // Load recent quiz attempts
      const { data: attempts } = await supabase
        .from("quiz_attempts")
        .select(`
          id,
          score,
          total_questions,
          created_at,
          modules (
            name,
            categories (name)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      if (attempts) {
        setRecentActivity(attempts.map((a: any) => ({
          id: a.id,
          moduleName: a.modules?.name || "Unknown",
          categoryName: a.modules?.categories?.name || "Unknown",
          score: a.score,
          totalQuestions: a.total_questions,
          completedAt: a.created_at
        })))
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const getLevelProgress = () => {
    const pointsForNextLevel = stats.level * 100
    const currentLevelPoints = stats.totalPoints % 100
    return (currentLevelPoints / pointsForNextLevel) * 100
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
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey and track your progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Level {stats.level}
            </p>
            <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${getLevelProgress()}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streakDays} days</div>
            <p className="text-xs text-muted-foreground">
              Keep it going!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.modulesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {stats.questionsAnswered} questions answered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accuracy}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="group hover:border-primary/50 transition-colors">
          <Link href="/learn/english">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-500/10 p-3">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">English</CardTitle>
                  <CardDescription>Vocabulary, Grammar & More</CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Master English with vocabulary quizzes, grammar exercises, and reading comprehension tests.
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="group hover:border-primary/50 transition-colors">
          <Link href="/learn/programming">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-emerald-500/10 p-3">
                  <Code className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Programming</CardTitle>
                  <CardDescription>Python, JavaScript & More</CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn programming fundamentals with interactive quizzes covering multiple languages.
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{activity.moduleName}</p>
                      <p className="text-sm text-muted-foreground">{activity.categoryName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{activity.score}/{activity.totalQuestions}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent activity</p>
                <Button asChild className="mt-4">
                  <Link href="/learn">Start Learning</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: "First Steps", unlocked: stats.questionsAnswered > 0 },
                { name: "Quick Learner", unlocked: stats.modulesCompleted >= 1 },
                { name: "On Fire", unlocked: stats.streakDays >= 3 },
                { name: "Scholar", unlocked: stats.totalPoints >= 100 },
                { name: "Expert", unlocked: stats.accuracy >= 80 },
                { name: "Dedicated", unlocked: stats.streakDays >= 7 },
                { name: "Master", unlocked: stats.totalPoints >= 500 },
                { name: "Perfectionist", unlocked: stats.accuracy >= 95 },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                    achievement.unlocked ? "bg-primary/10" : "bg-muted opacity-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"
                  }`}>
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-center">{achievement.name}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/achievements">View All Achievements</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
