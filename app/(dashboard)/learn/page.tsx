"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, ChevronRight, Users } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  moduleCount: number
}

export default function LearnPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      const supabase = createClient()
      
      const { data } = await supabase
        .from("categories")
        .select(`
          *,
          modules (count)
        `)
        .order("display_order")

      if (data) {
        setCategories(data.map((c: any) => ({
          ...c,
          moduleCount: c.modules?.[0]?.count || 0
        })))
      }
      setLoading(false)
    }

    loadCategories()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "book-open": return BookOpen
      case "code": return Code
      default: return BookOpen
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Default categories if none exist in database
  const displayCategories = categories.length > 0 ? categories : [
    {
      id: "english",
      name: "English",
      description: "Master vocabulary, grammar, reading comprehension, and writing skills",
      icon: "book-open",
      color: "#3B82F6",
      moduleCount: 6
    },
    {
      id: "programming",
      name: "Programming",
      description: "Learn Python, JavaScript, data structures, algorithms, and more",
      icon: "code",
      color: "#10B981",
      moduleCount: 6
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
        <p className="text-muted-foreground mt-2">
          Choose a category to start learning and test your knowledge
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {displayCategories.map((category) => {
          const Icon = getIcon(category.icon)
          return (
            <Link key={category.id} href={`/learn/${category.name.toLowerCase()}`}>
              <Card className="group h-full hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div 
                      className="rounded-xl p-4"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon 
                        className="h-8 w-8" 
                        style={{ color: category.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <CardDescription className="mt-1">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {category.moduleCount} Modules
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>1.2k learners</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Featured Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Modules</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Vocabulary Basics", category: "English", difficulty: "Beginner", color: "#3B82F6" },
            { name: "Python Fundamentals", category: "Programming", difficulty: "Beginner", color: "#10B981" },
            { name: "Grammar Essentials", category: "English", difficulty: "Intermediate", color: "#3B82F6" },
          ].map((module, i) => (
            <Card key={i} className="group hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    style={{ borderColor: module.color, color: module.color }}
                  >
                    {module.category}
                  </Badge>
                  <Badge variant="secondary">{module.difficulty}</Badge>
                </div>
                <CardTitle className="text-base mt-2">{module.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link 
                  href={`/learn/${module.category.toLowerCase()}`}
                  className="text-sm text-primary hover:underline"
                >
                  Start Learning →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
