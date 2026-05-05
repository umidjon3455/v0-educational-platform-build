"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy,
  Medal,
  Crown,
  Star,
  Flame,
  TrendingUp
} from "lucide-react"

interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  avatar?: string
  points: number
  level: number
  streak: number
  isCurrentUser: boolean
}

// Mock data for demo
const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", rank: 1, name: "Alex Johnson", points: 2850, level: 28, streak: 45, isCurrentUser: false },
  { id: "2", rank: 2, name: "Sarah Chen", points: 2720, level: 27, streak: 32, isCurrentUser: false },
  { id: "3", rank: 3, name: "Mike Williams", points: 2540, level: 25, streak: 28, isCurrentUser: false },
  { id: "4", rank: 4, name: "Emily Davis", points: 2380, level: 23, streak: 21, isCurrentUser: false },
  { id: "5", rank: 5, name: "James Brown", points: 2150, level: 21, streak: 18, isCurrentUser: false },
  { id: "6", rank: 6, name: "Lisa Anderson", points: 1980, level: 19, streak: 15, isCurrentUser: false },
  { id: "7", rank: 7, name: "David Martinez", points: 1820, level: 18, streak: 12, isCurrentUser: false },
  { id: "8", rank: 8, name: "Emma Wilson", points: 1650, level: 16, streak: 10, isCurrentUser: false },
  { id: "9", rank: 9, name: "Chris Taylor", points: 1480, level: 14, streak: 8, isCurrentUser: false },
  { id: "10", rank: 10, name: "Amanda Lee", points: 1320, level: 13, streak: 7, isCurrentUser: false },
]

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<"all" | "weekly" | "monthly">("all")

  useEffect(() => {
    async function loadLeaderboard() {
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setCurrentUserId(user.id)
      }

      // Try to load from database
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, total_points, level, streak_days")
        .order("total_points", { ascending: false })
        .limit(50)

      if (profiles && profiles.length > 0) {
        const leaderboardData = profiles.map((p: any, index: number) => ({
          id: p.id,
          rank: index + 1,
          name: p.full_name || "Anonymous",
          avatar: p.avatar_url,
          points: p.total_points || 0,
          level: p.level || 1,
          streak: p.streak_days || 0,
          isCurrentUser: p.id === user?.id
        }))
        setLeaderboard(leaderboardData)

        // Find current user's rank
        const userEntry = leaderboardData.find((e: LeaderboardEntry) => e.isCurrentUser)
        if (userEntry) {
          setCurrentUserRank(userEntry)
        }
      } else {
        // Use mock data, mark one as current user for demo
        if (user) {
          const updatedMock = [...mockLeaderboard]
          updatedMock[4] = { ...updatedMock[4], isCurrentUser: true, name: "You" }
          setLeaderboard(updatedMock)
          setCurrentUserRank(updatedMock[4])
        }
      }

      setLoading(false)
    }

    loadLeaderboard()
  }, [period])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Medal className="h-6 w-6 text-amber-600" />
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30"
      case 2: return "bg-gradient-to-r from-gray-200/20 to-gray-300/20 border-gray-400/30"
      case 3: return "bg-gradient-to-r from-amber-600/10 to-orange-500/10 border-amber-600/30"
      default: return ""
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            See how you rank against other learners
          </p>
        </div>

        {currentUserRank && (
          <Card className="md:w-auto">
            <CardContent className="pt-4 pb-4 flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Your Rank</p>
                <p className="text-2xl font-bold text-primary">#{currentUserRank.rank}</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Points</p>
                <p className="text-2xl font-bold">{currentUserRank.points.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Period Tabs */}
      <Tabs defaultValue="all" onValueChange={(v) => setPeriod(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All Time</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <LeaderboardTable entries={leaderboard} getRankIcon={getRankIcon} getRankBgColor={getRankBgColor} />
        </TabsContent>
        <TabsContent value="monthly" className="mt-6">
          <LeaderboardTable entries={leaderboard} getRankIcon={getRankIcon} getRankBgColor={getRankBgColor} />
        </TabsContent>
        <TabsContent value="weekly" className="mt-6">
          <LeaderboardTable entries={leaderboard} getRankIcon={getRankIcon} getRankBgColor={getRankBgColor} />
        </TabsContent>
      </Tabs>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Top Scorer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{leaderboard[0]?.name.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{leaderboard[0]?.name}</p>
                <p className="text-sm text-muted-foreground">{leaderboard[0]?.points.toLocaleString()} points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{leaderboard[0]?.name.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{leaderboard[0]?.name}</p>
                <p className="text-sm text-muted-foreground">{leaderboard[0]?.streak} day streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              Most Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{leaderboard[1]?.name.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{leaderboard[1]?.name}</p>
                <p className="text-sm text-muted-foreground">Level {leaderboard[1]?.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LeaderboardTable({ 
  entries, 
  getRankIcon, 
  getRankBgColor 
}: { 
  entries: LeaderboardEntry[]
  getRankIcon: (rank: number) => React.ReactNode
  getRankBgColor: (rank: number) => string
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-4 transition-colors ${
                entry.isCurrentUser ? "bg-primary/5 border-l-4 border-l-primary" : ""
              } ${getRankBgColor(entry.rank)}`}
            >
              <div className="w-12 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              
              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.avatar} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <p className="font-medium flex items-center gap-2">
                  {entry.name}
                  {entry.isCurrentUser && (
                    <Badge variant="secondary" className="text-xs">You</Badge>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Level {entry.level}</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center hidden sm:block">
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="font-medium flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    {entry.streak}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Points</p>
                  <p className="text-lg font-bold text-primary">{entry.points.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
