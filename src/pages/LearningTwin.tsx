import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { Brain, TrendingUp, Target, Sparkles, BookOpen, BarChart3, RefreshCw, ChevronRight } from 'lucide-react';

export function LearningTwin() {
  const { student } = useStore();

  const metrics = [
    { label: 'Learning Confidence', value: student.learningConfidence, icon: Brain },
    { label: 'Math Mastery', value: student.mathMastery, icon: '📐' as string },
    { label: 'Science Mastery', value: student.scienceMastery, icon: '🔬' as string },
    { label: 'English Mastery', value: student.englishMastery, icon: '📖' as string },
    { label: 'Exam Readiness', value: student.examReadiness, icon: Target },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-3xl shadow-lg shadow-accent/25"
          >
            🧬
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Your AI Learning Twin</h1>
            <p className="text-white/50 text-lg">A digital twin that evolves with your learning journey</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Twin Avatar Section */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="accent" glow className="text-center">
              <CardContent>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-8xl mb-4"
                >
                  🧠
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Your Learning Twin</h3>
                <div className="flex items-center justify-center gap-2 text-success mb-3">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm">Active & Learning</span>
                </div>
                <ProgressBar value={student.learningConfidence} showLabel label="Twin Maturity" />
                <p className="text-white/50 text-sm mt-4">
                  Your twin has analyzed {student.xp.toLocaleString()} data points from your learning journey
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  Twin Evolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Foundation', 'Awareness', 'Growth', 'Mastery', 'Wisdom'].map((stage, i) => (
                    <div key={stage} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        i < student.level ? 'bg-accent text-white' : 'bg-white/5 text-white/30'
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <div className={`font-medium ${i < student.level ? 'text-white' : 'text-white/30'}`}>{stage}</div>
                        <div className="text-xs text-white/40">Level {i + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Metrics & Insights */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Twin Metrics
                </CardTitle>
                <span className="text-accent text-sm">Updated daily</span>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        {typeof metric.icon === 'string' ? (
                          <span className="text-xl">{metric.icon}</span>
                        ) : (
                          <metric.icon className="w-5 h-5 text-accent" />
                        )}
                        <span className="text-white/60 text-sm">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{metric.value}%</div>
                      <ProgressBar value={metric.value} size="sm" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                      <div className="flex items-center gap-2 text-accent font-medium mb-1">
                        <Sparkles className="w-4 h-4" />
                        Priority Focus
                      </div>
                      <p className="text-white">{student.recommendedFocus}</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded-xl border border-success/20">
                      <div className="flex items-center gap-2 text-success font-medium mb-1">
                        <TrendingUp className="w-4 h-4" />
                        Predicted Improvement
                      </div>
                      <p className="text-white">+{student.predictedImprovement}% with focused practice</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-2 text-white/70 font-medium mb-1">
                        <BookOpen className="w-4 h-4" />
                        Suggested Resources
                      </div>
                      <ul className="text-white/60 text-sm space-y-1">
                        <li>• Grammar video tutorials (5 min)</li>
                        <li>• Practice worksheets (10 questions)</li>
                        <li>• Interactive quizzes (3 sets)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    Learning Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.learningPath.map((stage, i) => (
                      <div key={stage.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              stage.completed ? 'bg-success text-white' : 'bg-white/10 text-white/50'
                            }`}>
                              {stage.completed ? '✓' : i + 1}
                            </div>
                            <span className={stage.completed ? 'text-white font-medium' : 'text-white/50'}>
                              {stage.name}
                            </span>
                          </div>
                          <span className="text-sm text-white/40">{stage.progress}%</span>
                        </div>
                        <ProgressBar value={stage.progress} size="sm" className="ml-8" />
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Full Roadmap <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
