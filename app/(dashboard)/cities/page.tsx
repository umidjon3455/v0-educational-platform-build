"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin,
  Search,
  Users,
  Landmark,
  Mountain,
  Building,
  Sparkles
} from "lucide-react"

interface City {
  id: string
  name: string
  description: string
  country: string
  image_url: string
  population: string
  highlights: string[]
}

const mockCities: City[] = [
  {
    id: "1",
    name: "Tashkent",
    description: "The capital and largest city of Uzbekistan, a modern metropolis blending Soviet architecture with Islamic heritage.",
    country: "Uzbekistan",
    image_url: "",
    population: "2.5 million",
    highlights: ["Amir Temur Square", "Chorsu Bazaar", "Minor Mosque", "TV Tower", "Metro Stations"]
  },
  {
    id: "2",
    name: "Samarkand",
    description: "One of the oldest inhabited cities in Central Asia, a UNESCO World Heritage site on the ancient Silk Road.",
    country: "Uzbekistan",
    image_url: "",
    population: "500,000",
    highlights: ["Registan Square", "Shah-i-Zinda", "Bibi-Khanym Mosque", "Gur-e-Amir", "Ulugh Beg Observatory"]
  },
  {
    id: "3",
    name: "Bukhara",
    description: "Ancient city with over 2,000 years of history, featuring remarkable Islamic architecture and historic trading centers.",
    country: "Uzbekistan",
    image_url: "",
    population: "280,000",
    highlights: ["Kalyan Minaret", "Ark Fortress", "Lyab-i Hauz", "Chor-Minor", "Trading Domes"]
  },
  {
    id: "4",
    name: "Khiva",
    description: "A living museum city with the entirely preserved ancient walled inner town of Itchan Kala.",
    country: "Uzbekistan",
    image_url: "",
    population: "90,000",
    highlights: ["Itchan Kala", "Kalta Minor", "Juma Mosque", "Tash Hauli Palace", "City Walls"]
  },
  {
    id: "5",
    name: "Fergana",
    description: "Center of the fertile Fergana Valley, known for its craft traditions and agricultural richness.",
    country: "Uzbekistan",
    image_url: "",
    population: "350,000",
    highlights: ["Fergana Valley", "Margilan Silk", "Rishtan Ceramics", "Local Bazaars", "Cotton Fields"]
  },
  {
    id: "6",
    name: "Namangan",
    description: "Second largest city in the Fergana Valley, known for its gardens and religious architecture.",
    country: "Uzbekistan",
    image_url: "",
    population: "475,000",
    highlights: ["Mullah Kyrgyz Madrasa", "Babur Park", "Local Markets", "Silk Production", "Cultural Centers"]
  },
  {
    id: "7",
    name: "Nukus",
    description: "Capital of Karakalpakstan, home to one of the world's best collections of Russian avant-garde art.",
    country: "Uzbekistan",
    image_url: "",
    population: "300,000",
    highlights: ["Savitsky Museum", "Aral Sea", "Mizdakhan", "Local Crafts", "Desert Landscapes"]
  },
  {
    id: "8",
    name: "Termez",
    description: "Ancient border city with rich Buddhist heritage and archaeological sites along the Amu Darya river.",
    country: "Uzbekistan",
    image_url: "",
    population: "140,000",
    highlights: ["Fayaz Tepa", "Buddhist Temples", "Archaeological Museum", "Border Views", "Ancient Ruins"]
  }
]

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>(mockCities)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCities() {
      const supabase = createClient()
      
      const { data } = await supabase
        .from("cities")
        .select("*")
        .order("name")

      if (data && data.length > 0) {
        setCities(data.map((c: any) => ({
          ...c,
          highlights: c.highlights || []
        })))
      }
      
      setLoading(false)
    }

    loadCities()
  }, [])

  const filteredCities = cities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <MapPin className="h-8 w-8 text-primary" />
            Cities
          </h1>
          <p className="text-muted-foreground mt-1">
            Explore cities and discover their unique attractions
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {cities.length} Cities
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cities or attractions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Featured Cities */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCities.map((city, index) => (
          <Card 
            key={city.id} 
            className={`group hover:border-primary/50 transition-all ${
              index === 0 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 p-3">
                    {index === 0 ? (
                      <Building className="h-6 w-6 text-primary" />
                    ) : index < 4 ? (
                      <Landmark className="h-6 w-6 text-primary" />
                    ) : (
                      <Mountain className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{city.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{city.country}</span>
                      <span className="text-border">|</span>
                      <Users className="h-3 w-3" />
                      <span>{city.population}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-3">
                {city.description}
              </CardDescription>
              
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Highlights
                </p>
                <div className="flex flex-wrap gap-2">
                  {city.highlights.slice(0, 4).map((highlight, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                  {city.highlights.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{city.highlights.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No cities found matching your search.</p>
        </div>
      )}
    </div>
  )
}
