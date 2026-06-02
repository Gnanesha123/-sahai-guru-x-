import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStore } from '@/store/useStore';
import { mockQuizzes } from '@/lib/mockData';
import { Trophy, Brain, CheckCircle2, XCircle, ArrowRight, RefreshCcw, Sparkles, Zap } from 'lucide-react';

export function QuizCenter() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const { addQuizResult, addXP, student } = useStore();

  const currentQuiz = mockQuizzes[currentIndex];
  const progress = ((currentIndex) / mockQuizzes.length) * 100;

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuiz.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < mockQuizzes.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const earnedXP = Math.round((score / mockQuizzes.length) * 200);
      addXP(earnedXP);
    }
  };

  const isCorrect = selectedAnswer === currentQuiz?.correctAnswer;

  if (!quizStarted) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">Smart Quiz Center</h1>
            <p className="text-white/60 text-lg mb-6">
              Adaptive quizzes that adjust to your skill level. Each question comes with detailed AI explanations.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: Brain, text: 'Adaptive difficulty based on your performance' },
                { icon: Zap, text: 'Multiple question types: MCQ, True/False, Fill Blanks' },
                { icon: Sparkles, text: 'Instant AI-powered explanations' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-accent" />
                  <span className="text-white/70">{feature.text}</span>
                </div>
              ))}
            </div>
            <Button size="lg" variant="primary" onClick={startQuiz}>
              Start Quiz <Trophy className="w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl"
            >
              🏆
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / mockQuizzes.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card variant="accent" glow className="text-center">
            <CardContent>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                🏆
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
              <div className="text-6xl font-bold text-accent mb-4">{score}/{mockQuizzes.length}</div>
              <ProgressBar value={percentage} size="lg" showLabel label="Score" className="mb-6" />
              <p className="text-white/60 mb-6">
                {percentage >= 80 ? "Excellent work! You're mastering this subject!" :
                 percentage >= 60 ? "Good job! Keep practicing to improve further." :
                 "Keep trying! Practice makes perfect."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="primary" icon={<RefreshCcw className="w-5 h-5" />} onClick={startQuiz}>
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => setQuizStarted(false)}>
                  Back to Quiz Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">Question {currentIndex + 1} of {mockQuizzes.length}</span>
          <span className="text-accent font-medium text-sm">Score: {score}/{currentIndex}</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <Card variant="glass">
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                  {currentQuiz.subject}
                </span>
                <span className="px-3 py-1 bg-white/5 text-white/60 rounded-lg text-sm">
                  {currentQuiz.topic}
                </span>
                <span className="px-3 py-1 bg-white/5 text-white/60 rounded-lg text-sm capitalize">
                  {currentQuiz.type.replace('-', ' ')}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-6">{currentQuiz.question}</h3>

              <div className="space-y-3">
                {currentQuiz.options?.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = option === currentQuiz.correctAnswer;
                  
                  let optionStyle = 'bg-white/5 border border-white/10 hover:border-accent/30';
                  if (showResult && isSelected) {
                    optionStyle = isCorrect
                      ? 'bg-success/20 border-success text-success'
                      : 'bg-danger/20 border-danger text-danger';
                  } else if (showResult && isCorrectOption) {
                    optionStyle = 'bg-success/20 border-success text-success';
                  } else if (isSelected) {
                    optionStyle = 'bg-accent/10 border-accent/30 text-accent';
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => !showResult && handleAnswer(option)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${optionStyle} ${
                        showResult ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-success" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-danger" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl"
                >
                  <div className="flex items-center gap-2 text-accent font-medium mb-1">
                    <Brain className="w-4 h-4" />
                    AI Explanation
                  </div>
                  <p className="text-white/70 text-sm">{currentQuiz.explanation}</p>
                </motion.div>
              )}

              {/* Next Button */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 flex justify-end"
                >
                  <Button variant="primary" onClick={nextQuestion}>
                    {currentIndex < mockQuizzes.length - 1 ? (
                      <>Next <ArrowRight className="w-5 h-5" /></>
                    ) : (
                      <>See Results <Trophy className="w-5 h-5" /></>
                    )}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
