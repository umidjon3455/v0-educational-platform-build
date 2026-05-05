"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { Profile } from "@/lib/types/database"
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  User,
  GraduationCap,
  School,
  Building2,
  MapPin,
  Settings,
  Flame,
  Star
} from "lucide-react"

interface DashboardSidebarProps {
  profile: Profile | null
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Profile", href: "/profile", icon: User },
]

const resources = [
  { name: "Universities", href: "/universities", icon: GraduationCap },
  { name: "Schools", href: "/schools", icon: School },
  { name: "Cities", href: "/cities", icon: MapPin },
]

export function DashboardSidebar({ profile }: DashboardSidebarProps) {
  const pathname = usePathname()
  const levelProgress = profile ? ((profile.total_points % 100) / 100) * 100 : 0

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-sidebar px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">NEAT</span>
            </Link>
          </div>

          {/* User Stats Card */}
          {profile && (
            <div className="rounded-xl bg-sidebar-accent p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {profile.full_name?.charAt(0) || profile.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {profile.full_name || "Learner"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Level {profile.level}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress to Level {profile.level + 1}</span>
                  <span className="font-medium">{profile.total_points % 100}/100 XP</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="font-medium">{profile.total_points}</span>
                  <span className="text-muted-foreground">points</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                  <span className="font-medium">{profile.streak_days}</span>
                  <span className="text-muted-foreground">day streak</span>
                </div>
              </div>
            </div>
          )}

          <ScrollArea className="flex-1">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors",
                            pathname === item.href || pathname.startsWith(item.href + "/")
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-muted-foreground uppercase tracking-wider">
                    Resources
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {resources.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors",
                            pathname === item.href || pathname.startsWith(item.href + "/")
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {profile?.is_admin && (
                  <li>
                    <div className="text-xs font-semibold leading-6 text-muted-foreground uppercase tracking-wider">
                      Admin
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      <li>
                        <Link
                          href="/admin"
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors",
                            pathname.startsWith("/admin")
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                        >
                          <Settings className="h-5 w-5 shrink-0" />
                          Admin Panel
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </nav>
          </ScrollArea>
        </div>
      </aside>
    </>
  )
}
