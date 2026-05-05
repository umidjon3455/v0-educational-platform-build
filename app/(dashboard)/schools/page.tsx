"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  School,
  MapPin,
  Globe,
  Search,
  ExternalLink,
  Users
} from "lucide-react"

interface SchoolItem {
  id: string
  name: string
  description: string
  location: string
  website: string
  image_url: string
  school_type: "public" | "private" | "international"
}

const mockSchools: SchoolItem[] = [
  {
    id: "1",
    name: "Presidential Schools",
    description: "Elite network of schools offering advanced curriculum and modern facilities for gifted students.",
    location: "Multiple Locations, Uzbekistan",
    website: "https://presidentialschools.uz",
    image_url: "",
    school_type: "public"
  },
  {
    id: "2",
    name: "Tashkent International School",
    description: "International Baccalaureate school serving the international community with world-class education.",
    location: "Tashkent, Uzbekistan",
    website: "https://tashkent.qsi.org",
    image_url: "",
    school_type: "international"
  },
  {
    id: "3",
    name: "British School of Tashkent",
    description: "British curriculum school offering IGCSE and A-Level programs.",
    location: "Tashkent, Uzbekistan",
    website: "https://britishschool.uz",
    image_url: "",
    school_type: "international"
  },
  {
    id: "4",
    name: "Academic Lyceum of National University",
    description: "Prestigious academic lyceum preparing students for university education.",
    location: "Tashkent, Uzbekistan",
    website: "https://nuu.uz/lyceum",
    image_url: "",
    school_type: "public"
  },
  {
    id: "5",
    name: "Specialized Schools for Exact Sciences",
    description: "Schools focused on mathematics, physics, and computer science education.",
    location: "Various Cities, Uzbekistan",
    website: "",
    image_url: "",
    school_type: "public"
  },
  {
    id: "6",
    name: "Cambridge International School Tashkent",
    description: "Cambridge curriculum from primary through A-Levels with native English teachers.",
    location: "Tashkent, Uzbekistan",
    website: "https://cambridgeschool.uz",
    image_url: "",
    school_type: "private"
  },
  {
    id: "7",
    name: "American Corners Language Schools",
    description: "English language education centers affiliated with US Embassy programs.",
    location: "Multiple Cities, Uzbekistan",
    website: "",
    image_url: "",
    school_type: "public"
  },
  {
    id: "8",
    name: "IT Park Education Centers",
    description: "Modern centers focused on programming, robotics, and digital skills for youth.",
    location: "Tashkent & Regions",
    website: "https://itpark.uz",
    image_url: "",
    school_type: "public"
  },
  {
    id: "9",
    name: "Haileybury Almaty Tashkent",
    description: "British boarding school tradition with outstanding academic results.",
    location: "Tashkent, Uzbekistan",
    website: "https://haileybury.uz",
    image_url: "",
    school_type: "private"
  },
  {
    id: "10",
    name: "Gymnasium Schools",
    description: "Traditional gymnasiums with enhanced humanities and language programs.",
    location: "Various Cities, Uzbekistan",
    website: "",
    image_url: "",
    school_type: "public"
  }
]

export default function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolItem[]>(mockSchools)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSchools() {
      const supabase = createClient()
      
      const { data } = await supabase
        .from("schools")
        .select("*")
        .order("name")

      if (data && data.length > 0) {
        setSchools(data)
      }
      
      setLoading(false)
    }

    loadSchools()
  }, [])

  const filteredSchools = schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || s.school_type === typeFilter
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "public": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "private": return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "international": return "bg-green-500/10 text-green-600 border-green-500/20"
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
            <School className="h-8 w-8 text-primary" />
            Schools
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover educational institutions and learning centers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            <Users className="mr-1 h-3 w-3" />
            {schools.length} Schools
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schools or locations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={typeFilter} onValueChange={setTypeFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="international">International</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Schools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSchools.map((school) => (
          <Card key={school.id} className="group hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <School className="h-5 w-5 text-primary" />
                </div>
                <Badge className={getTypeColor(school.school_type)}>
                  {school.school_type}
                </Badge>
              </div>
              <CardTitle className="text-lg">{school.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{school.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {school.description}
              </CardDescription>
              
              {school.website && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={school.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No schools found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
