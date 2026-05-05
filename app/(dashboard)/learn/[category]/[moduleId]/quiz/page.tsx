"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Trophy,
  RotateCcw,
  ChevronRight
} from "lucide-react"
import { getQuestions, Question } from "@/lib/questions"

interface QuizState {
  currentIndex: number
  answers: (number | null)[]
  showResult: boolean
  timeStarted: number
}

export default function QuizPage({ params }: { params: Promise<{ category: string; moduleId: string }> }) {
  const resolvedParams = use(params)
  const { category, moduleId } = resolvedParams
  const router = useRouter()
  
  const [questions, setQuestions] = useState<Question[]>([])
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    answers: [],
    showResult: false,
    timeStarted: Date.now()
  })
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load questions for this module
    const moduleQuestions = getQuestions(category, moduleId)
    setQuestions(moduleQuestions)
    setQuizState(prev => ({
      ...prev,
      answers: new Array(moduleQuestions.length).fill(null)
    }))
    setLoading(false)
  }, [category, moduleId])

  const currentQuestion = questions[quizState.currentIndex]
  const totalQuestions = questions.length
  const answeredCount = quizState.answers.filter(a => a !== null).length

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    setShowFeedback(true)
    
    const newAnswers = [...quizState.answers]
    newAnswers[quizState.currentIndex] = selectedAnswer
    setQuizState(prev => ({ ...prev, answers: newAnswers }))
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    setSelectedAnswer(null)
    
    if (quizState.currentIndex < totalQuestions - 1) {
      setQuizState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }))
    } else {
      setQuizState(prev => ({ ...prev, showResult: true }))
      saveResults()
    }
  }

  const saveResults = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return
    
    const correctAnswers = quizState.answers.reduce((count, answer, index) => {
      return answer === questions[index]?.correctAnswer ? count + 1 : count
    }, 0)
    
    const timeTaken = Math.round((Date.now() - quizState.timeStarted) / 1000)
    
    // Try to save quiz attempt
    await supabase.from("quiz_attempts").insert({
      user_id: user.id,
      module_id: moduleId,
      score: correctAnswers,
      total_questions: totalQuestions,
      time_taken: timeTaken
    }).select()

    // Update user progress
    const { data: existingProgress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
      .single()

    if (existingProgress) {
      await supabase
        .from("user_progress")
        .update({
          questions_answered: existingProgress.questions_answered + totalQuestions,
          questions_correct: existingProgress.questions_correct + correctAnswers,
          completed: correctAnswers >= totalQuestions * 0.7,
          updated_at: new Date().toISOString()
        })
        .eq("id", existingProgress.id)
    } else {
      await supabase.from("user_progress").insert({
        user_id: user.id,
        module_id: moduleId,
        questions_answered: totalQuestions,
        questions_correct: correctAnswers,
        completed: correctAnswers >= totalQuestions * 0.7
      })
    }

    // Update user points
    const pointsEarned = correctAnswers * 10
    await supabase.rpc("increment_user_points", { 
      user_id_input: user.id, 
      points_to_add: pointsEarned 
    }).select()
  }

  const restartQuiz = () => {
    setQuizState({
      currentIndex: 0,
      answers: new Array(questions.length).fill(null),
      showResult: false,
      timeStarted: Date.now()
    })
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-muted-foreground">No questions available for this module yet.</p>
        <Button asChild>
          <Link href={`/learn/${category}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Link>
        </Button>
      </div>
    )
  }

  // Show results
  if (quizState.showResult) {
    const correctAnswers = quizState.answers.reduce((count, answer, index) => {
      return answer === questions[index]?.correctAnswer ? count + 1 : count
    }, 0)
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = percentage >= 70
    const timeTaken = Math.round((Date.now() - quizState.timeStarted) / 1000)
    const minutes = Math.floor(timeTaken / 60)
    const seconds = timeTaken % 60

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className={`rounded-full p-6 ${passed ? "bg-green-500/10" : "bg-orange-500/10"}`}>
                <Trophy className={`h-12 w-12 ${passed ? "text-green-500" : "text-orange-500"}`} />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {passed ? "Congratulations!" : "Keep Practicing!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{percentage}%</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{correctAnswers}/{totalQuestions}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{minutes}:{seconds.toString().padStart(2, '0')}</p>
                <p className="text-sm text-muted-foreground">Time</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">+{correctAnswers * 10} points earned!</span>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={restartQuiz}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button asChild>
                <Link href={`/learn/${category}`}>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q, i) => {
              const isCorrect = quizState.answers[i] === q.correctAnswer
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{q.question}</p>
                    {!isCorrect && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz interface
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/learn/${category}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Quiz
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            {Math.round((Date.now() - quizState.timeStarted) / 60000)}m
          </Badge>
          <Badge variant="secondary">
            {quizState.currentIndex + 1} / {totalQuestions}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((quizState.currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion?.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === currentQuestion.correctAnswer
            const showCorrect = showFeedback && isCorrect
            const showWrong = showFeedback && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  showCorrect
                    ? "border-green-500 bg-green-500/10"
                    : showWrong
                    ? "border-red-500 bg-red-500/10"
                    : isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    showCorrect
                      ? "bg-green-500 text-white"
                      : showWrong
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {showWrong && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showFeedback && currentQuestion?.explanation && (
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <p className="text-sm">
              <span className="font-medium">Explanation: </span>
              {currentQuestion.explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        {!showFeedback ? (
          <Button 
            onClick={handleSubmitAnswer} 
            disabled={selectedAnswer === null}
            size="lg"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} size="lg">
            {quizState.currentIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
