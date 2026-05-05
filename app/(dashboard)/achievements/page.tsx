"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy,
  Star,
  Flame,
  Target,
  Book,
  Code,
  Zap,
  Award,
  Crown,
  Medal,
  Sparkles,
  GraduationCap,
  Heart,
  Rocket
} from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  color: string
  requirement: string
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

const allAchievements: Achievement[] = [
  // Getting Started
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first quiz",
    icon: "rocket",
    color: "#3B82F6",
    requirement: "Complete 1 quiz",
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: "quick-learner",
    name: "Quick Learner",
    description: "Complete 5 quizzes",
    icon: "zap",
    color: "#F59E0B",
    requirement: "Complete 5 quizzes",
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: "dedicated-student",
    name: "Dedicated Student",
    description: "Complete 25 quizzes",
    icon: "graduation",
    color: "#8B5CF6",
    requirement: "Complete 25 quizzes",
    unlocked: false,
    progress: 0,
    maxProgress: 25
  },
  // Streaks
  {
    id: "on-fire",
    name: "On Fire",
    description: "Maintain a 3-day streak",
    icon: "flame",
    color: "#EF4444",
    requirement: "3-day streak",
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: "week-warrior",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "flame",
    color: "#F97316",
    requirement: "7-day streak",
    unlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: "month-master",
    name: "Month Master",
    description: "Maintain a 30-day streak",
    icon: "flame",
    color: "#DC2626",
    requirement: "30-day streak",
    unlocked: false,
    progress: 0,
    maxProgress: 30
  },
  // Points
  {
    id: "century",
    name: "Century",
    description: "Earn 100 points",
    icon: "star",
    color: "#10B981",
    requirement: "Earn 100 points",
    unlocked: false,
    progress: 0,
    maxProgress: 100
  },
  {
    id: "high-scorer",
    name: "High Scorer",
    description: "Earn 500 points",
    icon: "star",
    color: "#14B8A6",
    requirement: "Earn 500 points",
    unlocked: false,
    progress: 0,
    maxProgress: 500
  },
  {
    id: "point-master",
    name: "Point Master",
    description: "Earn 1000 points",
    icon: "crown",
    color: "#0EA5E9",
    requirement: "Earn 1000 points",
    unlocked: false,
    progress: 0,
    maxProgress: 1000
  },
  // Accuracy
  {
    id: "sharp-mind",
    name: "Sharp Mind",
    description: "Score 80% or higher on a quiz",
    icon: "target",
    color: "#6366F1",
    requirement: "80% accuracy on a quiz",
    unlocked: false
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Score 100% on a quiz",
    icon: "sparkles",
    color: "#EC4899",
    requirement: "100% accuracy on a quiz",
    unlocked: false
  },
  {
    id: "genius",
    name: "Genius",
    description: "Score 100% on 5 quizzes",
    icon: "award",
    color: "#F59E0B",
    requirement: "Perfect score on 5 quizzes",
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  // Category Mastery
  {
    id: "wordsmith",
    name: "Wordsmith",
    description: "Complete all English vocabulary modules",
    icon: "book",
    color: "#3B82F6",
    requirement: "Complete English vocabulary",
    unlocked: false
  },
  {
    id: "grammar-guru",
    name: "Grammar Guru",
    description: "Complete all English grammar modules",
    icon: "book",
    color: "#8B5CF6",
    requirement: "Complete English grammar",
    unlocked: false
  },
  {
    id: "code-ninja",
    name: "Code Ninja",
    description: "Complete all Python modules",
    icon: "code",
    color: "#10B981",
    requirement: "Complete Python modules",
    unlocked: false
  },
  {
    id: "web-wizard",
    name: "Web Wizard",
    description: "Complete all JavaScript modules",
    icon: "code",
    color: "#F59E0B",
    requirement: "Complete JavaScript modules",
    unlocked: false
  },
  // Special
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Complete a quiz before 8 AM",
    icon: "sparkles",
    color: "#F97316",
    requirement: "Quiz before 8 AM",
    unlocked: false
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Complete a quiz after 10 PM",
    icon: "sparkles",
    color: "#6366F1",
    requirement: "Quiz after 10 PM",
    unlocked: false
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Complete all modules in a category",
    icon: "trophy",
    color: "#EAB308",
    requirement: "Complete all modules",
    unlocked: false
  },
  {
    id: "ultimate-scholar",
    name: "Ultimate Scholar",
    description: "Complete all modules in all categories",
    icon: "crown",
    color: "#EF4444",
    requirement: "Complete everything",
    unlocked: false
  }
]

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(allAchievements)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    unlocked: 0,
    total: allAchievements.length,
    points: 0
  })

  useEffect(() => {
    async function loadAchievements() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Load user profile for progress data
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        // Load user progress
        const { data: progress } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)

        // Load quiz attempts
        const { data: attempts } = await supabase
          .from("quiz_attempts")
          .select("*")
          .eq("user_id", user.id)

        // Load earned achievements
        const { data: userAchievements } = await supabase
          .from("user_achievements")
          .select("*, achievements(*)")
          .eq("user_id", user.id)

        // Calculate achievement progress
        const quizzesCompleted = attempts?.length || 0
        const totalPoints = profile?.total_points || 0
        const streakDays = profile?.streak_days || 0
        const perfectScores = attempts?.filter((a: any) => a.score === a.total_questions).length || 0

        const updatedAchievements = allAchievements.map(achievement => {
          const earned = userAchievements?.find((ua: any) => 
            ua.achievements?.name === achievement.name
          )

          let progress = 0
          let unlocked = !!earned

          // Calculate progress based on achievement type
          switch (achievement.id) {
            case "first-steps":
              progress = Math.min(quizzesCompleted, 1)
              unlocked = quizzesCompleted >= 1
              break
            case "quick-learner":
              progress = Math.min(quizzesCompleted, 5)
              unlocked = quizzesCompleted >= 5
              break
            case "dedicated-student":
              progress = Math.min(quizzesCompleted, 25)
              unlocked = quizzesCompleted >= 25
              break
            case "on-fire":
              progress = Math.min(streakDays, 3)
              unlocked = streakDays >= 3
              break
            case "week-warrior":
              progress = Math.min(streakDays, 7)
              unlocked = streakDays >= 7
              break
            case "month-master":
              progress = Math.min(streakDays, 30)
              unlocked = streakDays >= 30
              break
            case "century":
              progress = Math.min(totalPoints, 100)
              unlocked = totalPoints >= 100
              break
            case "high-scorer":
              progress = Math.min(totalPoints, 500)
              unlocked = totalPoints >= 500
              break
            case "point-master":
              progress = Math.min(totalPoints, 1000)
              unlocked = totalPoints >= 1000
              break
            case "genius":
              progress = Math.min(perfectScores, 5)
              unlocked = perfectScores >= 5
              break
            case "perfectionist":
              unlocked = perfectScores >= 1
              break
            case "sharp-mind":
              unlocked = attempts?.some((a: any) => (a.score / a.total_questions) >= 0.8) || false
              break
          }

          return {
            ...achievement,
            progress: achievement.maxProgress ? progress : undefined,
            unlocked,
            unlockedAt: earned?.earned_at
          }
        })

        setAchievements(updatedAchievements)
        setStats({
          unlocked: updatedAchievements.filter(a => a.unlocked).length,
          total: updatedAchievements.length,
          points: totalPoints
        })
      }

      setLoading(false)
    }

    loadAchievements()
  }, [])

  const getIcon = (iconName: string, color: string) => {
    const props = { className: "h-6 w-6", style: { color } }
    switch (iconName) {
      case "trophy": return <Trophy {...props} />
      case "star": return <Star {...props} />
      case "flame": return <Flame {...props} />
      case "target": return <Target {...props} />
      case "book": return <Book {...props} />
      case "code": return <Code {...props} />
      case "zap": return <Zap {...props} />
      case "award": return <Award {...props} />
      case "crown": return <Crown {...props} />
      case "medal": return <Medal {...props} />
      case "sparkles": return <Sparkles {...props} />
      case "graduation": return <GraduationCap {...props} />
      case "heart": return <Heart {...props} />
      case "rocket": return <Rocket {...props} />
      default: return <Trophy {...props} />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Achievements
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and unlock badges
          </p>
        </div>

        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Unlocked</p>
              <p className="text-2xl font-bold text-primary">
                {stats.unlocked}/{stats.total}
              </p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Completion</p>
              <p className="text-2xl font-bold">
                {Math.round((stats.unlocked / stats.total) * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {stats.unlocked} of {stats.total} achievements
            </span>
          </div>
          <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${(stats.unlocked / stats.total) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Unlocked ({unlockedAchievements.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {unlockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div 
                      className="rounded-lg p-3"
                      style={{ backgroundColor: `${achievement.color}20` }}
                    >
                      {getIcon(achievement.icon, achievement.color)}
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      Unlocked
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{achievement.name}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                {achievement.unlockedAt && (
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground">
                      Earned on {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          In Progress ({lockedAchievements.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lockedAchievements.map((achievement) => (
            <Card key={achievement.id} className="opacity-75">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg p-3 bg-muted">
                    {getIcon(achievement.icon, "#9CA3AF")}
                  </div>
                  <Badge variant="outline">Locked</Badge>
                </div>
                <CardTitle className="text-lg mt-2">{achievement.name}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  {achievement.requirement}
                </p>
                {achievement.maxProgress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{achievement.progress || 0}</span>
                      <span>{achievement.maxProgress}</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-muted-foreground/30 transition-all"
                        style={{ 
                          width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
