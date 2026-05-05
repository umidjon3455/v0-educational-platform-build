import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Users, 
  Zap, 
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Target,
  Flame
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">NEAT</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link href="/universities" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Universities
            </Link>
            <Link href="/schools" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Schools
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span>Start learning today - it&apos;s free!</span>
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
                Master <span className="text-primary">English</span> and{" "}
                <span className="text-accent">Programming</span> the Fun Way
              </h1>
              
              <p className="mb-8 text-lg text-muted-foreground md:text-xl text-pretty">
                Interactive quizzes, gamified learning, and real-time progress tracking. 
                Join thousands of learners achieving their goals with NEAT.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="gap-2">
                    Start Learning Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#categories">
                  <Button variant="outline" size="lg">
                    Explore Courses
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Quizzes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose NEAT?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform combines effective learning techniques with engaging gamification
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Target className="h-6 w-6" />}
                title="Adaptive Learning"
                description="Questions adapt to your skill level for optimal challenge and growth"
              />
              <FeatureCard
                icon={<Trophy className="h-6 w-6" />}
                title="Gamification"
                description="Earn points, unlock achievements, and compete on leaderboards"
              />
              <FeatureCard
                icon={<Flame className="h-6 w-6" />}
                title="Streak System"
                description="Build daily habits with streak tracking and bonus rewards"
              />
              <FeatureCard
                icon={<CheckCircle className="h-6 w-6" />}
                title="Instant Feedback"
                description="Get immediate explanations for every answer to learn from mistakes"
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Community"
                description="Learn alongside others and see where you rank globally"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Progress Tracking"
                description="Detailed analytics show your improvement over time"
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start with English or Programming - or master both!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <CategoryCard
                icon={<BookOpen className="h-10 w-10" />}
                title="English"
                description="Master vocabulary, grammar, idioms, and business English through interactive lessons"
                modules={["Basic Vocabulary", "Grammar Fundamentals", "Reading Comprehension", "Advanced Vocabulary", "Idioms & Expressions", "Business English"]}
                color="primary"
              />
              <CategoryCard
                icon={<Code className="h-10 w-10" />}
                title="Programming"
                description="Learn programming basics, JavaScript, Python, data structures, and algorithms"
                modules={["Programming Basics", "JavaScript Fundamentals", "Python Essentials", "Data Structures", "Algorithms", "Web Development"]}
                color="accent"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="mb-8 text-primary-foreground/80 max-w-xl mx-auto">
              Join our community of learners and start your journey today. It&apos;s completely free!
            </p>
            <Link href="/auth/sign-up">
              <Button size="lg" variant="secondary" className="gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold">NEAT</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Learn English and Programming the fun way.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/learn/english" className="hover:text-foreground">English</Link></li>
                <li><Link href="/learn/programming" className="hover:text-foreground">Programming</Link></li>
                <li><Link href="/leaderboard" className="hover:text-foreground">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/universities" className="hover:text-foreground">Universities</Link></li>
                <li><Link href="/schools" className="hover:text-foreground">Schools</Link></li>
                <li><Link href="/cities" className="hover:text-foreground">Cities</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/auth/login" className="hover:text-foreground">Sign In</Link></li>
                <li><Link href="/auth/sign-up" className="hover:text-foreground">Sign Up</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NEAT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group rounded-xl border bg-card p-6 hover:shadow-lg transition-all hover:border-primary/50">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function CategoryCard({ 
  icon, 
  title, 
  description, 
  modules,
  color 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  modules: string[]
  color: "primary" | "accent"
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20 hover:border-primary/50",
    accent: "bg-accent/10 text-accent border-accent/20 hover:border-accent/50"
  }
  
  return (
    <div className={`rounded-xl border-2 p-8 transition-all hover:shadow-lg ${colorClasses[color]}`}>
      <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl ${color === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="space-y-2">
        {modules.map((module, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <CheckCircle className={`h-4 w-4 ${color === 'primary' ? 'text-primary' : 'text-accent'}`} />
            <span className="text-foreground">{module}</span>
          </div>
        ))}
      </div>
      <Link href={`/learn/${title.toLowerCase()}`} className="mt-6 block">
        <Button className="w-full gap-2" variant={color === 'primary' ? 'default' : 'outline'}>
          Start Learning
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
