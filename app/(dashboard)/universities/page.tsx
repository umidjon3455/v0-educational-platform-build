"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap,
  MapPin,
  Globe,
  Search,
  Star,
  ExternalLink,
  Building2
} from "lucide-react"

interface University {
  id: string
  name: string
  description: string
  location: string
  website: string
  image_url: string
  ranking: number
  programs: string[]
}

const mockUniversities: University[] = [
  {
    id: "1",
    name: "National University of Uzbekistan",
    description: "The oldest and largest university in Uzbekistan, offering comprehensive programs in sciences, humanities, and engineering.",
    location: "Tashkent, Uzbekistan",
    website: "https://nuu.uz",
    image_url: "",
    ranking: 1,
    programs: ["Computer Science", "Mathematics", "Physics", "Economics", "Law"]
  },
  {
    id: "2",
    name: "Tashkent State Technical University",
    description: "Leading technical university specializing in engineering and technology education.",
    location: "Tashkent, Uzbekistan",
    website: "https://tdtu.uz",
    image_url: "",
    ranking: 2,
    programs: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "IT"]
  },
  {
    id: "3",
    name: "Westminster International University",
    description: "A joint venture with University of Westminster, offering internationally recognized degrees.",
    location: "Tashkent, Uzbekistan",
    website: "https://wiut.uz",
    image_url: "",
    ranking: 3,
    programs: ["Business Administration", "Economics", "Law", "IT"]
  },
  {
    id: "4",
    name: "Inha University in Tashkent",
    description: "Branch of South Korean Inha University, known for technology and business programs.",
    location: "Tashkent, Uzbekistan",
    website: "https://inha.uz",
    image_url: "",
    ranking: 4,
    programs: ["Computer Science", "Information Systems", "Management", "Logistics"]
  },
  {
    id: "5",
    name: "Samarkand State University",
    description: "Historic university in the ancient city of Samarkand with strong humanities and sciences.",
    location: "Samarkand, Uzbekistan",
    website: "https://samdu.uz",
    image_url: "",
    ranking: 5,
    programs: ["History", "Philology", "Chemistry", "Biology", "Mathematics"]
  },
  {
    id: "6",
    name: "Turin Polytechnic University in Tashkent",
    description: "Partnership with Politecnico di Torino, offering Italian engineering education.",
    location: "Tashkent, Uzbekistan",
    website: "https://polito.uz",
    image_url: "",
    ranking: 6,
    programs: ["Mechanical Engineering", "Civil Engineering", "Energy Engineering"]
  },
  {
    id: "7",
    name: "Tashkent Institute of Finance",
    description: "Premier institution for finance, banking, and accounting education.",
    location: "Tashkent, Uzbekistan",
    website: "https://tfi.uz",
    image_url: "",
    ranking: 7,
    programs: ["Finance", "Banking", "Accounting", "Economics", "Taxation"]
  },
  {
    id: "8",
    name: "Uzbekistan State World Languages University",
    description: "Specialized in foreign languages and international communication.",
    location: "Tashkent, Uzbekistan",
    website: "https://uzswlu.uz",
    image_url: "",
    ranking: 8,
    programs: ["English", "German", "French", "Chinese", "Translation Studies"]
  }
]

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>(mockUniversities)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUniversities() {
      const supabase = createClient()
      
      const { data } = await supabase
        .from("universities")
        .select("*")
        .order("ranking")

      if (data && data.length > 0) {
        setUniversities(data.map((u: any) => ({
          ...u,
          programs: u.programs || []
        })))
      }
      
      setLoading(false)
    }

    loadUniversities()
  }, [])

  const filteredUniversities = universities.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.programs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  )

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
            <GraduationCap className="h-8 w-8 text-primary" />
            Universities
          </h1>
          <p className="text-muted-foreground mt-1">
            Explore top universities and their programs
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {universities.length} Universities
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search universities, locations, or programs..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Universities Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredUniversities.map((university) => (
          <Card key={university.id} className="group hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{university.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{university.location}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  #{university.ranking}
                </Badge>
              </div>
              <CardDescription className="mt-3">
                {university.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Popular Programs</p>
                  <div className="flex flex-wrap gap-2">
                    {university.programs.slice(0, 4).map((program, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                    {university.programs.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{university.programs.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                {university.website && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={university.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No universities found matching your search.</p>
        </div>
      )}
    </div>
  )
}
